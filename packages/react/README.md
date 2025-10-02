<p align="center">
  <img src="https://raw.githubusercontent.com/EXEM-FE/design-system/main/assets/exem-design-system-banner.webp" alt="EXEM Design System" width="100%" />
</p>

# @exem-fe/react

[![npm version](https://img.shields.io/npm/v/@exem-fe/react)](https://www.npmjs.com/package/@exem-fe/react)
[![npm downloads](https://img.shields.io/npm/dm/@exem-fe/react)](https://www.npmjs.com/package/@exem-fe/react)

EXEM 디자인 시스템의 React 컴포넌트 라이브러리

## 설치

```bash
pnpm add @exem-fe/react @exem-fe/design-token
# or
npm install @exem-fe/react @exem-fe/design-token
# or
yarn add @exem-fe/react @exem-fe/design-token
```

## 아키텍처

```
@exem-fe/design-token
        ↓
@exem-fe/stylesheet  →  React Components
                              ↓
                        ┌─────┴─────┐
                   Breadcrumb      ...(예정)
```

## CSS 설정

**필수**: 컴포넌트 사용 전 디자인 토큰 CSS를 import해야 합니다.

```tsx
// App.tsx 또는 main.tsx
import '@exem-fe/design-token/css';
```

## 사용법

### Breadcrumb

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@exem-fe/react';

function App() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### 유틸리티 함수

```tsx
import { cn } from '@exem-fe/react';

// Tailwind 클래스 병합
const className = cn('text-red-500', 'bg-blue-500', {
  'font-bold': true,
  'italic': false,
});
```

## 현재 컴포넌트

| 컴포넌트 | 상태 | 설명 |
|----------|------|------|
| **Breadcrumb** | ✅ 사용 가능 | 경로 탐색 컴포넌트 |

## 개발

### 로컬에서 빌드

```bash
cd packages/react
pnpm build
```

### Storybook (로컬 개발용)

프로젝트 루트에서 실행:

```bash
pnpm storybook
```

## 요구사항

- Node.js >= 18
- React >= 19.0.0
- React DOM >= 19.0.0

## 관련 패키지

- [@exem-fe/design-token](https://www.npmjs.com/package/@exem-fe/design-token) - 디자인 토큰
- [@exem-fe/stylesheet](https://www.npmjs.com/package/@exem-fe/stylesheet) - CSS 변수
- [@exem-fe/tailwindcss-plugin](https://www.npmjs.com/package/@exem-fe/tailwindcss-plugin) - Tailwind 플러그인

## 문의

- GitHub: https://github.com/EXEM-FE/design-system
- Issues: https://github.com/EXEM-FE/design-system/issues
- NPM: [@exem-fe](https://www.npmjs.com/org/exem-fe)

## 라이선스

Apache-2.0

---

Copyright 2025 EXEM Corporation
