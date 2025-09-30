# React 패키지 배포 체크리스트

## 🎯 목표: @exem/react 패키지를 npm에 배포

**예상 소요 시간:** 2-3시간  
**목표 완료일:** 2025년 10월 첫째 주

---

## ✅ Phase 1: 사전 준비 (1시간)

### 1.1 패키지 메타데이터 업데이트

#### packages/react/package.json 수정

```bash
# 파일 열기
code packages/react/package.json
```

**변경 사항:**

```json
{
  "name": "@exem/react",  // ✅ 스코프 추가
  "version": "0.1.1",
  "description": "EXEM Design System - React Components",
  "author": "EXEM Design Team",  // ⭐ 추가
  "license": "MIT",  // ⭐ 추가
  "repository": {  // ⭐ 추가
    "type": "git",
    "url": "https://github.com/exem/design-system",
    "directory": "packages/react"
  },
  "homepage": "https://design.exem.io",  // ⭐ 추가
  "bugs": {  // ⭐ 추가
    "url": "https://github.com/exem/design-system/issues"
  },
  "keywords": [
    "react",
    "components",
    "exem",
    "design-system",
    "typescript"  // ⭐ 추가
  ],
  "publishConfig": {  // ⭐ 추가
    "access": "public"
  },
  // ... 나머지 동일
}
```

**체크리스트:**
- [ ] name: `@exem/react`로 변경
- [ ] author 추가
- [ ] license 추가
- [ ] repository 추가
- [ ] homepage 추가
- [ ] bugs 추가
- [ ] publishConfig 추가

### 1.2 exem-icon 의존성 제거

**현재 문제:** exem-icon이 미구현 상태인데 dependencies에 포함됨

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "exem-design-token": "workspace:*"
    // "exem-icon": "workspace:*" ← 제거
  }
}
```

**체크리스트:**
- [ ] exem-icon 의존성 제거
- [ ] pnpm install 재실행

### 1.3 README.md 확인

**이미 완료됨** ✅

현재 README.md가 업데이트되어 있으므로 추가 작업 불필요

**체크리스트:**
- [x] README.md 업데이트 완료

### 1.4 LICENSE 파일 추가

**루트 또는 packages/react에 LICENSE 파일 필요**

```bash
# 루트에 MIT License 추가
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 EXEM Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

**체크리스트:**
- [ ] LICENSE 파일 생성

---

## ✅ Phase 2: 빌드 및 검증 (30분)

### 2.1 의존성 재설치

```bash
# 루트에서 실행
cd /Users/han-won-yeong/Documents/project/exem-design
pnpm install
```

**체크리스트:**
- [ ] pnpm install 성공
- [ ] node_modules 정상 설치 확인

### 2.2 전체 빌드

```bash
# 전체 패키지 빌드
pnpm build
```

**예상 결과:**
```
✓ exem-stylesheet build succeeded
✓ exem-design-token build succeeded
✓ exem-tailwindcss-plugin build succeeded
✓ exem-react build succeeded
```

**체크리스트:**
- [ ] 빌드 성공 (exit code 0)
- [ ] packages/react/dist 폴더 생성 확인
- [ ] dist/index.js 파일 존재
- [ ] dist/index.d.ts 파일 존재

### 2.3 타입 체크

```bash
# 전체 패키지 타입 체크
pnpm typecheck
```

**체크리스트:**
- [ ] 타입 오류 없음

### 2.4 린트 검사

```bash
# 린트 검사 및 자동 수정
pnpm lint:fix
```

**체크리스트:**
- [ ] 린트 오류 없음

### 2.5 빌드 산출물 확인

```bash
# React 패키지 dist 확인
ls -lh packages/react/dist/
```

**예상 파일:**
- index.js (CJS)
- index.mjs (ESM)
- index.css
- index.d.ts
- index.d.mts
- 소스맵 파일들

**체크리스트:**
- [ ] 모든 필수 파일 존재
- [ ] 파일 크기 정상 (index.js ~6KB)

### 2.6 dry-run 테스트

```bash
# React 패키지로 이동
cd packages/react

# 배포 시뮬레이션
npm publish --dry-run
```

**예상 출력:**
```
npm notice 
npm notice 📦  @exem/react@0.1.1
npm notice === Tarball Contents === 
npm notice 1.2kB  dist/index.css
npm notice 5.8kB  dist/index.js
npm notice ...
npm notice === Tarball Details === 
npm notice name:          @exem/react
npm notice version:       0.1.1
npm notice filename:      @exem/react-0.1.1.tgz
npm notice package size:  XX.X kB
npm notice unpacked size: XX.X kB
npm notice total files:   X
```

**체크리스트:**
- [ ] dry-run 성공
- [ ] 패키지명 확인: @exem/react
- [ ] 버전 확인: 0.1.1
- [ ] 파일 목록 확인 (dist만 포함)

---

## ✅ Phase 3: 선행 패키지 배포 (30분)

