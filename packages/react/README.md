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

```mermaid
graph LR
    A[@exem-fe/design-token] --> B[React Components]
    C[@exem-fe/stylesheet] --> B
    B --> D[Breadcrumb]
    B --> E[Button 예정]
    B --> F[더 많은 컴포넌트...]
    
    style A fill:#e1f5ff
    style C fill:#e1f5ff
    style B fill:#fff4e1
    style D fill:#e8f5e9
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

### Storybook

```bash
cd packages/react
pnpm storybook
```

http://localhost:6006 에서 확인 가능

### 빌드

```bash
pnpm build
```

## 라이선스

Apache-2.0
