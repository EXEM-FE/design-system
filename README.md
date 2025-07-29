# EXEM Design System

EXEM 제품군을 위한 통합 디자인 시스템

## 기술 스택

- **모노레포**: pnpm workspace
- **빌드**: tsup
- **언어**: TypeScript
- **스타일**: CSS + PostCSS
- **버전 관리**: changesets
- **테스트**: Vitest
- **린팅/포맷팅**: Biome 

## 패키지

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [@exem/design-token](./packages/design-token) | CSS 변수 기반 TypeScript 디자인 토큰 | 0.2.0 |
| [@exem/stylesheet](./packages/stylesheet) | 전역 CSS 변수 및 스타일 | 0.2.0 |
| [@exem/icon](./packages/icon) | SVG 아이콘 컴포넌트 | 0.1.0 |
| [@exem/react](./packages/react) | React UI 컴포넌트 | 0.1.0 |
| [@exem/react-theming](./packages/react-theming) | 테마 시스템 | 0.1.0 |

## 빠른 시작

```bash
# 의존성 설치
pnpm install

# 전체 패키지 빌드
pnpm build

# 패키지 빌드 감시 모드 (개발용)
pnpm dev

# 디자인 토큰 재생성 (필요시)
cd packages/design-token && pnpm generate
```

## 명령어

```bash
# 개발
pnpm dev           # 전체 패키지 빌드 감시 모드
pnpm build         # 전체 패키지 빌드
pnpm clean         # 빌드 결과물 정리

# 코드 품질
pnpm lint          # 코드 검사
pnpm lint:fix      # 코드 자동 수정
pnpm format        # 코드 포맷팅
pnpm typecheck     # 타입 체크
pnpm test          # 테스트 실행

# 버전 관리
pnpm changeset     # 변경사항 기록
pnpm version       # 버전 업데이트 및 CHANGELOG 생성
pnpm release       # 빌드 후 npm 배포
```