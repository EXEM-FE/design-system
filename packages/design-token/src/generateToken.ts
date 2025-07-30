import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const __dirname = path.resolve();
const globalCssPath = path.join(__dirname, "../stylesheet/src/global.css");
const outputDir = path.join(__dirname, "src/tokens");

// 접두사별 설명 매핑
const prefixDescriptions: Record<string, string> = {
	color: "bg-red-500, text-sky-300 등 다양한 색상 유틸리티",
	font: "font-sans 등 폰트 패밀리 유틸리티",
	text: "text-xl 등 폰트 크기 유틸리티",
	"font-weight": "font-bold 등 폰트 무게 유틸리티",
	tracking: "tracking-wide 등 자간 유틸리티",
	leading: "leading-tight 등 행간 유틸리티",
	breakpoint: "sm:* 등 반응형 브레이크포인트 변형",
	container: "@sm:* 등 컨테이너 쿼리 변형과 max-w-md 등 크기 유틸리티",
	spacing: "px-4, max-h-16 등 다양한 간격 및 크기 유틸리티",
	radius: "rounded-sm 등 테두리 반경 유틸리티",
	shadow: "shadow-md 등 박스 그림자 유틸리티",
	"inset-shadow": "inset-shadow-xs 등 내부 박스 그림자 유틸리티",
	"drop-shadow": "drop-shadow-md 등 드롭 그림자 필터 유틸리티",
	blur: "blur-md 등 블러 필터 유틸리티",
	perspective: "perspective-near 등 원근 유틸리티",
	aspect: "aspect-video 등 종횡비 유틸리티",
	ease: "ease-out 등 전환 타이밍 함수 유틸리티",
	animate: "animate-spin 등 애니메이션 유틸리티",
};

// 출력 디렉토리가 존재하는지 확인하고 생성
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// CSS 변수를 추출하고 접두사별로 그룹화하는 함수
function extractAndGroupCssVariables(
	filePath: string,
): Record<string, Record<string, string>> {
	const content = fs.readFileSync(filePath, "utf8");
	const regex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
	const grouped: Record<string, Record<string, string>> = {};

	let match: RegExpExecArray | null = regex.exec(content);
	while (match !== null) {
		const name = match[1];
		const value = match[2].trim();

		// 복합 접두사 처리를 포함한 접두사 추출
		const compoundPrefixes = ["font-weight", "inset-shadow", "drop-shadow"];
		let prefix = name.split("-")[0];

		for (const compoundPrefix of compoundPrefixes) {
			if (name.startsWith(compoundPrefix)) {
				prefix = compoundPrefix;
				break;
			}
		}

		if (!grouped[prefix]) {
			grouped[prefix] = {};
		}
		grouped[prefix][name] = value;

		match = regex.exec(content);
	}

	return grouped;
}

// 평면화된 토큰 객체 타입 정의
type FlatTokens = {
	[key: string]: string;
};

// 평면화된 토큰 매핑을 생성하는 함수
function generateTokens(
	variables: Record<string, string>,
	prefix: string,
): FlatTokens {
	const tokens: FlatTokens = {};

	for (const [key] of Object.entries(variables)) {
		// 접두사를 제거한 키 생성
		let tokenKey = key;

		// 복합 접두사 처리
		const compoundPrefixes = ["font-weight", "inset-shadow", "drop-shadow"];
		let prefixToRemove = prefix;

		for (const compoundPrefix of compoundPrefixes) {
			if (key.startsWith(compoundPrefix)) {
				prefixToRemove = compoundPrefix;
				break;
			}
		}

		// 접두사와 하이픈 제거
		if (key.startsWith(`${prefixToRemove}-`)) {
			tokenKey = key.substring(prefixToRemove.length + 1);
		}

		// 평면화된 구조로 직접 매핑
		tokens[tokenKey] = `var(--${key})`;
	}

	return tokens;
}

// kebab-case를 camelCase로 변환하는 함수
function toCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// global.css 파일을 처리하는 메인 함수
function processGlobalCssFile() {
	console.log("CSS 토큰 생성을 시작합니다...");

	if (!fs.existsSync(globalCssPath)) {
		console.error(`오류: ${globalCssPath} 파일을 찾을 수 없습니다.`);
		return [];
	}

	// global.css에서 CSS 변수를 추출하고 그룹화
	const groupedVariables = extractAndGroupCssVariables(globalCssPath);
	console.log(`발견된 접두사: ${Object.keys(groupedVariables).join(", ")}`);

	const generatedFiles: string[] = [];

	// prefixDescriptions에 정의된 접두사에 대해서만 토큰 파일 생성
	for (const [prefix, variables] of Object.entries(groupedVariables)) {
		// prefixDescriptions에 정의되지 않은 접두사는 건너뜁니다.
		if (!prefixDescriptions[prefix]) {
			console.log(`⏭️  ${prefix} 토큰 생성을 건너뜁니다.`);
			continue;
		}

		const tokens = generateTokens(variables, prefix);

		// TypeScript 파일 콘텐츠 생성 (주석 포함)
		const tokenName = `${toCamelCase(prefix)}Tokens`;
		const description = prefixDescriptions[prefix];

		const content = `// Auto-generated file from CSS variables in global.css
// Do not edit directly
//
// Namespace: --${prefix}-*
// Description: ${description}

const ${tokenName} = ${JSON.stringify(tokens, null, 2)} as const;

export default ${tokenName};
`;

		// TypeScript 파일 쓰기
		const outputPath = path.join(outputDir, `${tokenName}.ts`);
		fs.writeFileSync(outputPath, content, "utf8");
		generatedFiles.push(outputPath);

		console.log(
			`✅ Generated: ${tokenName}.ts (${Object.keys(variables).length} tokens)`,
		);
	}

	return generatedFiles;
}

// 모든 토큰 파일 생성
const generatedFiles = processGlobalCssFile();

// Biome으로 파일 포맷팅
if (generatedFiles.length > 0) {
	try {
		const fileList = generatedFiles.join(" ");
		execSync(`pnpm biome check --fix ${fileList}`, { stdio: "inherit" });
		console.log("🎉 모든 CSS 토큰이 성공적으로 생성되었습니다!");
	} catch (error) {
		console.error("파일 포맷팅 중 오류가 발생했습니다:", error);
		console.log("🎉 CSS 토큰 생성은 완료되었습니다 (포맷팅 제외)");
	}
} else {
	console.log("토큰 파일이 생성되지 않았습니다.");
}
