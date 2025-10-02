# @exem-fe/tailwindcss-plugin

[![npm version](https://img.shields.io/npm/v/@exem-fe/tailwindcss-plugin)](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@exem-fe/tailwindcss-plugin)](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin)

EXEM 디자인 시스템을 Tailwind CSS 3에서 사용하기 위한 플러그인

## 개요

디자인 토큰을 Tailwind CSS 유틸리티 클래스와 컴포넌트로 자동 생성합니다.

### 통합 구조

```mermaid
graph TD
    A[@exem-fe/stylesheet] --> B[CSS Variables]
    C[@exem-fe/design-token] --> D[TypeScript Tokens]
    B --> E[Plugin]
    D --> E
    E --> F[Tailwind Config]
    F --> G[Utility Classes]
    G --> H[Your App]
    
    style A fill:#e1f5ff
    style C fill:#e1f5ff
    style E fill:#fff4e1
    style H fill:#e8f5e9
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

## 라이선스

Apache-2.0
