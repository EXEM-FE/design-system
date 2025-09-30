# React 패키지 배포 계획

## 📊 현재 상태 (2025-09-30)

### ✅ 구현 완료 사항

| 항목 | 상태 | 비고 |
|------|------|------|
| **Button 컴포넌트** | ✅ 완료 | 6개 variant, 5개 size |
| **빌드 시스템** | ✅ 완료 | tsup 기반, CJS/ESM 지원 |
| **TypeScript 타입** | ✅ 완료 | 타입 정의 파일 생성됨 |
| **디자인 토큰 통합** | ✅ 완료 | exem-design-token 사용 |
| **Storybook** | ✅ 구성됨 | Button.stories.tsx 작성 완료 |
| **CSS Modules** | ✅ 완료 | Button.css 분리 |

### 📦 빌드 산출물

```
dist/
├── index.js         5.80 KB   (CJS bundle)
├── index.mjs        3.76 KB   (ESM bundle)
├── index.css        1.13 KB   (컴포넌트 스타일)
├── index.d.ts       776 B     (TypeScript 정의)
└── index.d.mts      776 B     (ESM TypeScript 정의)
```

### 🎨 현재 구현된 컴포넌트

#### Button 컴포넌트

**Variants (6개):**
- `primary` - 기본 primary 버튼
- `primary-subtle` - 서브틀 primary 버튼
- `accent` - 강조 버튼
- `accent-subtle` - 서브틀 강조 버튼
- `critical` - 경고/삭제 버튼
- `critical-subtle` - 서브틀 경고 버튼

**Sizes (5개):**
- `xs` - Extra Small (px-2 py-1)
- `sm` - Small (px-3 py-1.5)
- `md` - Medium (px-4 py-2) - 기본값
- `lg` - Large (px-6 py-3)
- `xl` - Extra Large (px-8 py-4)

**주요 기능:**
- ✅ CSS 변수 기반 스타일링 (디자인 토큰)
- ✅ Hover/Disabled 상태 지원
- ✅ asChild prop (Radix UI Slot 패턴)
- ✅ 완전한 TypeScript 타입 지원
- ✅ 접근성 (focus-visible 등)

---

## 🎯 배포 준비 체크리스트

### Phase 1: 필수 사항 (배포 전 완료 필요)

#### 1.1 패키지 메타데이터 업데이트

- [ ] **패키지명 스코프 변경**: `exem-react` → `@exem/react`
- [ ] **repository URL 추가**
- [ ] **homepage 추가**
- [ ] **author 정보 추가**
- [ ] **license 확인** (현재 없음, MIT 추가 권장)
- [ ] **publishConfig 추가** (access: public)

```json
{
  "name": "@exem/react",
  "version": "0.1.1",
  "author": "EXEM Design Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/exem/design-system",
    "directory": "packages/react"
  },
  "homepage": "https://design.exem.io",
  "bugs": {
    "url": "https://github.com/exem/design-system/issues"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

#### 1.2 README.md 업데이트

현재 README는 "미구현" 상태로 표시되어 있어 **전면 재작성 필요**

**필수 포함 내용:**
- [x] 설치 방법
- [x] Button 컴포넌트 사용 예제
- [x] Props API 문서
- [x] Variant 미리보기
- [x] Storybook 링크 (배포 시)
- [x] 기여 가이드

#### 1.3 의존성 정리

**현재 문제:**
- `exem-icon` 패키지가 미구현 상태인데 의존성에 포함됨

**해결 방안:**
1. **옵션 A** (권장): exem-icon을 dependencies에서 제거
2. **옵션 B**: exem-icon을 peerDependencies로 이동 (선택사항으로 표시)

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "exem-design-token": "workspace:*"
    // exem-icon 제거 (미구현)
  }
}
```

#### 1.4 export 구조 확인

**현재 export:**
```typescript
export { Button, type ButtonProps, buttonVariants } from "./Button"
```

**검증 필요:**
- [x] Button 컴포넌트 export
- [x] ButtonProps 타입 export
- [x] buttonVariants (CVA) export
- [ ] 향후 추가될 컴포넌트 고려