React 패키지는 다른 패키지에 의존하므로 순서대로 배포 필요

### 3.1 npm 로그인

```bash
# npm 로그인 (한 번만 수행)
npm login

# 로그인 확인
npm whoami
```

**체크리스트:**
- [ ] npm 로그인 완료
- [ ] 계정 확인

### 3.2 exem-stylesheet 배포

```bash
cd packages/stylesheet

# 1. package.json 업데이트 (스코프 추가)
# "name": "@exem/stylesheet"
# "publishConfig": { "access": "public" }

# 2. 배포
npm publish --access public
```

**체크리스트:**
- [ ] @exem/stylesheet 배포 성공
- [ ] npm view @exem/stylesheet 확인

### 3.3 exem-design-token 배포

```bash
cd packages/design-token

# 1. package.json 업데이트
# "name": "@exem/design-token"
# "publishConfig": { "access": "public" }

# 2. 배포
npm publish --access public
```

**체크리스트:**
- [ ] @exem/design-token 배포 성공
- [ ] npm view @exem/design-token 확인

---

## ✅ Phase 4: React 패키지 배포 (30분)

### 4.1 Changeset 생성

```bash
# 루트로 돌아가기
cd /Users/han-won-yeong/Documents/project/exem-design

# Changeset 생성
pnpm changeset
```

**대화형 입력:**
1. **Which packages would you like to include?**
   - `@exem/react` 선택 (스페이스바)

2. **What kind of change is this for @exem/react?**
   - `minor` 선택

3. **Please enter a summary for this change:**
   ```
   feat: Initial release with Button component
   
   - Add Button component with 6 variants
   - Support 5 different sizes (xs, sm, md, lg, xl)
   - Full TypeScript support with complete type definitions
   - Design token integration (@exem/design-token)
   - Radix UI Slot pattern support (asChild prop)
   - Accessibility features (keyboard navigation, focus-visible)
   - Hover and disabled states
   - Storybook documentation
   ```

**체크리스트:**
- [ ] Changeset 생성 완료
- [ ] .changeset/{random-name}.md 파일 확인

### 4.2 버전 업데이트

```bash
# 버전 업데이트 및 CHANGELOG 생성
pnpm version
```

**예상 변경:**
- packages/react/package.json: 0.1.1 → 0.2.0
- packages/react/CHANGELOG.md 생성 또는 업데이트

**체크리스트:**
- [ ] 버전 업데이트 완료
- [ ] CHANGELOG.md 확인
- [ ] Git commit 생성 확인

### 4.3 최종 빌드

```bash
# 전체 재빌드
pnpm build
```

**체크리스트:**
- [ ] 빌드 성공

### 4.4 npm 배포

```bash
cd packages/react

# 최종 배포
npm publish --access public
```

**예상 출력:**
```
npm notice 
npm notice 📦  @exem/react@0.2.0
npm notice === Tarball Contents === 
...
+ @exem/react@0.2.0
```

**체크리스트:**
- [ ] 배포 성공
- [ ] 버전 확인: 0.2.0

### 4.5 배포 검증

```bash
# 1. npm에서 패키지 정보 확인
npm view @exem/react

# 2. 버전 목록 확인
npm view @exem/react versions

# 3. 최신 버전 확인
npm view @exem/react version
```

**체크리스트:**
- [ ] npm view 성공
- [ ] 버전 확인: 0.2.0
- [ ] description, author, repository 정보 확인

---

## ✅ Phase 5: 설치 테스트 (30분)

### 5.1 테스트 프로젝트 생성

```bash
# 임시 디렉토리에서 테스트
cd /tmp
mkdir test-exem-react
cd test-exem-react

# React 프로젝트 초기화
npm create vite@latest . -- --template react-ts
```

**체크리스트:**
- [ ] Vite 프로젝트 생성 완료

### 5.2 패키지 설치

```bash
# @exem/react 설치
npm install @exem/react @exem/design-token

# React 19 설치 (peerDependency)
npm install react@19 react-dom@19
```

**체크리스트:**
- [ ] 설치 성공
- [ ] node_modules/@exem/react 존재
- [ ] node_modules/@exem/design-token 존재

### 5.3 사용 테스트

```tsx
// src/App.tsx 수정
import '@exem/design-token/css'
import { Button } from '@exem/react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>EXEM Design System Test</h1>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button>Default Button</Button>
        <Button variant="accent">Accent Button</Button>
        <Button variant="critical">Critical Button</Button>
        <Button size="sm">Small Button</Button>
        <Button size="lg">Large Button</Button>
        <Button disabled>Disabled Button</Button>
      </div>
    </div>
  )
}

export default App
```

**체크리스트:**
- [ ] App.tsx 수정 완료
- [ ] import 오류 없음

### 5.4 개발 서버 실행

```bash
npm run dev
```

**브라우저에서 확인:**
- http://localhost:5173

