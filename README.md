# EXEM Design System

EXEM 제품군을 위한 통합 디자인 시스템

## 기술 스택

- **모노레포**: pnpm workspace
- **빌드**: tsup
- **언어**: TypeScript
- **스타일**: CSS + PostCSS
- **문서**: Storybook
- **테스트**: Vitest
- **린팅**: Biome 

## 패키지

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [@exem/design-token](./packages/design-token) | 디자인 토큰 (색상, 타이포그래피, 간격) | 0.1.0 |
| [@exem/icon](./packages/icon) | SVG 아이콘 컴포넌트 | 0.1.0 |
| [@exem/react](./packages/react) | React UI 컴포넌트 | 0.1.0 |
| [@exem/react-theming](./packages/react-theming) | 테마 시스템 | 0.1.0 |
| [@exem/stylesheet](./packages/stylesheet) | CSS 유틸리티 | 0.1.0 |

## 빠른 시작

```bash
# 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 전체 빌드
pnpm build

# Storybook
cd packages/react && pnpm storybook
```

## 명령어

```bash
pnpm lint          # 코드 검사
pnpm format        # 코드 포맷팅
pnpm typecheck     # 타입 체크
pnpm test          # 테스트 실행
pnpm check:all     # 전체 호환성 체크
```