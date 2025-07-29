# @exem/react

EXEM 디자인 시스템의 React 컴포넌트 라이브러리입니다.

## 개요

EXEM의 모든 제품에서 사용할 수 있는 재사용 가능한 React 컴포넌트들을 제공합니다. 디자인 토큰과 아이콘을 기반으로 구축되어 일관된 사용자 경험을 보장합니다.

## 주요 기능

- **완전한 컴포넌트 세트**: Button, Input, Modal, Table 등 기본 UI 컴포넌트
- **접근성 우선**: WCAG 2.1 AA 기준을 만족하는 접근성 지원
- **테마 지원**: 다크/라이트 모드 및 커스텀 테마 지원
- **TypeScript**: 완전한 타입 지원으로 개발 경험 향상
- **Storybook**: 인터랙티브한 컴포넌트 문서 제공

## 설치

```bash
pnpm add @exem/react @exem/design-token @exem/icon
```

## 사용법

```tsx
import { Button, Input, Modal } from '@exem/react'

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        클릭하세요
      </Button>
      <Input 
        placeholder="텍스트를 입력하세요"
        variant="outlined"
      />
      <Modal 
        isOpen={true}
        onClose={() => {}}
        title="모달 제목"
      >
        모달 내용
      </Modal>
    </div>
  )
}
```

## 컴포넌트 목록

### 기본 컴포넌트
- `Button` - 다양한 스타일의 버튼
- `Input` - 텍스트 입력 필드
- `Textarea` - 여러 줄 텍스트 입력
- `Select` - 드롭다운 선택
- `Checkbox` - 체크박스
- `Radio` - 라디오 버튼

### 피드백 컴포넌트
- `Alert` - 알림 메시지
- `Toast` - 토스트 알림
- `Tooltip` - 툴팁
- `Loading` - 로딩 인디케이터

### 레이아웃 컴포넌트
- `Container` - 컨테이너
- `Grid` - 그리드 시스템
- `Stack` - 스택 레이아웃
- `Divider` - 구분선

### 네비게이션 컴포넌트
- `Tab` - 탭 네비게이션
- `Breadcrumb` - 브레드크럼
- `Pagination` - 페이지네이션

### 데이터 표시 컴포넌트
- `Table` - 데이터 테이블
- `Card` - 카드
- `Badge` - 배지
- `Avatar` - 아바타

### 오버레이 컴포넌트
- `Modal` - 모달 다이얼로그
- `Drawer` - 사이드 드로어
- `Popover` - 팝오버

## Storybook

컴포넌트 문서와 예제를 확인하려면 Storybook을 실행하세요:

```bash
pnpm storybook
```

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck

# Storybook 빌드
pnpm build-storybook
```

## 의존성

### Peer Dependencies
- React >=19.0.0
- React DOM >=19.0.0

### Dependencies
- @exem/design-token - 디자인 토큰
- @exem/icon - 아이콘 라이브러리

## 컴포넌트 개발 가이드

새로운 컴포넌트를 추가할 때는 다음을 포함해야 합니다:

1. TypeScript 인터페이스 정의
2. 접근성 속성 지원
3. Storybook 스토리
4. 단위 테스트
5. 문서화

## 라이선스

MIT