**확인 사항:**
- [ ] 버튼들이 정상적으로 렌더링됨
- [ ] 스타일이 올바르게 적용됨
- [ ] hover 효과 작동
- [ ] disabled 상태 작동
- [ ] 클릭 이벤트 작동

### 5.5 프로덕션 빌드 테스트

```bash
npm run build
npm run preview
```

**체크리스트:**
- [ ] 빌드 성공
- [ ] 번들 사이즈 확인
- [ ] 프리뷰에서 정상 작동

---

## ✅ Phase 6: 문서화 및 공지 (선택사항)

### 6.1 README 배지 추가

packages/react/README.md 상단에 배지 추가:

```markdown
# @exem/react

[![npm version](https://badge.fury.io/js/@exem%2Freact.svg)](https://www.npmjs.com/package/@exem/react)
[![npm downloads](https://img.shields.io/npm/dm/@exem/react.svg)](https://www.npmjs.com/package/@exem/react)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@exem/react)](https://bundlephobia.com/package/@exem/react)

> EXEM Design System의 React 컴포넌트 라이브러리
```

**체크리스트:**
- [ ] 배지 추가 완료

### 6.2 GitHub Release 생성

1. GitHub 저장소로 이동
2. Releases → Draft a new release
3. Tag: `@exem/react@0.2.0`
4. Title: `@exem/react v0.2.0 - Initial Release`
5. Description:
   ```markdown
   ## 🎉 첫 배포!
   
   EXEM Design System의 React 컴포넌트 라이브러리 첫 배포입니다.
   
   ### ✨ 새로운 기능
   
   - Button 컴포넌트 (6개 variant, 5개 size)
   - 완전한 TypeScript 지원
   - 디자인 토큰 통합
   - Radix UI Slot 패턴
   - 접근성 기능
   
   ### 📦 설치
   
   \`\`\`bash
   npm install @exem/react @exem/design-token
   \`\`\`
   
   ### 📚 문서
   
   - [README](./packages/react/README.md)
   - [배포 계획](./REACT_PACKAGE_DEPLOYMENT_PLAN.md)
   ```

**체크리스트:**
- [ ] GitHub Release 생성 완료

### 6.3 내부 공지

**Slack/Discord/이메일 등에 공지:**

```
🎉 @exem/react v0.2.0 배포 완료!

EXEM Design System의 React 컴포넌트 라이브러리가 npm에 배포되었습니다.

📦 설치:
npm install @exem/react @exem/design-token

✨ 현재 기능:
- Button 컴포넌트 (6 variants, 5 sizes)
- TypeScript 완벽 지원
- 디자인 토큰 통합

📚 문서: [링크]
🐛 이슈 리포트: [링크]

다음 업데이트: Input, Textarea, Checkbox 컴포넌트 (10월 중)
```

**체크리스트:**
- [ ] 내부 공지 완료

---

## 📊 최종 체크리스트

### 배포 전

- [ ] package.json 메타데이터 완료
- [ ] exem-icon 의존성 제거
- [ ] LICENSE 파일 생성
- [ ] README.md 업데이트
- [ ] 빌드 성공
- [ ] 타입 체크 통과
- [ ] 린트 검사 통과
- [ ] dry-run 성공

### 배포

- [ ] npm 로그인
- [ ] @exem/stylesheet 배포
- [ ] @exem/design-token 배포
- [ ] Changeset 생성
- [ ] 버전 업데이트 (0.2.0)
- [ ] @exem/react 배포
- [ ] npm view 확인

### 검증

- [ ] 테스트 프로젝트 생성
- [ ] 패키지 설치 성공
- [ ] 개발 서버 정상 작동
- [ ] 프로덕션 빌드 성공
- [ ] 버튼 렌더링 확인
- [ ] 스타일 적용 확인

### 문서화 (선택)

- [ ] README 배지 추가
- [ ] GitHub Release 생성
- [ ] 내부 공지

---

## 🚨 문제 발생 시

### 배포 실패

```bash
# 1. 로그 확인
npm publish --access public --dry-run

# 2. 패키지명 중복 확인
npm view @exem/react

# 3. 권한 확인
npm access ls-packages
```

### 의존성 오류

```bash
# 1. node_modules 삭제 후 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 2. 빌드 재실행
pnpm build
```

### 타입 오류

```bash
# 1. tsconfig 확인
cat packages/react/tsconfig.json

# 2. 타입 체크
pnpm typecheck

# 3. dist 폴더 확인
ls -la packages/react/dist/
```

---

## 📞 도움말

- **npm 배포 문제**: [NPM 공식 문서](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- **Changeset 사용**: [Changesets 가이드](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- **배포 계획 전체**: [REACT_PACKAGE_DEPLOYMENT_PLAN.md](./REACT_PACKAGE_DEPLOYMENT_PLAN.md)

---

**준비 완료!** 위 체크리스트를 순서대로 따라하면 @exem/react 패키지 배포가 완료됩니다. 🚀
