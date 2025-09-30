# EXEM 디자인 시스템 사용 가이드

이 문서는 EXEM 디자인 시스템을 **사용자 입장**과 **관리자 입장**에서 어떻게 활용하는지 설명합니다.

---

## 📱 사용자 입장 (개발자가 프로젝트에서 사용)

사용자는 EXEM 디자인 시스템을 NPM 패키지로 설치하여 자신의 프로젝트에서 사용합니다.

### 1️⃣ 초기 설정

#### Step 1: 패키지 설치

프로젝트 유형에 따라 필요한 패키지를 설치합니다.

**React 프로젝트인 경우:**
```bash
# 필수 패키지
pnpm add exem-design-token exem-react

# Tailwind를 사용한다면 추가
pnpm add -D exem-tailwindcss-plugin
```

**Tailwind만 사용하는 경우:**
```bash
pnpm add exem-design-token
pnpm add -D exem-tailwindcss-plugin
```

**순수 CSS만 사용하는 경우:**
```bash
pnpm add exem-stylesheet exem-design-token
```

#### Step 2: CSS 변수 임포트

애플리케이션 최상단에서 디자인 토큰 CSS를 임포트합니다.

```tsx
// main.tsx 또는 App.tsx
import 'exem-design-token/css'  // ✅ 필수!
import 'exem-react/dist/Button.css'  // React 컴포넌트 사용 시
```

#### Step 3: Tailwind 설정 (선택사항)

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('exem-tailwindcss-plugin')  // 🎨 EXEM 테마 자동 적용
  ]
}
```

### 2️⃣ 일상적인 개발

#### React 컴포넌트 사용

```tsx
import { Button } from 'exem-react'

function MyComponent() {
  return (
    <div>
      {/* 기본 사용 */}
      <Button>클릭</Button>
      
      {/* 스타일 커스터마이징 */}
      <Button 
        color="accent" 
        variant="outlined" 
        size="large"
        leftIcon={<SearchIcon />}
      >
        검색
      </Button>
      
      {/* 비활성화 */}
      <Button disabled>저장</Button>
    </div>
  )
}
```

#### Tailwind로 스타일링

```tsx
function MyComponent() {
  return (
    <div className="bg-surface-default text-gray-90 rounded-medium shadow-low p-4">
      <h1 className="text-accent-default font-bold">제목</h1>
      <p className="text-gray-60">설명 텍스트</p>
    </div>
  )
}
```

#### 디자인 토큰 직접 사용

```tsx
import { tokens } from 'exem-design-token'