---

## 🚀 배포 실행 계획

### Step 1: 사전 준비 (1-2시간)

#### 1.1 패키지명 변경

```bash
# 1. package.json 수정
cd packages/react
# name: "exem-react" → "@exem/react"

# 2. 다른 패키지에서 참조 업데이트 (없음)

# 3. 의존성 재설치
cd ../..
pnpm install
```

#### 1.2 README.md 재작성

**새로운 README.md 구조:**

```markdown
# @exem/react

EXEM Design System의 React 컴포넌트 라이브러리

## 설치

\`\`\`bash
npm install @exem/react @exem/design-token
# or
pnpm add @exem/react @exem/design-token
\`\`\`

## 사용법

### Button 컴포넌트

\`\`\`tsx
import { Button } from '@exem/react'

function App() {
  return (
    <>
      <Button>Primary Button</Button>
      <Button variant="accent">Accent Button</Button>
      <Button variant="critical" size="lg">Delete</Button>
    </>
  )
}
\`\`\`

## 컴포넌트

### Button

...
```

#### 1.3 의존성 정리

```bash
# exem-icon 의존성 제거
# package.json에서 수동 제거 후
pnpm install
```

#### 1.4 최종 빌드 및 검증

```bash
# 1. 빌드
pnpm build

# 2. 타입 체크
pnpm typecheck

# 3. 빌드 산출물 확인
ls -la packages/react/dist/

# 4. dry-run 테스트
cd packages/react
npm publish --dry-run
```

### Step 2: 초기 배포 (30분)

#### 2.1 Changeset 생성

```bash
# 루트에서 실행
pnpm changeset

# 대화형 프롬프트:
# 1. @exem/react 선택
# 2. minor 선택 (첫 배포이지만 0.x.x이므로)
# 3. 변경사항 작성:
#    "feat: Initial release with Button component
#    
#    - Add Button component with 6 variants
#    - Support 5 different sizes
#    - Full TypeScript support
#    - Design token integration"
```

#### 2.2 버전 업데이트

```bash
# 버전 업데이트 및 CHANGELOG 생성
pnpm version

# 예상 결과: 0.1.1 → 0.2.0
```

#### 2.3 npm 배포

**배포 순서 (의존성 순):**

```bash
# 1. exem-stylesheet 배포 (선행 조건)
cd packages/stylesheet
npm publish --access public

# 2. exem-design-token 배포 (선행 조건)
cd ../design-token
npm publish --access public

# 3. exem-react 배포
cd ../react
npm publish --access public
```

또는 자동화된 배포:

```bash
# 루트에서 실행
pnpm release
```

#### 2.4 배포 후 검증

```bash
# 1. npm에서 패키지 확인
npm view @exem/react

# 2. 설치 테스트
mkdir /tmp/test-react
cd /tmp/test-react
npm init -y
npm install @exem/react react react-dom

# 3. import 테스트
node -e "console.log(require('@exem/react'))"
```

---

## 📈 배포 후 로드맵

### Phase 2: 문서화 및 홍보 (1주)

#### 2.1 Storybook 배포

```bash
# Storybook 빌드
cd packages/react
pnpm build-storybook

# 배포 옵션:
# - Chromatic
# - GitHub Pages
# - Vercel
# - Netlify
```

**배포 URL 예시:**
- `https://storybook.design.exem.io`
- `https://exem.github.io/design-system`

#### 2.2 문서 사이트 업데이트

packages/docs에 React 사용 가이드 추가:
- Button 컴포넌트 문서
- 설치 가이드
- 예제 코드
- API 레퍼런스

#### 2.3 npm 배지 추가

README.md에 배지 추가:

```markdown
[![npm version](https://badge.fury.io/js/@exem%2Freact.svg)](https://www.npmjs.com/package/@exem/react)
[![npm downloads](https://img.shields.io/npm/dm/@exem/react.svg)](https://www.npmjs.com/package/@exem/react)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@exem/react)](https://bundlephobia.com/package/@exem/react)
```

### Phase 3: 추가 컴포넌트 개발 (2-4주)

