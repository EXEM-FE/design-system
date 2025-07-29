# @exem/icon

EXEM 디자인 시스템의 아이콘 라이브러리입니다.

## 개요

EXEM의 모든 제품에서 사용되는 일관된 아이콘 세트를 제공합니다. SVG 기반의 확장 가능한 아이콘들을 React 컴포넌트 형태로 제공하여 개발자가 쉽게 사용할 수 있습니다.

## 주요 기능

- **SVG 기반**: 확대/축소에도 선명한 벡터 아이콘
- **React 컴포넌트**: TypeScript 지원과 함께 컴포넌트로 제공
- **일관된 디자인**: EXEM 브랜드 가이드라인을 따르는 통일된 디자인
- **트리 쉐이킹**: 사용하는 아이콘만 번들에 포함
- **접근성**: ARIA 라벨과 스크린 리더 지원

## 설치

```bash
pnpm add @exem/icon
```

## 사용법

```tsx
import { HomeIcon, SearchIcon, UserIcon } from '@exem/icon'

function App() {
  return (
    <div>
      <HomeIcon size={24} color="primary" />
      <SearchIcon size="medium" />
      <UserIcon className="custom-icon" />
    </div>
  )
}
```

## Props

모든 아이콘 컴포넌트는 다음 props를 지원합니다:

```typescript
interface IconProps {
  size?: number | 'small' | 'medium' | 'large'
  color?: string | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  className?: string
  'aria-label'?: string
}
```

## 아이콘 카테고리

### 네비게이션
- `HomeIcon`, `BackIcon`, `ForwardIcon`, `MenuIcon`

### 액션
- `AddIcon`, `EditIcon`, `DeleteIcon`, `SaveIcon`

### 상태
- `CheckIcon`, `CloseIcon`, `WarningIcon`, `ErrorIcon`

### 미디어
- `PlayIcon`, `PauseIcon`, `StopIcon`, `VolumeIcon`

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

## 새 아이콘 추가

1. SVG 파일을 `src/icons/` 디렉토리에 추가
2. `src/index.ts`에서 export
3. Storybook에 예제 추가

## Peer Dependencies

- React >=19.0.0
- React DOM >=19.0.0

## 라이선스

MIT