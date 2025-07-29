# @exem/design-token

EXEM 디자인 시스템의 디자인 토큰을 TypeScript에서 활용할 수 있는 패키지입니다.

## 개요

`@exem/stylesheet`의 CSS 변수를 기반으로 TypeScript 토큰을 자동 생성합니다. CSS-in-JS 라이브러리나 TypeScript 프로젝트에서 type-safe하게 디자인 토큰을 사용할 수 있습니다.

## 주요 기능

- **자동 토큰 생성**: `global.css`에서 TypeScript 토큰 자동 추출
- **Type-Safe**: TypeScript로 컴파일 타임에 오타 방지
- **CSS 변수 래핑**: `var(--token-name)` 형태로 CSS 변수 활용
- **카테고리별 분류**: color, radius, shadow, breakpoint별 토큰 파일
- **전역 스타일 자동 로드**: import만으로 CSS 변수 활성화

## 설치

```bash
pnpm add @exem/design-token
```

## 사용법

### 기본 import (CSS 변수 자동 로드)

```typescript
// CSS 변수가 자동으로 로드됩니다
import '@exem/design-token'
```

### 개별 토큰 import

```typescript
import colorTokens from '@exem/design-token/src/tokens/colorTokens'
import radiusTokens from '@exem/design-token/src/tokens/radiusTokens'
import shadowTokens from '@exem/design-token/src/tokens/shadowTokens'
import breakpointTokens from '@exem/design-token/src/tokens/breakpointTokens'

// CSS-in-JS에서 사용
const Button = styled.button`
  background-color: ${colorTokens['surface-accent-default']};
  color: ${colorTokens['text-inverse']};
  border-radius: ${radiusTokens.medium};
  box-shadow: ${shadowTokens.weak};
`

// 일반 CSS 속성에서 사용
const buttonStyle = {
  backgroundColor: colorTokens['surface-accent-default'], // var(--color-surface-accent-default)
  borderRadius: radiusTokens.medium, // var(--radius-medium)
}
```

## 토큰 구조

### 자동 생성된 토큰 파일들

```
src/tokens/
├── colorTokens.ts       # 색상 토큰 (약 100+ 토큰)
├── radiusTokens.ts      # 반경 토큰 (4개)
├── shadowTokens.ts      # 그림자 토큰 (4개)
└── breakpointTokens.ts  # 브레이크포인트 토큰 (3개)
```

### colorTokens 예시
```typescript
const colorTokens = {
  "mono-white": "var(--color-mono-white)",
  "mono-black": "var(--color-mono-black)",
  "gray-00": "var(--color-gray-00)",
  // ... 모든 색상 변수
  "text-primary": "var(--color-text-primary)",
  "surface-accent-default": "var(--color-surface-accent-default)",
} as const
```

### radiusTokens 예시
```typescript
const radiusTokens = {
  "weak": "var(--radius-weak)",      // 4px
  "medium": "var(--radius-medium)",  // 6px
  "strong": "var(--radius-strong)",  // 8px
  "circle": "var(--radius-circle)",  // 999px
} as const
```

## 토큰 재생성

CSS 변수가 변경되었을 때 토큰을 다시 생성할 수 있습니다:

```bash
# 토큰 재생성
pnpm generate
```

이 명령어는:
1. `@exem/stylesheet/src/global.css`에서 CSS 변수 추출
2. 접두사별로 토큰 분류 (color, radius, shadow, breakpoint)
3. TypeScript 파일로 자동 생성
4. Biome으로 코드 포맷팅

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck

# 토큰 재생성
pnpm generate
```

## 의존성

### Dependencies
- `@exem/stylesheet` - CSS 변수 소스

### DevDependencies
- `tsx` - TypeScript 실행 환경
- `tsup` - 빌드 도구
- `typescript` - 타입스크립트 컴파일러

## 파일 구조

```
design-token/
├── src/
│   ├── tokens/              # 자동 생성된 토큰 파일들
│   │   ├── colorTokens.ts
│   │   ├── radiusTokens.ts
│   │   ├── shadowTokens.ts
│   │   └── breakpointTokens.ts
│   ├── generateToken.ts     # 토큰 생성 스크립트
│   ├── index.ts            # 메인 엔트리 (CSS 로드)
│   └── tsconfig.json       # TypeScript 설정
├── dist/                   # 빌드 결과물
└── package.json
```

## 관련 패키지

- `@exem/stylesheet` - CSS 변수 정의 소스
- `@exem/react` - React 컴포넌트에서 토큰 활용
- `@exem/react-theming` - React 테마 시스템

## 라이선스

MIT