#### 우선순위 1 (기본 Form 컴포넌트)

**3.1 Input 컴포넌트 (1주)**
- [ ] 기본 텍스트 입력
- [ ] 타입 지원 (text, email, password, number, etc.)
- [ ] 크기 variant (sm, md, lg)
- [ ] 상태 (error, disabled, readonly)
- [ ] 아이콘 슬롯 (prefix/suffix)
- [ ] Storybook 문서

**3.2 Textarea 컴포넌트 (2일)**
- [ ] 다중 행 텍스트 입력
- [ ] 자동 높이 조절 옵션
- [ ] 크기 variant
- [ ] 상태 관리

**3.3 Checkbox 컴포넌트 (2일)**
- [ ] 기본 체크박스
- [ ] indeterminate 상태
- [ ] 크기 variant
- [ ] 레이블 통합

**3.4 Radio 컴포넌트 (2일)**
- [ ] 라디오 버튼 그룹
- [ ] 크기 variant
- [ ] 레이블 통합

#### 우선순위 2 (피드백 컴포넌트)

**3.5 Alert 컴포넌트 (3일)**
- [ ] 다양한 severity (info, success, warning, error)
- [ ] 닫기 버튼 옵션
- [ ] 아이콘 통합
- [ ] 애니메이션

**3.6 Toast 컴포넌트 (1주)**
- [ ] 토스트 알림 시스템
- [ ] 위치 설정 (top-right, bottom-left, etc.)
- [ ] 자동 닫기
- [ ] 큐 관리
- [ ] 애니메이션

#### 우선순위 3 (레이아웃 컴포넌트)

**3.7 Card 컴포넌트 (2일)**
- [ ] 기본 카드 레이아웃
- [ ] Header, Body, Footer 섹션
- [ ] variant (outlined, elevated)
- [ ] 호버 효과

**3.8 Divider 컴포넌트 (1일)**
- [ ] 수평/수직 구분선
- [ ] 텍스트 포함 옵션

### Phase 4: 고급 컴포넌트 (4-8주)

#### 4.1 Modal/Dialog (1주)
- Radix UI Dialog 기반
- 애니메이션
- 포커스 트랩
- 접근성

#### 4.2 Dropdown/Select (1주)
- Radix UI Select 기반
- 검색 기능
- 다중 선택
- 가상 스크롤

#### 4.3 Table (2주)
- 정렬
- 필터링
- 페이지네이션
- 가상 스크롤

#### 4.4 Tab (3일)
- Radix UI Tabs 기반
- 키보드 네비게이션
- 다양한 스타일

---

## 🔄 지속적인 유지보수 계획

### 주간 업데이트 (매주 금요일)

#### 버그 수정 및 패치
```bash
# 버그 수정 후
pnpm changeset
# → patch 선택
# → 버그 설명 작성

pnpm version
pnpm release
```

### 월간 기능 추가 (매월 첫째 주)

#### 새 컴포넌트 또는 기능
```bash
# 새 컴포넌트 완료 후
pnpm changeset
# → minor 선택
# → 기능 설명 작성

pnpm version
pnpm release
```

### 분기별 Major 업데이트 (선택)

#### Breaking Changes
```bash
# API 변경 시
pnpm changeset
# → major 선택
# → Breaking changes 상세 설명
# → 마이그레이션 가이드 작성

pnpm version
pnpm release
```

---

## 📊 성공 지표 (KPI)

### 3개월 후 (2026년 1월)

**사용 지표:**
- [ ] npm 주간 다운로드 50+
- [ ] GitHub Stars 30+
- [ ] 구현된 컴포넌트 5개 이상

**품질 지표:**
- [ ] TypeScript 커버리지 100%
- [ ] Storybook 문서 완성도 80%+
- [ ] 접근성 WCAG 2.1 AA 준수
- [ ] 번들 사이즈 < 20KB (gzipped)

### 6개월 후 (2026년 4월)

**사용 지표:**
- [ ] npm 주간 다운로드 200+
- [ ] GitHub Stars 100+
- [ ] 구현된 컴포넌트 15개 이상
- [ ] 내부 프로젝트 3개 이상 적용

