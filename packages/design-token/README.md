# @exem/design-token

EXEM 디자인 시스템의 디자인 토큰 패키지입니다.

## 개요

디자인 토큰은 디자인 시스템의 핵심 요소로, 색상, 타이포그래피, 간격, 그림자 등의 디자인 속성을 정의하고 관리합니다. 모든 디자인 결정의 기초가 되는 값들을 중앙에서 관리하여 일관성을 보장합니다.

## 주요 기능

- **색상 토큰**: Primary, Secondary, Semantic 색상 정의
- **타이포그래피**: 폰트 크기, 줄 높이, 폰트 굵기 등
- **간격 시스템**: Margin, Padding, Gap 등의 spacing 값
- **그림자**: Elevation에 따른 shadow 정의
- **브레이크포인트**: 반응형 디자인을 위한 화면 크기 정의

## 설치

```bash
pnpm add @exem/design-token
```

## 사용법

```typescript
import {
  colors,
  typography,
  spacing,
  shadows,
  breakpoints
} from '@exem/design-token'

// 색상 사용
const primaryColor = colors.primary[500]

// 타이포그래피 사용
const headingFont = typography.heading.h1

// 간격 사용
const containerPadding = spacing[4]
```

## 토큰 구조

```
design-token/
├── colors/          # 색상 토큰
├── typography/      # 타이포그래피 토큰
├── spacing/         # 간격 토큰
├── shadows/         # 그림자 토큰
├── breakpoints/     # 브레이크포인트 토큰
└── index.ts         # 통합 export
```

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

## 의존성

이 패키지는 다른 패키지들의 기초가 되므로 추가 의존성이 없습니다.

## 라이선스

MIT