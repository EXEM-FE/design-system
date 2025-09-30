# Biome 설정 가이드

이 문서는 `biome.json` 설정 파일의 각 옵션에 대한 상세한 설명을 제공합니다.

## 기본 설정

- **root**: 이 파일이 루트 설정 파일임을 명시
- **$schema**: Biome 스키마 URL (IDE 자동완성 지원)

## Linter 규칙

### Style 규칙

- **noNonNullAssertion**: `off` - TypeScript non-null assertion (`!`) 허용
- **useBlockStatements**: `error` - 조건문에 중괄호 강제 (if문 등에서 한 줄이어도 중괄호 필수)
- **useConst**: `error` - 재할당하지 않는 변수는 `const` 사용 강제

### Correctness 규칙

- **useExhaustiveDependencies**: `warn` - React hooks 의존성 배열 검사
- **useHookAtTopLevel**: `error` - React Hooks를 최상위에서만 호출

### Complexity 규칙

- **noExcessiveCognitiveComplexity**: `warn` - 과도한 인지 복잡도 경고
- **noExcessiveNestedTestSuites**: `error` - 중첩된 테스트 스위트 금지
- **noForEach**: `warn` - `forEach` 대신 `for...of` 권장

### Suspicious 규칙

- **noDuplicateClassMembers**: `error` - 중복된 클래스 멤버 금지
- **noDuplicateObjectKeys**: `error` - 중복된 객체 키 금지
- **noDebugger**: `warn` - `debugger` 문 경고
- **noConsole**: `warn` - `console` 사용 경고

### Performance 규칙

- **noBarrelFile**: `off` - Barrel 파일 허용 (index.ts 등)
- **noDelete**: `warn` - `delete` 연산자 사용 경고

## Formatter 설정

- **indentStyle**: `"space"` - 스페이스로 들여쓰기
- **indentWidth**: `2` - 들여쓰기 너비 2칸
- **lineWidth**: `80` - 한 줄 최대 길이 80자
- **lineEnding**: `"lf"` - 줄바꿈 스타일 LF (Unix)

## JavaScript 포맷터

- **jsxQuoteStyle**: `"double"` - JSX에서 큰따옴표
- **quoteProperties**: `"asNeeded"` - 객체 속성 따옴표는 필요할 때만
- **trailingCommas**: `"es5"` - ES5 스타일 후행 쉼표
- **semicolons**: `"asNeeded"` - 세미콜론은 필요할 때만
- **arrowParentheses**: `"asNeeded"` - 화살표 함수 괄호는 필요할 때만
- **bracketSpacing**: `true` - 중괄호 안 공백 추가
- **quoteStyle**: `"double"` - 문자열은 큰따옴표

## 오버라이드

### 테스트 파일
테스트 파일에서는 `console` 허용

### 설정 파일
설정 파일에서는 기본 export 허용

## 사용 방법

```bash
# 코드 포맷팅
pnpm format

# 린트 검사
pnpm lint

# 자동 수정
pnpm lint:fix
```
