# @exem/tailwindcss3-plugin

EXEM 디자인 시스템을 Tailwind CSS 3에서 사용할 수 있도록 하는 고급 플러그인입니다.

## 개요

`@exem/design-token`의 토큰들을 기반으로 Tailwind CSS 유틸리티 클래스와 컴포넌트를 자동 생성하는 플러그인입니다. EXEM 디자인 시스템을 Tailwind 프로젝트에서 완전히 활용할 수 있습니다.

## 주요 기능

- **디자인 토큰 통합**: `tokens.color`, `tokens.radius`, `tokens.shadow`, `tokens.breakpoint`를 Tailwind 테마에 완전 통합
- **동적 그라데이션**: `matchUtilities`를 활용한 방향 지정 가능한 EXEM 로고 그라데이션
- **타이포그래피 스케일**: fontSize에 header-1 ~ caption까지의 디자인 시스템 스케일 제공
- **폰트 웨이트**: regular, medium, semibold, bold의 일관된 폰트 두께
- **CSS 변수 자동 로드**: @exem/stylesheet 자동 import

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

<!-- 테두리 -->
<input class="border border-exem-primary focus:border-exem-focused" />
<div class="border-2 border-exem-accent">강조 테두리</div>

<!-- 타이포그래피 컴포넌트 -->
<h1 class="text-header-1">헤더 1</h1>
<h2 class="text-header-2">헤더 2</h2>
<p class="text-body-1">본문 텍스트</p>
<span class="text-caption">캡션 텍스트</span>

<!-- 동적 그라데이션 -->
<div class="bg-gradient-exem-logo-[45deg]">오른쪽 그라데이션</div>

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

### 테두리 색상
- `border-exem-primary` - 기본 테두리
- `border-exem-secondary` - 보조 테두리
- `border-exem-hovered` - 호버 테두리
- `border-exem-focused` - 포커스 테두리
- `border-exem-accent` - 강조 테두리
- `border-exem-success` - 성공 테두리
- `border-exem-warning` - 경고 테두리
- `border-exem-critical` - 위험 테두리

### 타이포그래피 컴포넌트
- `text-header-1` - 헤더 1 (28px, 140%, 700)
- `text-header-2` - 헤더 2 (24px, 140%, 700)
- `text-title-1` - 타이틀 1 (20px, 140%, 600)
- `text-title-2` - 타이틀 2 (18px, 140%, 600)
- `text-body-1` - 본문 1 (16px, 140%, 400)
- `text-body-2` - 본문 2 (14px, 140%, 400)
- `text-body-3` - 본문 3 (12px, 140%, 400)
- `text-caption` - 캡션 (11px, 140%, 400)

### 동적 그라데이션
- `bg-gradient-exem-logo-[방향]` - EXEM 로고 그라데이션


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
<div class="bg-text-primary">기본 텍스트 색상을 배경으로</div>
<div class="text-surface-accent">강조 표면 색상을 텍스트로</div>

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

## 플러그인 아키텍처

이 플러그인은 다음과 같은 고급 Tailwind 기능을 활용합니다:

- **`addUtilities`**: 기본 유틸리티 클래스 생성
- **`matchUtilities`**: 동적 값을 받는 유틸리티 (그라데이션 방향 등)
- **Theme 확장**: 기존 Tailwind 테마에 EXEM 토큰 통합

## 의존성

### Dependencies
- `@exem/stylesheet` - CSS 변수 소스
- `@exem/design-token` - TypeScript 토큰 정의

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