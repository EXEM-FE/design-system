<p align="center">
  <img src="https://raw.githubusercontent.com/EXEM-FE/design-system/main/assets/exem-design-system-banner.webp" alt="EXEM Design System" width="100%" />
</p>

# @exem-fe/tailwindcss-plugin

[![npm version](https://img.shields.io/npm/v/@exem-fe/tailwindcss-plugin)](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@exem-fe/tailwindcss-plugin)](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin)

EXEM 디자인 시스템을 Tailwind CSS 3에서 사용하기 위한 플러그인

## 개요

디자인 토큰을 Tailwind CSS 유틸리티 클래스와 컴포넌트로 자동 생성합니다.

### 통합 구조

```
@exem-fe/stylesheet  →  CSS Variables
                             ↓
@exem-fe/design-token → TypeScript Tokens
                             ↓
                          Plugin
                             ↓
                      Tailwind Config
                             ↓
                      Utility Classes
                             ↓
                          Your App
```

## 주요 기능

| 기능 | 설명 |
|------|------|
| **디자인 토큰 통합** | color, radius, shadow, breakpoint를 테마에 통합 |
| **동적 그라데이션** | EXEM 로고 그라데이션 (`bg-gradient-exem-to-r`) |
| **타이포그래피** | header-1 ~ caption 스케일 |
| **폰트 웨이트** | regular, medium, semibold, bold |

## 설치

```bash
pnpm add -D @exem-fe/tailwindcss-plugin
pnpm add @exem-fe/stylesheet
# or
npm install -D @exem-fe/tailwindcss-plugin
npm install @exem-fe/stylesheet
# or
yarn add -D @exem-fe/tailwindcss-plugin
yarn add @exem-fe/stylesheet
```

## 사용법

### tailwind.config.js

```javascript
import exemPlugin from '@exem-fe/tailwindcss-plugin';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [exemPlugin],
};
```

### CSS

```css
@import '@exem-fe/stylesheet';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### React

```tsx
import '@exem-fe/stylesheet';

function Button() {
  return (
    <button className="
      bg-exem-primary
      text-exem-white
      rounded-exem-medium
      shadow-exem-weak
      font-exem-semibold
    ">
      Click me
    </button>
  );
}
```

## 추가된 유틸리티

### 색상

```html
<div class="bg-exem-primary">Primary</div>
<div class="text-exem-secondary">Secondary</div>
<div class="border-exem-accent">Accent</div>
```

### 그라데이션

```html
<div class="bg-gradient-exem-to-r">로고 그라데이션 →</div>
<div class="bg-gradient-exem-to-b">로고 그라데이션 ↓</div>
```

### 타이포그래피

```html
<h1 class="text-header-1">Header 1</h1>
<h2 class="text-header-2">Header 2</h2>
<p class="text-body-1">Body 1</p>
```

### 반경 & 그림자

```html
<div class="rounded-exem-medium shadow-exem-weak">Card</div>
```

## 요구사항

- Node.js >= 18
- Tailwind CSS >= 3.0

## 관련 패키지

- [@exem-fe/stylesheet](https://www.npmjs.com/package/@exem-fe/stylesheet) - CSS 변수 (필수)
- [@exem-fe/design-token](https://www.npmjs.com/package/@exem-fe/design-token) - 디자인 토큰
- [@exem-fe/react](https://www.npmjs.com/package/@exem-fe/react) - React 컴포넌트

## 문의

- GitHub: https://github.com/EXEM-FE/design-system
- Issues: https://github.com/EXEM-FE/design-system/issues
- NPM: [@exem-fe](https://www.npmjs.com/org/exem-fe)

## 라이선스

Apache-2.0

---

Copyright 2025 EXEM Corporation
