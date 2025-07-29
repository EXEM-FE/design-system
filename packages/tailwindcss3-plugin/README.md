# @exem/tailwindcss3-plugin

EXEM 디자인 시스템을 Tailwind CSS 3에서 사용할 수 있도록 하는 플러그인입니다.

## 개요

`@exem/stylesheet`의 CSS 변수들을 Tailwind CSS 유틸리티 클래스로 변환해주는 플러그인입니다. EXEM 디자인 토큰을 Tailwind 프로젝트에서 쉽게 활용할 수 있습니다.

## 주요 기능

- **색상 유틸리티**: 텍스트, 배경, 보더 색상 클래스 제공
- **반경 유틸리티**: EXEM 디자인 시스템의 border-radius 값 사용
- **그림자 유틸리티**: elevation에 따른 box-shadow 효과
- **브레이크포인트**: EXEM 반응형 브레이크포인트 통합
- **CSS 변수 자동 로드**: stylesheet 패키지 자동 import

## 설치

```bash
npm install @exem/tailwindcss3-plugin
# 또는
pnpm add @exem/tailwindcss3-plugin
```

## 사용법

### Tailwind 설정

`tailwind.config.js`에 플러그인을 추가하세요:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@exem/tailwindcss3-plugin'),
  ],
}
```

### HTML/JSX에서 사용

```html
<!-- 텍스트 색상 -->
<h1 class="text-exem-primary">메인 제목</h1>
<p class="text-exem-secondary">부제목</p>
<span class="text-exem-accent">강조 텍스트</span>

<!-- 배경 색상 -->
<div class="bg-exem-surface-primary">기본 배경</div>
<button class="bg-exem-surface-accent text-exem-inverse">액센트 버튼</button>
<div class="bg-exem-elevation-1">카드 배경</div>

<!-- 보더 -->
<input class="border border-exem-primary focus:border-exem-focused" />
<div class="border-2 border-exem-accent">강조 테두리</div>

<!-- 반경 -->
<div class="rounded-exem-medium">중간 둥근 모서리</div>
<button class="rounded-exem-strong">강한 둥근 모서리</button>
<div class="rounded-exem-circle">원형</div>

<!-- 그림자 -->
<div class="shadow-exem-weak">약한 그림자</div>
<div class="shadow-exem-medium">중간 그림자</div>
<div class="shadow-exem-strong">강한 그림자</div>

<!-- 반응형 브레이크포인트 -->
<div class="text-sm exem-md:text-lg exem-lg:text-xl">반응형 텍스트</div>
```

## 제공되는 유틸리티 클래스

### 텍스트 색상
- `text-exem-primary` - 기본 텍스트
- `text-exem-secondary` - 보조 텍스트  
- `text-exem-tertiary` - 삼차 텍스트
- `text-exem-disabled` - 비활성화 텍스트
- `text-exem-inverse` - 역순 텍스트 (어두운 배경용)
- `text-exem-accent` - 강조 텍스트
- `text-exem-success` - 성공 텍스트
- `text-exem-warning` - 경고 텍스트
- `text-exem-critical` - 위험 텍스트
- `text-exem-link` - 링크 텍스트

### 배경 색상
- `bg-exem-surface-primary` - 기본 표면
- `bg-exem-surface-accent` - 강조 표면
- `bg-exem-surface-success` - 성공 표면
- `bg-exem-surface-warning` - 경고 표면
- `bg-exem-surface-critical` - 위험 표면
- `bg-exem-elevation-0~3` - 높이별 배경

### 보더 색상
- `border-exem-primary` - 기본 테두리
- `border-exem-secondary` - 보조 테두리
- `border-exem-hovered` - 호버 테두리
- `border-exem-focused` - 포커스 테두리
- `border-exem-accent` - 강조 테두리
- `border-exem-success` - 성공 테두리
- `border-exem-warning` - 경고 테두리
- `border-exem-critical` - 위험 테두리

### 반경
- `rounded-exem-weak` - 약한 반경 (4px)
- `rounded-exem-medium` - 중간 반경 (6px)
- `rounded-exem-strong` - 강한 반경 (8px)
- `rounded-exem-circle` - 원형 (999px)

### 그림자
- `shadow-exem-preview` - 미리보기 그림자
- `shadow-exem-weak` - 약한 그림자
- `shadow-exem-medium` - 중간 그림자
- `shadow-exem-strong` - 강한 그림자

### 브레이크포인트
- `exem-md:` - 1200px 이상
- `exem-lg:` - 1600px 이상
- `exem-xl:` - 1920px 이상

## Tailwind 테마 확장

플러그인은 Tailwind 테마도 확장하므로 일반적인 Tailwind 방식으로도 사용 가능합니다:

```html
<!-- 배경 색상을 bg-* 형태로 사용 -->
<div class="bg-exem-text-primary">기본 텍스트 색상을 배경으로</div>
<div class="text-exem-surface-accent">강조 표면 색상을 텍스트로</div>

<!-- 커스텀 CSS에서 사용 -->
<style>
.custom-button {
  @apply bg-exem-surface-accent text-exem-inverse rounded-exem-medium shadow-exem-weak;
}
</style>
```

## CSS-in-JS와 함께 사용

```javascript
import { theme } from 'tailwindcss/defaultTheme'

const buttonStyles = {
  backgroundColor: theme('colors.exem-surface.accent'),
  color: theme('colors.exem-text.inverse'),
  borderRadius: theme('borderRadius.exem-medium'),
  boxShadow: theme('boxShadow.exem-weak'),
}
```

## 개발

```bash
# 개발 모드
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

## 의존성

### Dependencies
- `@exem/stylesheet` - CSS 변수 소스

### PeerDependencies
- `tailwindcss` ^3.0.0

### DevDependencies
- `tailwindcss` - 플러그인 개발용
- `tsup` - 빌드 도구
- `typescript` - 타입스크립트 컴파일러

## 관련 패키지

- `@exem/stylesheet` - CSS 변수 정의
- `@exem/design-token` - TypeScript 토큰
- `@exem/react` - React 컴포넌트

## 라이선스

MIT