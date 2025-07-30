# exem-icon

> 🚧 **미구현 패키지**: 현재 빈 패키지 상태입니다. 아이콘 컴포넌트가 구현되지 않았습니다.

EXEM 디자인 시스템의 아이콘 라이브러리 (개발 예정)

## 현재 상태

- ❌ **설치 불가**: NPM에 배포되지 않음
- ❌ **아이콘 없음**: 모든 아이콘이 미구현 상태
- ❌ **컴포넌트 없음**: React 컴포넌트 미완성
- 🚧 **개발 예정**: 향후 구현 예정

## 계획된 기능

향후 구현될 예정인 아이콘 시스템:

### 주요 기능 (계획)
- **SVG 기반**: 확대/축소에도 선명한 벡터 아이콘
- **React 컴포넌트**: TypeScript 지원과 함께 컴포넌트로 제공
- **일관된 디자인**: EXEM 브랜드 가이드라인을 따르는 통일된 디자인
- **트리 쉐이킹**: 사용하는 아이콘만 번들에 포함
- **접근성**: ARIA 라벨과 스크린 리더 지원

## 계획된 아이콘 카테고리

### 네비게이션 (계획)
- `HomeIcon`, `BackIcon`, `ForwardIcon`, `MenuIcon`

### 액션 (계획)
- `AddIcon`, `EditIcon`, `DeleteIcon`, `SaveIcon`

### 상태 (계획)
- `CheckIcon`, `CloseIcon`, `WarningIcon`, `ErrorIcon`

### 미디어 (계획)
- `PlayIcon`, `PauseIcon`, `StopIcon`, `VolumeIcon`

## 계획된 API

향후 구현될 예정인 인터페이스:

```typescript
// 예상 Props (미구현)
interface IconProps {
  size?: number | 'small' | 'medium' | 'large'
  color?: string | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  className?: string
  'aria-label'?: string
}
```

## 개발 참여

현재 모노레포 워크스페이스에서 개발할 수 있습니다:

```bash
# 워크스페이스 설정
pnpm install

# 패키지 개발 시작
cd packages/icon
pnpm dev
```

## 계획된 의존성

### Peer Dependencies (예정)
- React >=19.0.0
- React DOM >=19.0.0

## 라이선스

MIT