const style = {
  backgroundColor: tokens.color['surface-accent-default'],
  borderRadius: tokens.radius.medium,
  boxShadow: tokens.shadow.low
}
```

### 3️⃣ 커스터마이징

프로젝트별 브랜딩이 필요한 경우:

```css
/* global.css */
:root {
  /* EXEM 토큰 오버라이드 */
  --color-accent-default: #your-brand-color;
  --radius-medium: 12px;
  --shadow-high: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### 4️⃣ 업데이트 받기

디자인 시스템 업데이트를 적용:

```bash
# 최신 버전으로 업데이트
pnpm update exem-design-token exem-react

# 특정 버전으로 업데이트
pnpm add exem-react@1.2.0
```

### 5️⃣ 문제 해결

**CSS가 적용되지 않는 경우:**
```tsx
// ❌ 잘못된 순서
import { Button } from 'exem-react'
import 'exem-design-token/css'  // 너무 늦음

// ✅ 올바른 순서
import 'exem-design-token/css'  // 먼저 임포트
import { Button } from 'exem-react'
```

**TypeScript 타입 에러:**
```bash
pnpm add -D @types/react @types/react-dom
```

---

## 🔧 관리자 입장 (디자인 시스템 유지보수)

관리자는 디자인 시스템 레포지토리를 관리하고, 새로운 컴포넌트/토큰을 추가하며, 버전을 배포합니다.

### 1️⃣ 개발 환경 설정

#### Step 1: 저장소 클론 및 설치

```bash
# 저장소 클론
git clone http://gitlab.exem.xyz/fe1-lab/exem-design.git
cd exem-design

# 의존성 설치 (pnpm 필수)
pnpm install
```

#### Step 2: 개발 서버 실행

```bash
# 전체 패키지 watch 모드
pnpm dev

# 특정 패키지만 watch
cd packages/react
pnpm dev
```

### 2️⃣ 디자인 토큰 관리

#### 새로운 색상 추가

**1. CSS 변수 정의:**
```css
/* packages/stylesheet/src/global.css */
:root {
  /* 새로운 색상 추가 */
  --color-success-default: #10b981;
  --color-success-hover: #059669;
}
```

**2. TypeScript 토큰 자동 생성:**
```bash
cd packages/design-token
pnpm generate
```

**3. 생성된 토큰 확인:**
```typescript
// packages/design-token/src/tokens/colorTokens.ts
export const colorTokens = {
  // ...
  'success-default': 'var(--color-success-default)',
  'success-hover': 'var(--color-success-hover)',
}
```

**4. 전체 빌드:**
```bash
cd ../..
pnpm build
```

#### 새로운 반경(radius) 추가

```css
/* packages/stylesheet/src/global.css */
:root {
  --radius-xlarge: 16px;
}
```

```bash
# 토큰 재생성
cd packages/design-token && pnpm generate && cd ../..
pnpm build
```

### 3️⃣ 새 React 컴포넌트 추가

#### Step 1: 컴포넌트 파일 생성

```bash
cd packages/react/src
```

```tsx
// Input.tsx
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './utils'
import './Input.css'

const inputVariants = cva(
  'w-full rounded-medium border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-30 focus:border-accent-default',
        error: 'border-critical-default'
      },
      size: {
        small: 'px-3 py-2 text-sm',
        medium: 'px-4 py-3',
        large: 'px-5 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium'
    }
  }
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
```

```css
/* Input.css */
.input {
  font-family: inherit;
}

.input:focus {
  outline: none;
  ring: 2px solid var(--color-accent-default);
}
```

#### Step 2: Export 추가

```typescript
// packages/react/src/index.ts
export { Button, buttonVariants, type ButtonProps } from './Button'
export { Input, type InputProps } from './Input'  // 추가
export { cn } from './utils'
```

#### Step 3: 빌드 및 테스트

```bash
cd ../..
pnpm build
pnpm typecheck
```

### 4️⃣ Storybook 추가 (선택사항)

```tsx
// Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    value: '잘못된 입력',
  },
}
```

### 5️⃣ 버전 관리 및 배포

#### Step 1: 변경사항 기록

```bash
pnpm changeset
```

프롬프트에 따라:
1. **변경된 패키지 선택**: Space로 선택, Enter로 다음
2. **변경 유형 선택**: patch / minor / major
3. **변경사항 설명**: 한글로 작성 가능

```
🦋  Which packages would you like to include?
◉ exem-react
◯ exem-design-token

🦋  What kind of change is this for exem-react?
◯ patch (버그 수정)
◉ minor (새 기능 추가)
◯ major (Breaking Change)

🦋  Please enter a summary for this change
Input 컴포넌트 추가
```

#### Step 2: 버전 업데이트

```bash
pnpm version
```

이 명령어는:
- 각 패키지의 `version` 필드 업데이트
- `CHANGELOG.md` 자동 생성
- 의존성 버전 업데이트

#### Step 3: Git 커밋 및 푸시

```bash
git add .
git commit -m "feat: add Input component

- Input 컴포넌트 추가 (default, error variant 지원)
- small, medium, large 사이즈 지원
- 버전 업데이트: exem-react 0.4.0 -> 0.5.0"

git push origin main
```

#### Step 4: NPM 배포

```bash
# NPM 로그인 (최초 1회)
npm login

# 배포
pnpm release
```

이 명령어는:
1. `workspace:*` 의존성을 실제 버전으로 변경
2. 모든 패키지 빌드
3. NPM에 퍼블리시
4. Git 태그 생성
5. 의존성 원복

#### Step 5: 배포 확인

```bash
# 배포된 패키지 확인
npm view exem-react
npm view exem-design-token

# 특정 버전 확인
npm view exem-react@0.5.0
```

### 6️⃣ 브랜치 전략

```bash
# 새 기능 개발
git checkout -b feature/input-component
# 작업...
git commit -m "feat: add Input component"
git push origin feature/input-component
# GitLab에서 Merge Request 생성

# 버그 수정
git checkout -b fix/button-disabled-style
# 작업...
git commit -m "fix: correct disabled button opacity"

# 긴급 패치
git checkout -b hotfix/critical-css-bug
# 작업...
```

### 7️⃣ 코드 품질 관리

```bash
# 린트 체크
pnpm lint

# 자동 수정
pnpm lint:fix

# 타입 체크
pnpm typecheck

# 테스트 실행
pnpm test

# 전체 빌드 검증
pnpm build
```

### 8️⃣ 유용한 스크립트

```bash
# 모든 dist 폴더 삭제
pnpm clean

# 특정 패키지만 빌드
cd packages/react && pnpm build

# 토큰 감시 모드
pnpm watch:tokens

# 의존성 버전 확인
pnpm list --depth=0
```

### 9️⃣ 문제 해결

#### 빌드 실패 시

```bash
# 캐시 삭제 후 재설치
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

#### 타입 오류 시

```bash
# 타입 체크만 실행
pnpm typecheck

# 특정 패키지만 체크
cd packages/react && pnpm typecheck
```

#### Changeset 수정

```bash
# .changeset 폴더의 .md 파일 수정
vim .changeset/some-changeset-id.md

# 또는 삭제 후 재생성
rm .changeset/some-changeset-id.md
pnpm changeset
```

---

## 📊 워크플로우 비교

### 사용자 (개발자)
```
1. pnpm add exem-react
2. import & 사용
3. 정기적으로 pnpm update
4. 커스터마이징 필요 시 CSS 오버라이드
```

### 관리자 (메인테이너)
```
1. git clone & pnpm install
2. 디자인 토큰/컴포넌트 수정
3. pnpm changeset
4. pnpm version
5. git push
6. pnpm release (NPM 배포)
```

---

## 🔗 관련 문서

- [프로젝트 개요](./PROJECT_OVERVIEW.md)
- [빌드 상태](./BUILD_STATUS.md)
- [NPM 배포 계획](./NPM_DEPLOYMENT_PLAN.md)
- [React 패키지 가이드](./packages/react/README.md)

---

## 📝 라이선스

Apache-2.0 © 2025 EXEM Corporation
