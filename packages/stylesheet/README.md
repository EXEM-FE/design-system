# @exem/stylesheet

EXEM 디자인 시스템의 CSS 유틸리티 및 기본 스타일 패키지입니다.

## 개요

EXEM 디자인 시스템의 디자인 토큰을 기반으로 한 CSS 스타일시트를 제공합니다. 기본 스타일, 유틸리티 클래스, 그리고 컴포넌트 스타일을 포함하여 일관된 디자인을 쉽게 적용할 수 있습니다.

## 주요 기능

- **기본 스타일**: CSS Reset, Typography, 전역 스타일
- **유틸리티 클래스**: Tailwind CSS 스타일의 유틸리티 클래스
- **컴포넌트 스타일**: 일반적인 UI 패턴의 기본 스타일
- **반응형 디자인**: 모바일 우선 반응형 유틸리티
- **커스텀 프로퍼티**: CSS 변수를 통한 테마 지원

## 설치

```bash
pnpm add @exem/stylesheet @exem/design-token
```

## 사용법

### CSS 임포트

```css
/* 전체 스타일시트 임포트 */
@import '@exem/stylesheet';

/* 또는 필요한 부분만 선택적 임포트 */
@import '@exem/stylesheet/base';
@import '@exem/stylesheet/utilities';
```

### HTML에서 사용

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@exem/stylesheet/dist/index.css">
</head>
<body>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-primary">
      제목
    </h1>
    <p class="text-gray-600 mt-2">
      본문 텍스트
    </p>
  </div>
</body>
</html>
```

## 포함된 스타일

### 1. 기본 스타일 (Base)

```css
/* CSS Reset */
* { box-sizing: border-box; }

/* Typography */
body { 
  font-family: var(--exem-font-family-base);
  line-height: var(--exem-line-height-base);
}

/* 폼 요소 */
input, button, select, textarea {
  font-family: inherit;
}
```

### 2. 유틸리티 클래스

#### 간격 (Spacing)
```css
.p-1 { padding: var(--exem-spacing-1); }
.m-2 { margin: var(--exem-spacing-2); }
.px-4 { padding-left: var(--exem-spacing-4); padding-right: var(--exem-spacing-4); }
```

#### 색상 (Colors)
```css
.text-primary { color: var(--exem-color-primary); }
.bg-secondary { background-color: var(--exem-color-secondary); }
.border-gray-200 { border-color: var(--exem-color-gray-200); }
```

#### 타이포그래피
```css
.text-sm { font-size: var(--exem-font-size-sm); }
.text-lg { font-size: var(--exem-font-size-lg); }
.font-bold { font-weight: var(--exem-font-weight-bold); }
```

#### 레이아웃
```css
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
.block { display: block; }
```

### 3. 컴포넌트 스타일

#### 버튼
```css
.btn {
  padding: var(--exem-spacing-2) var(--exem-spacing-4);
  border-radius: var(--exem-border-radius);
  font-weight: var(--exem-font-weight-medium);
}

.btn-primary {
  background-color: var(--exem-color-primary);
  color: var(--exem-color-white);
}
```

#### 카드
```css
.card {
  background-color: var(--exem-color-surface);
  border-radius: var(--exem-border-radius-lg);
  box-shadow: var(--exem-shadow-sm);
  padding: var(--exem-spacing-6);
}
```

## 반응형 유틸리티

```css
/* 모바일 우선 */
.sm:text-lg { /* 640px 이상 */ }
.md:p-6 { /* 768px 이상 */ }
.lg:grid-cols-3 { /* 1024px 이상 */ }
.xl:container { /* 1280px 이상 */ }
```

## 다크 모드 지원

```css
.dark .text-primary { color: var(--exem-color-primary-dark); }
.dark .bg-surface { background-color: var(--exem-color-surface-dark); }
```

## CSS 변수

모든 디자인 토큰은 CSS 커스텀 프로퍼티로 사용할 수 있습니다:

```css
:root {
  /* 색상 */
  --exem-color-primary: #007AFF;
  --exem-color-secondary: #34C759;
  
  /* 간격 */
  --exem-spacing-1: 4px;
  --exem-spacing-2: 8px;
  
  /* 타이포그래피 */
  --exem-font-size-sm: 14px;
  --exem-font-size-base: 16px;
  
  /* 그림자 */
  --exem-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

## 커스터마이징

CSS 변수를 오버라이드하여 테마를 커스터마이징할 수 있습니다:

```css
:root {
  --exem-color-primary: #FF6B6B;
  --exem-border-radius: 8px;
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

## PostCSS 플러그인

이 패키지는 다음 PostCSS 플러그인을 사용합니다:

- `autoprefixer` - 브라우저 호환성
- `cssnano` - CSS 최적화 (프로덕션)

## 의존성

### Dependencies
- @exem/design-token - 디자인 토큰 값

### DevDependencies
- postcss - CSS 후처리
- tsup - 빌드 도구

## 파일 구조

```
stylesheet/
├── src/
│   ├── base/           # 기본 스타일
│   ├── utilities/      # 유틸리티 클래스
│   ├── components/     # 컴포넌트 스타일
│   └── index.css       # 메인 엔트리
├── dist/
│   └── index.css       # 빌드된 CSS
└── package.json
```

## 라이선스

MIT