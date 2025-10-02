<p align="center">
  <img src="https://raw.githubusercontent.com/EXEM-FE/design-system/main/assets/exem-design-system-banner.webp" alt="EXEM Design System" width="100%" />
</p>

# @exem-fe/stylesheet

[![npm version](https://img.shields.io/npm/v/@exem-fe/stylesheet)](https://www.npmjs.com/package/@exem-fe/stylesheet)
[![npm downloads](https://img.shields.io/npm/dm/@exem-fe/stylesheet)](https://www.npmjs.com/package/@exem-fe/stylesheet)

EXEM 디자인 시스템의 CSS 변수와 전역 스타일

## 개요

모든 CSS 변수(color, radius, shadow, breakpoint)를 포함한 전역 스타일을 제공합니다.

### CSS 변수 계층 구조

```
                 global.css
                     ↓
     ┌───────────────┼───────────────┐
     ↓               ↓               ↓
Primitive Colors  Semantic Tokens  Size Tokens
     ↓               ↓               ↓
 ┌───┼───┐      ┌───┼───┐      ┌───┼───┐
gray red blue   text border   radius shadow
 00~10 00~10    primary accent medium weak
```

## 주요 기능

| 기능 | 설명 |
|------|------|
| **전역 CSS 변수** | 색상, 반경, 그림자, 브레이크포인트 |
| **Primitive 색상** | gray, red, blue, green 등 전체 팔레트 |
| **Semantic 색상** | 텍스트, 테두리, 아이콘, 서피스 |
| **즉시 사용** | CSS 변수로 바로 활용 |

## 설치

```bash
pnpm add @exem-fe/stylesheet
# or
npm install @exem-fe/stylesheet
# or
yarn add @exem-fe/stylesheet
```

## 사용법

### CSS/SCSS

```css
@import '@exem-fe/stylesheet';

.button {
  background: var(--color-surface-primary-default);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-weak);
}
```

### React/Next.js

```tsx
// App.tsx
import '@exem-fe/stylesheet';
```

### Vanilla JS

```html
<link rel="stylesheet" href="node_modules/@exem-fe/stylesheet/dist/index.css" />
```

## 포함된 CSS 변수

### 색상 (300+)
- Primitive: `--color-gray-00` ~ `--color-pink-10`
- Text: `--color-text-primary`, `--color-text-secondary`
- Border: `--color-border-primary`, `--color-border-accent`
- Icon: `--color-icon-primary`, `--color-icon-disabled`
- Surface: `--color-surface-primary-default`

### 크기
- Radius: `--radius-weak`, `--radius-medium`, `--radius-strong`
- Shadow: `--shadow-weak`, `--shadow-medium`, `--shadow-strong`
- Breakpoint: `--breakpoint-md`, `--breakpoint-lg`

## 다른 패키지와 함께 사용

```bash
# TypeScript 토큰
pnpm add @exem-fe/design-token
# or npm install / yarn add

# Tailwind 플러그인
pnpm add -D @exem-fe/tailwindcss-plugin
# or npm install -D / yarn add -D
```

## 요구사항

- Node.js >= 18

## 관련 패키지

- [@exem-fe/design-token](https://www.npmjs.com/package/@exem-fe/design-token) - 디자인 토큰
- [@exem-fe/react](https://www.npmjs.com/package/@exem-fe/react) - React 컴포넌트
- [@exem-fe/tailwindcss-plugin](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin) - Tailwind 플러그인

## 문의

- GitHub: https://github.com/EXEM-FE/design-system
- Issues: https://github.com/EXEM-FE/design-system/issues
- NPM: [@exem-fe](https://www.npmjs.com/org/exem-fe)

## 라이선스

Apache-2.0

---

Copyright 2025 EXEM Corporation
