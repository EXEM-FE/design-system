# exem-stylesheet

EXEM 디자인 시스템의 CSS 변수와 전역 스타일을 제공하는 패키지입니다.

## 개요

EXEM 디자인 시스템의 모든 CSS 변수(color, radius, shadow, breakpoint)를 포함한 `global.css` 파일을 제공합니다. 이 패키지는 순수 CSS 파일만 제공하며, 다른 패키지에서 import하여 사용할 수 있습니다.

## 주요 기능

- **전역 CSS 변수**: 색상, 반경, 그림자, 브레이크포인트 토큰
- **Primitive 색상**: 모든 색상 팔레트 (gray, red, blue, green 등)
- **Semantic 색상**: 텍스트, 보더, 아이콘, 서피스 색상
- **크기 토큰**: 반경, 그림자 효과, 브레이크포인트
- **즉시 사용 가능**: CSS 변수로 바로 활용 가능

## 설치

```bash
pnpm add exem-stylesheet
```

## 사용법

### TypeScript/JavaScript에서 임포트

```typescript
// 전역 CSS 변수 로드
import 'exem-stylesheet'

// 또는 직접 CSS 파일 임포트
import 'exem-stylesheet/src/global.css'
```

### CSS에서 임포트

```css
/* CSS 파일에서 임포트 */
@import 'exem-stylesheet/src/global.css';
```

### HTML에서 사용

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/exem-stylesheet/dist/index.css">
</head>
<body>
  <div style="color: var(--color-text-primary); background: var(--color-elevation-elevation-0);">
    <h1 style="color: var(--color-text-accent); border-radius: var(--radius-medium);">
      제목
    </h1>
    <p style="color: var(--color-text-secondary); box-shadow: var(--shadow-weak);">
      본문 텍스트
    </p>
  </div>
</body>
</html>
```

## 포함된 CSS 변수

### 1. 색상 변수 (Colors)

#### Primitive 색상
```css
:root {
  /* 단색 */
  --color-mono-white: #ffffff;
  --color-mono-black: #000000;
  
  /* 그레이 팔레트 */
  --color-gray-00: #f9fafb;
  --color-gray-01: #f3f4f6;
  /* ... 더 많은 그레이 단계 */
  --color-gray-10: #030712;
  
  /* 다양한 색상 팔레트 */
  --color-red-00: #fef2f2;
  --color-blue-00: #eff6ff;
  --color-green-00: #f0fdf4;
  /* ... 각 색상별 10단계 */
}
```

#### Semantic 색상
```css
:root {
  /* 텍스트 색상 */
  --color-text-primary: var(--color-gray-10);
  --color-text-secondary: var(--color-gray-08);
  --color-text-accent: var(--color-sky-05);
  
  /* 보더 색상 */
  --color-border-primary: var(--color-gray-02);
  --color-border-focused: var(--color-gray-10);
  
  /* 서피스 색상 */
  --color-surface-primary-default: var(--color-gray-10);
  --color-surface-accent-default: var(--color-sky-05);
}
```

### 2. 크기 변수

#### 반경 (Radius)
```css
:root {
  --radius-weak: 4px;
  --radius-medium: 6px;
  --radius-strong: 8px;
  --radius-circle: 999px;
}
```

#### 그림자 (Shadow)
```css
:root {
  --shadow-preview: 0px 4.501px 18.005px 0px rgba(0, 0, 0, 0.12);
  --shadow-weak: 0px 0px 16px 0px rgba(3, 7, 18, 0.1);
  --shadow-medium: 0px 0px 20px 0px rgba(3, 7, 18, 0.1);
  --shadow-strong: 0px 0px 24px 0px rgba(3, 7, 18, 0.1);
}
```

#### 브레이크포인트 (Breakpoint)
```css
:root {
  --breakpoint-md: 1200px;
  --breakpoint-lg: 1600px;
  --breakpoint-xl: 1920px;
}
```

## 사용 예제

### CSS에서 변수 활용
```css
.button {
  background-color: var(--color-surface-accent-default);
  color: var(--color-text-inverse);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-weak);
}

.card {
  background-color: var(--color-elevation-elevation-0);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-strong);
  box-shadow: var(--shadow-medium);
}
```

### 미디어 쿼리에서 브레이크포인트 활용
```css
@media (min-width: var(--breakpoint-md)) {
  .container {
    max-width: 1200px;
  }
}
```

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

## 의존성

### DevDependencies
- postcss - CSS 후처리
- tsup - 빌드 도구
- typescript - 타입 체크

## 파일 구조

```
stylesheet/
├── src/
│   ├── global.css      # 모든 CSS 변수 정의
│   └── index.ts        # TypeScript 엔트리
├── dist/
│   └── index.css       # 빌드된 CSS
└── package.json
```

## 관련 패키지

- `exem-design-token` - 이 패키지를 기반으로 TypeScript 토큰 생성

## 라이선스

MIT