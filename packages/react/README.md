# exem-react

> 🚧 **미구현 패키지**: 현재 빈 패키지 상태입니다. React 컴포넌트가 구현되지 않았습니다.

EXEM 디자인 시스템의 React 컴포넌트 라이브러리 (개발 예정)

## 현재 상태

- ❌ **설치 불가**: NPM에 배포되지 않음
- ❌ **컴포넌트 없음**: 모든 컴포넌트가 미구현 상태
- ❌ **Storybook 없음**: 문서화 미완성
- 🚧 **개발 예정**: 향후 구현 예정

## 계획된 기능

향후 구현될 예정인 컴포넌트들:

### 기본 컴포넌트 (계획)
- `Button` - 다양한 스타일의 버튼
- `Input` - 텍스트 입력 필드
- `Textarea` - 여러 줄 텍스트 입력
- `Select` - 드롭다운 선택
- `Checkbox` - 체크박스
- `Radio` - 라디오 버튼

### 피드백 컴포넌트 (계획)
- `Alert` - 알림 메시지
- `Toast` - 토스트 알림
- `Tooltip` - 툴팁
- `Loading` - 로딩 인디케이터

### 레이아웃 컴포넌트 (계획)
- `Container` - 컨테이너
- `Grid` - 그리드 시스템
- `Stack` - 스택 레이아웃
- `Divider` - 구분선

### 네비게이션 컴포넌트 (계획)
- `Tab` - 탭 네비게이션
- `Breadcrumb` - 브레드크럼
- `Pagination` - 페이지네이션

### 데이터 표시 컴포넌트 (계획)
- `Table` - 데이터 테이블
- `Card` - 카드
- `Badge` - 배지
- `Avatar` - 아바타

### 오버레이 컴포넌트 (계획)
- `Modal` - 모달 다이얼로그
- `Drawer` - 사이드 드로어
- `Popover` - 팝오버

## 개발 참여

현재 모노레포 워크스페이스에서 개발할 수 있습니다:

```bash
# 워크스페이스 설정
pnpm install

# 패키지 개발 시작
cd packages/react
pnpm dev
```

## 계획된 의존성

### Peer Dependencies (예정)
- React >=19.0.0
- React DOM >=19.0.0

### Dependencies (예정)
- exem-design-token - 디자인 토큰
- exem-stylesheet - CSS 변수

## 라이선스

MIT