**품질 지표:**
- [ ] 테스트 커버리지 80%+
- [ ] Lighthouse 접근성 점수 95+
- [ ] 번들 사이즈 최적화 (트리 쉐이킹)

---

## 🚨 배포 전 최종 체크리스트

### 필수 확인사항

#### 패키지 설정
- [ ] 패키지명 스코프 적용 (@exem/react)
- [ ] repository URL 추가
- [ ] author/license 정보 추가
- [ ] publishConfig.access = "public"
- [ ] exem-icon 의존성 제거

#### 문서
- [ ] README.md 재작성 (Button 문서 포함)
- [ ] CHANGELOG.md 생성
- [ ] LICENSE 파일 추가
- [ ] API 문서 작성

#### 코드 품질
- [ ] pnpm build 성공
- [ ] pnpm typecheck 성공
- [ ] pnpm lint 성공
- [ ] Storybook 빌드 성공

#### 테스트
- [ ] npm publish --dry-run 성공
- [ ] 로컬 설치 테스트
- [ ] import 테스트
- [ ] Button 렌더링 테스트

#### 의존성
- [ ] exem-stylesheet 배포 완료
- [ ] exem-design-token 배포 완료
- [ ] peerDependencies 버전 범위 확인

---

## 💡 배포 팁 및 주의사항

### 1. 버전 전략

**현재: 0.1.1 → 목표: 0.2.0**

```
0.2.0 (첫 배포) - Button 컴포넌트
0.3.0 - Input, Textarea 추가
0.4.0 - Checkbox, Radio 추가
...
1.0.0 - 10개+ 컴포넌트, 프로덕션 준비 완료
```

### 2. Breaking Changes 관리

0.x.x 버전에서는 minor 버전에서도 Breaking Changes 허용 가능:
- 0.2.0 → 0.3.0: Button API 변경 가능
- 1.0.0 이후부터는 Semantic Versioning 엄격 준수

### 3. 번들 사이즈 최적화

**현재: ~6KB (CJS)**

목표:
- Tree-shaking 지원 (ESM)
- 컴포넌트별 개별 import
- CSS-in-JS 대신 CSS 파일 분리 (이미 적용됨)

```typescript
// Tree-shaking 가능
import { Button } from '@exem/react'  // ✅ 권장

// 전체 번들
import * as ExemReact from '@exem/react'  // ❌ 비권장
```

### 4. Peer Dependencies 주의

**React 19 요구사항:**
```json
{
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  }
}
```

사용자가 React 18 사용 시 경고 발생:
- 필요시 React 18 지원 여부 검토
- `"react": ">=18.0.0"` 으로 완화 고려

### 5. CSS 변수 의존성

**중요:** exem-design-token이 제공하는 CSS 변수 필수

사용자 가이드에 명시:
```tsx
// App.tsx 또는 _app.tsx
import '@exem/design-token/css'  // CSS 변수 로드

import { Button } from '@exem/react'
```

---

## 🎓 참고 자료

### 유사 라이브러리 벤치마크

| 라이브러리 | 번들 사이즈 | 컴포넌트 수 | npm 다운로드/주 |
|-----------|------------|------------|----------------|
| Radix UI | ~2-5KB | 30+ | 500K+ |
| Chakra UI | ~47KB | 50+ | 300K+ |
| Mantine | ~120KB | 100+ | 50K+ |
| **@exem/react (목표)** | **<20KB** | **15+** | **1K+** |

### 학습 자료

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Class Variance Authority](https://cva.style/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
- [Storybook Best Practices](https://storybook.js.org/docs/react/writing-docs/introduction)

---

## 📞 연락처 및 지원

### GitHub Issues
- 버그 리포트
- 기능 요청
- 문의사항

### GitHub Discussions
- 사용법 질문
- 아이디어 공유
- 커뮤니티 논의

---

**문서 버전:** 1.0.0  
**최종 업데이트:** 2025-09-30  
**담당자:** EXEM Design System Team  
**배포 예정일:** 2025년 10월 첫째 주
