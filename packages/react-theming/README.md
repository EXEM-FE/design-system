# @exem/react-theming

EXEM 디자인 시스템의 React 테마 시스템입니다.

## 개요

React 애플리케이션에서 EXEM 디자인 시스템의 테마를 관리하고 적용할 수 있는 시스템을 제공합니다. 다크/라이트 모드 전환, 커스텀 테마 생성, 동적 테마 변경 등을 지원합니다.

## 주요 기능

- **테마 프로바이더**: Context API를 통한 전역 테마 관리
- **다크/라이트 모드**: 자동 시스템 설정 감지 및 수동 전환
- **CSS 변수**: CSS 커스텀 프로퍼티를 통한 동적 테마 적용
- **테마 커스터마이징**: 기본 테마를 확장한 커스텀 테마 생성
- **TypeScript 지원**: 완전한 타입 안전성 제공

## 설치

```bash
pnpm add @exem/react-theming @exem/design-token
```

## 기본 사용법

### 1. ThemeProvider로 앱 감싸기

```tsx
import { ThemeProvider } from '@exem/react-theming'
import App from './App'

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
```

### 2. 컴포넌트에서 테마 사용

```tsx
import { useTheme } from '@exem/react-theming'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <p style={{ color: theme.colors.text }}>
        현재 테마: {theme.mode}
      </p>
      <button onClick={toggleTheme}>
        테마 전환
      </button>
    </div>
  )
}
```

## 고급 사용법

### 커스텀 테마 생성

```tsx
import { createTheme, ThemeProvider } from '@exem/react-theming'

const customTheme = createTheme({
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    // 기타 색상 오버라이드
  },
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
    // 기타 타이포그래피 설정
  }
})

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 앱 컴포넌트들 */}
    </ThemeProvider>
  )
}
```

### 조건부 테마 적용

```tsx
import { useTheme, createTheme } from '@exem/react-theming'

function ThemedComponent() {
  const { theme, setTheme } = useTheme()
  
  const handleBrandTheme = () => {
    const brandTheme = createTheme({
      colors: {
        primary: '#007AFF',
        background: '#F2F2F7'
      }
    })
    setTheme(brandTheme)
  }
  
  return (
    <button onClick={handleBrandTheme}>
      브랜드 테마 적용
    </button>
  )
}
```

## API 레퍼런스

### ThemeProvider

```tsx
interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Theme
  defaultMode?: 'light' | 'dark' | 'system'
}
```

### useTheme Hook

```tsx
interface UseThemeReturn {
  theme: Theme
  mode: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  setMode: (mode: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}
```

### createTheme Function

```tsx
function createTheme(overrides?: Partial<Theme>): Theme
```

## 테마 구조

```typescript
interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    // ... 기타 색상
  }
  typography: {
    fontFamily: string
    fontSize: Record<string, string>
    fontWeight: Record<string, number>
    lineHeight: Record<string, number>
  }
  spacing: Record<string, string>
  shadows: Record<string, string>
  breakpoints: Record<string, string>
}
```

## CSS 변수

테마 시스템은 다음과 같은 CSS 변수를 자동으로 생성합니다:

```css
:root {
  --exem-color-primary: #007AFF;
  --exem-color-secondary: #34C759;
  --exem-color-background: #FFFFFF;
  --exem-spacing-sm: 8px;
  --exem-spacing-md: 16px;
  /* ... 기타 변수 */
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

### Peer Dependencies
- React >=19.0.0
- React DOM >=19.0.0

### Dependencies
- @exem/design-token - 기본 디자인 토큰

## 라이선스

MIT