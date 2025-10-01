# @exem-fe/react

EXEM Design System의 React 컴포넌트 라이브러리입니다.

## 📦 설치

```bash
pnpm add @exem-fe/react @exem-fe/design-token
# or
npm install @exem-fe/react @exem-fe/design-token
# or
yarn add @exem-fe/react @exem-fe/design-token
```

## 🎨 CSS 설정

**중요**: 컴포넌트를 사용하기 전에 반드시 디자인 토큰 CSS를 import해야 합니다.

### App 최상단에서 import (권장)

```tsx
// App.tsx 또는 main.tsx
import '@exem-fe/design-token/css'
import '@exem-fe/react/dist/Button.css' // Button 스타일
```

## 🚀 사용법

### Button Component

```tsx
import { Button } from '@exem-fe/react'

function App() {
  return (
    <div>
      {/* 기본 버튼 */}
      <Button>클릭</Button>

      {/* 색상 & 변형 */}
      <Button color="primary" variant="contained">Primary</Button>
      <Button color="accent" variant="outlined">Accent Outlined</Button>
      <Button color="critical" variant="text">Critical Text</Button>

      {/* 사이즈 */}
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>

      {/* 아이콘 */}
      <Button leftIcon={<IconSearch />}>검색</Button>
      <Button rightIcon={<IconArrow />}>다음</Button>

      {/* 정렬 */}
      <Button align="start">Start</Button>
      <Button align="between">Space Between</Button>
      
      {/* 비활성화 */}
      <Button disabled>Disabled</Button>
    </div>
  )
}
```

### 레거시 Variant 지원 (하위 호환성)

기존 코드도 그대로 작동합니다:

```tsx
<Button variant="primary">Primary</Button>      {/* → contained + primary */}
<Button variant="secondary">Secondary</Button>  {/* → contained + secondary */}
<Button variant="tertiary">Tertiary</Button>    {/* → outlined + primary */}
<Button variant="quaternary">Text</Button>       {/* → text + primary */}
<Button variant="accent">Accent</Button>        {/* → contained + accent */}
<Button variant="critical">Critical</Button>    {/* → contained + critical */}
```

## 📖 API Reference

### ButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'contained' \| 'outlined' \| 'text'` | `'contained'` | 버튼 스타일 |
| `color` | `'primary' \| 'secondary' \| 'accent' \| 'critical'` | `'primary'` | 버튼 색상 |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | 버튼 크기 |
| `leftIcon` | `React.ReactElement` | - | 왼쪽 아이콘 |
| `rightIcon` | `React.ReactElement` | - | 오른쪽 아이콘 |
| `align` | `'start' \| 'end' \| 'between' \| 'around' \| 'center' \| 'startEnd'` | `'center'` | 내부 정렬 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `className` | `string` | - | 추가 CSS 클래스 |

### Color & Variant 조합

| Color | Contained | Outlined | Text |
|-------|-----------|----------|------|
| primary | ✅ | ✅ | ✅ |
| secondary | ✅ | ❌ | ❌ |
| accent | ✅ | ✅ | ✅ |
| critical | ✅ | ✅ | ✅ |

> **Note**: `secondary` 색상은 `contained` variant만 지원합니다.

## 🎨 CSS 커스터마이징

Button 컴포넌트는 CSS 변수를 사용하므로, `@exem-fe/design-token`의 변수를 오버라이드하여 커스터마이징할 수 있습니다:

```css
:root {
  /* 색상 오버라이드 */
  --color-gray-10: #your-color;
  --color-sky-05: #your-accent-color;
  
  /* 둥글기 오버라이드 */
  --radius-medium: 8px;
}
```

## 🔧 유틸리티

### cn 함수

Tailwind CSS 클래스를 병합하는 유틸리티 함수:

```tsx
import { cn } from '@exem-fe/react'

<Button className={cn('custom-class', condition && 'conditional-class')}>
  Click
</Button>
```

## ⚠️ 트러블슈팅

### CSS가 적용되지 않는 경우

1. **CSS import 확인**
   ```tsx
   import '@exem-fe/design-token/css'
   import '@exem-fe/react/dist/Button.css'
   ```

2. **CSS 변수 로드 확인**
   - 브라우저 개발자 도구에서 `--color-gray-10` 같은 변수가 정의되어 있는지 확인

3. **번들러 설정 확인** (Vite)
   ```ts
   // vite.config.ts
   export default defineConfig({
     optimizeDeps: {
       include: ['@exem-fe/design-token', '@exem-fe/react']
     }
   })
   ```

### TypeScript 에러

```bash
# 타입 정의가 없다는 에러가 발생하면
pnpm add -D @types/react @types/react-dom
```

## 📝 License

MIT

## 🔗 Links

- [GitHub](https://github.com/EXEM-FE/design-system)
- [npm](https://www.npmjs.com/package/@exem-fe/react)