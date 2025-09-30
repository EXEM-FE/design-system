# EXEM Design System - 프로젝트 개요

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [기술 스택](#기술-스택)
- [아키텍처](#아키텍처)
- [패키지 구조](#패키지-구조)
- [핵심 기능](#핵심-기능)
- [개발 워크플로우](#개발-워크플로우)
- [프로젝트 구조](#프로젝트-구조)
- [버전 관리 전략](#버전-관리-전략)
- [코드 품질 관리](#코드-품질-관리)

---

## 프로젝트 소개

EXEM Design System은 EXEM 제품군을 위한 통합 디자인 시스템으로, **모노레포** 구조로 관리되는 디자인 토큰, 스타일시트, React 컴포넌트 등을 제공합니다.

### 주요 특징

- 🎨 **CSS 변수 기반 디자인 토큰**: CSS 변수에서 TypeScript 토큰 자동 생성
- 📦 **모노레포 구조**: pnpm workspace로 패키지 간 의존성 효율적 관리
- ⚡ **빠른 빌드**: tsup 기반 고속 번들링
- 🔍 **타입 안전성**: TypeScript로 작성된 모든 패키지
- 🎯 **일관된 코드 품질**: Biome을 통한 린팅 및 포맷팅

### 현재 상태

> 🚧 **실험적 개발 단계**: 모노레포 구조 및 디자인 토큰 시스템 실험 중

---

## 기술 스택

### 핵심 기술

| 기술 | 용도 | 버전 |
|------|------|------|
| **pnpm** | 패키지 매니저 및 workspace 관리 | - |
| **TypeScript** | 타입 안전성 보장 | ^5.3.3 |
| **tsup** | 빠른 TypeScript 번들러 | ^8.0.1 |
| **Biome** | 린팅 및 포맷팅 (ESLint + Prettier 대체) | ^2.1.3 |

### 개발 도구

| 도구 | 용도 |
|------|------|
| **Changesets** | 버전 관리 및 CHANGELOG 생성 |
| **Vitest** | 테스트 프레임워크 |
| **Husky** | Git hooks (pre-commit 자동화) |
| **lint-staged** | staged 파일 자동 포맷팅 |
| **Concurrently** | 다중 프로세스 병렬 실행 |

---

## 아키텍처

### 패키지 의존성 체인

```
exem-stylesheet (CSS 변수)
    ↓
exem-design-token (TypeScript 토큰)
    ↓
exem-tailwindcss-plugin + exem-react + exem-icon
    ↓
사용자 애플리케이션
```

### 핵심 아키텍처 원칙

1. **단일 진실 공급원(Single Source of Truth)**: 모든 디자인 토큰은 `exem-stylesheet`의 CSS 변수에서 시작
2. **자동 동기화**: CSS 변수 변경 시 TypeScript 토큰 자동 생성
3. **워크스페이스 참조**: 개발 시 `workspace:*`로 최신 로컬 버전 자동 참조
4. **타입 안전성**: TypeScript 토큰으로 컴파일 타임 타입 체크

---

## 패키지 구조

### 1. exem-stylesheet

**CSS 변수 및 전역 스타일 제공**

- **버전**: 0.2.0
- **역할**: 디자인 시스템의 기초가 되는 CSS 변수 정의
- **주요 파일**: `src/global.css`
- **빌드 산출물**: `dist/index.css`

```typescript
// 사용 예시
import 'exem-stylesheet/css';
```

### 2. exem-design-token

**TypeScript 디자인 토큰 자동 생성**

- **버전**: 0.2.1
- **역할**: CSS 변수를 TypeScript 토큰으로 변환
- **의존성**: `exem-stylesheet`
- **자동 생성 스크립트**: `src/generateToken.ts`

#### 생성되는 토큰 카테고리

| 토큰 | 파일명 | 설명 |
|------|--------|------|
| 색상 | `colorTokens.ts` | 텍스트, 배경, 테두리 색상 |
| 간격 | `spacingTokens.ts` | 패딩, 마진, 크기 |
| 반경 | `radiusTokens.ts` | 테두리 반경 |
| 그림자 | `shadowTokens.ts` | 박스 그림자 |
| 브레이크포인트 | `breakpointTokens.ts` | 반응형 중단점 |

```typescript
// 사용 예시
import { tokens } from 'exem-design-token';

const styles = {
  backgroundColor: tokens.color['surface-accent-default'],
  borderRadius: tokens.radius.medium,
  padding: tokens.spacing[4]
};
```

### 3. exem-tailwindcss-plugin

**Tailwind CSS 3 플러그인**

- **버전**: 0.1.2
- **역할**: 디자인 토큰을 Tailwind CSS 유틸리티로 통합
- **의존성**: `exem-design-token`, `exem-stylesheet`
- **Peer 의존성**: `tailwindcss ^3.0.0`

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require('exem-tailwindcss-plugin')]
};
```

### 4. exem-react

**React UI 컴포넌트 라이브러리**

- **버전**: 0.1.1
- **상태**: 🚧 초기 개발 단계
- **의존성**: `exem-design-token`, `exem-icon`
- **Peer 의존성**: `react >=19.0.0`, `react-dom >=19.0.0`

#### 주요 의존성

- `@radix-ui/react-slot`: 컴포넌트 합성
- `class-variance-authority`: 스타일 변형 관리
- `clsx`: 클래스명 조합

```typescript
// 사용 예시 (예정)
import { Button } from 'exem-react';

<Button variant="primary">클릭</Button>
```

### 5. exem-icon

**SVG 아이콘 시스템**

- **버전**: 0.0.1
- **상태**: 🚧 미구현

---

## 핵심 기능

### 1. 자동 토큰 생성 시스템

**CSS 변수 → TypeScript 토큰 자동 변환**

#### 동작 원리

1. `packages/stylesheet/src/global.css`에 CSS 변수 정의
   ```css
   :root {
     --color-primary: #3b82f6;
     --radius-medium: 0.5rem;
   }
   ```

2. `generateToken.ts` 스크립트가 CSS 파일 파싱
   - 정규식으로 `--{prefix}-{name}` 패턴 추출
   - 접두사별 그룹화 (color, radius, shadow 등)

3. TypeScript 토큰 파일 생성
   ```typescript
   // colorTokens.ts
   const colorTokens = {
     "primary": "var(--color-primary)"
   } as const;
   ```

4. Biome으로 자동 포맷팅

#### 자동 감시 모드

```bash
pnpm dev  # CSS 변수 변경 시 자동 토큰 재생성
```

`scripts/watch-tokens.js`가 `global.css` 변경 감지 → 자동 재생성

### 2. 워크스페이스 의존성 관리

**개발 시 편의성과 배포 시 안정성 양립**

#### 개발 모드
```json
{
  "dependencies": {
    "exem-design-token": "workspace:*"
  }
}
```
- 항상 최신 로컬 버전 참조
- 패키지 간 변경사항 즉시 반영

#### 배포 모드
```json
{
  "dependencies": {
    "exem-design-token": "^0.2.1"
  }
}
```
- 구체적 버전으로 자동 변환
- npm 배포 후 다시 `workspace:*`로 복원

### 3. Pre-commit 자동화 (Husky)

**코드 커밋 전 자동 품질 검사**

```bash
# .husky/pre-commit
pnpm format      # Biome 포맷팅
pnpm lint:fix    # 자동 수정 가능한 린트 오류 수정
pnpm typecheck   # 타입 체크
```

---

## 개발 워크플로우

### 초기 설정

```bash
# 1. 저장소 클론
git clone <repository-url>
cd exem-design

# 2. 의존성 설치
pnpm install

# 3. 개발 모드 시작 (모든 패키지 빌드 + 토큰 감시)
pnpm dev
```

### 일반적인 개발 흐름

#### 1. 디자인 토큰 수정

```bash
# CSS 변수 수정
vim packages/stylesheet/src/global.css

# pnpm dev 실행 중이면 자동으로 TypeScript 토큰 재생성
# 수동 재생성이 필요한 경우:
cd packages/design-token && pnpm generate
```

#### 2. React 컴포넌트 개발

```bash
# React 패키지로 이동
cd packages/react

# Storybook 실행 (개발 서버)
pnpm storybook
```

#### 3. 코드 품질 검사

```bash
# 전체 패키지 타입 체크
pnpm typecheck

# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format
```

### 버전 업데이트 및 배포

```bash
# 1. 변경사항 기록
pnpm changeset
# → 변경된 패키지 선택
# → 버전 유형 선택 (major/minor/patch)
# → 변경사항 설명 작성

# 2. 버전 업데이트 및 CHANGELOG 생성
pnpm version

# 3. npm 배포
pnpm release
```

---

## 프로젝트 구조

```
exem-design/
├── packages/                      # 모든 패키지
│   ├── design-token/             # TypeScript 디자인 토큰
│   │   ├── src/
│   │   │   ├── generateToken.ts  # 토큰 생성 스크립트
│   │   │   ├── index.ts
│   │   │   └── tokens/           # 자동 생성된 토큰 파일들
│   │   │       ├── colorTokens.ts
│   │   │       ├── radiusTokens.ts
│   │   │       ├── shadowTokens.ts
│   │   │       └── breakpointTokens.ts
│   │   ├── dist/                 # 빌드 산출물
│   │   └── package.json
│   │
│   ├── stylesheet/               # CSS 변수 및 전역 스타일
│   │   ├── src/
│   │   │   ├── global.css        # 📍 디자인 토큰의 원천
│   │   │   └── index.ts
│   │   ├── dist/
│   │   └── package.json
│   │
│   ├── tailwindcss3-plugin/      # Tailwind CSS 플러그인
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── __generated__/
│   │   ├── dist/
│   │   └── package.json
│   │
│   ├── react/                    # React 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── dist/
│   │   └── package.json
│   │
│   ├── icon/                     # 아이콘 시스템 (미구현)
│   │   └── package.json
│   │
│   └── docs/                     # 문서 사이트 (Astro)
│       ├── src/
│       ├── public/
│       └── astro.config.mjs
│
├── scripts/                      # 유틸리티 스크립트
│   ├── watch-tokens.js          # CSS 변수 감시 및 자동 토큰 생성
│   └── update-dependencies.js   # workspace:* ↔ 구체적 버전 전환
│
├── .changeset/                   # Changesets 설정 및 변경 기록
├── biome.json                    # Biome 설정 (린팅/포맷팅)
├── pnpm-workspace.yaml          # pnpm workspace 설정
├── package.json                  # 루트 패키지 설정
├── tsconfig.json                 # 공통 TypeScript 설정
├── README.md                     # 프로젝트 소개
├── CLAUDE.md                     # AI 어시스턴트용 가이드
└── PROJECT_OVERVIEW.md          # 본 문서
```

---

## 버전 관리 전략

### Changesets 워크플로우

**Semantic Versioning 기반 자동 버전 관리**

#### 1. Changeset 생성

```bash
pnpm changeset
```

**인터랙티브 프롬프트:**
1. 변경된 패키지 선택 (스페이스로 선택)
2. 버전 유형 선택
   - `major`: 호환되지 않는 API 변경
   - `minor`: 하위 호환되는 기능 추가
   - `patch`: 하위 호환되는 버그 수정
3. 변경사항 설명 (마크다운 형식)

생성된 파일: `.changeset/{random-name}.md`

#### 2. 버전 업데이트

```bash
pnpm version
```

**자동 수행 작업:**
- Changeset 파일 읽고 버전 번호 업데이트
- `CHANGELOG.md` 자동 생성/업데이트
- `workspace:*` → `workspace:*` 유지 (개발 편의성)

#### 3. 배포

```bash
pnpm release
```

**배포 프로세스:**
1. `workspace:*` → 구체적 버전 전환 (예: `^0.2.1`)
2. 모든 패키지 빌드
3. npm 배포
4. 구체적 버전 → `workspace:*`로 복원

### 패키지 간 연결 설정

```json
// .changeset/config.json
{
  "linked": [
    ["exem-stylesheet", "exem-design-token"]
  ],
  "updateInternalDependencies": "patch"
}
```

- **linked**: 연결된 패키지들은 항상 동일한 버전으로 업데이트
- **updateInternalDependencies**: 내부 의존성 변경 시 자동 patch 버전 증가

---

## 코드 품질 관리

### Biome 설정

**ESLint + Prettier를 대체하는 올인원 도구**

#### 주요 설정 (`biome.json`)

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "asNeeded"
    }
  }
}
```

#### 특징

- ⚡ **빠른 속도**: Rust로 작성되어 ESLint보다 10-100배 빠름
- 🎯 **일관성**: 린팅과 포맷팅을 하나의 도구로 통합
- 🔧 **자동 수정**: `--write` 옵션으로 자동 수정 가능

### TypeScript 설정

**공통 tsconfig.json 공유**

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  }
}
```

각 패키지는 루트 `tsconfig.json`을 확장하여 사용

### Pre-commit Hooks (Husky)

**커밋 전 자동 검사로 코드 품질 보장**

```bash
# .husky/pre-commit
pnpm format      # 1. 코드 포맷팅
git add .        # 2. 포맷팅된 파일 재스테이징
pnpm lint:fix    # 3. 자동 수정 가능한 린트 오류 수정
pnpm typecheck   # 4. TypeScript 타입 체크
```

---

## 유용한 명령어 정리

### 개발

```bash
pnpm dev              # 전체 패키지 빌드 감시 + 토큰 자동 생성
pnpm dev:packages     # 패키지 빌드만 감시 (토큰 생성 제외)
pnpm watch:tokens     # 토큰만 감시 및 자동 생성
pnpm build            # 전체 패키지 빌드
pnpm clean            # dist 및 node_modules 정리
```

### 코드 품질

```bash
pnpm lint             # Biome 린트 검사
pnpm lint:fix         # 린트 오류 자동 수정
pnpm format           # 코드 포맷팅
pnpm typecheck        # TypeScript 타입 체크
pnpm test             # Vitest 테스트 실행
```

### 버전 관리

```bash
pnpm changeset        # Changeset 생성
pnpm version          # 버전 업데이트 및 CHANGELOG 생성
pnpm release          # 빌드 후 npm 배포
```

### 의존성 관리

```bash
pnpm deps:update      # workspace:* → 구체적 버전으로 업데이트
pnpm deps:revert      # 구체적 버전 → workspace:*로 복원
```

---

## 트러블슈팅

### 토큰이 자동으로 생성되지 않을 때

```bash
# 수동으로 토큰 재생성
cd packages/design-token
pnpm generate

# 또는 watch 스크립트 재시작
pnpm watch:tokens
```

### 빌드 오류가 발생할 때

```bash
# 1. 빌드 캐시 정리
pnpm clean

# 2. 의존성 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. 전체 재빌드
pnpm build
```

### 타입 오류가 발생할 때

```bash
# 각 패키지별 타입 체크
pnpm -r typecheck

# 특정 패키지만 체크
cd packages/react
pnpm typecheck
```

---

## 기여 가이드

### 코드 스타일

- **커밋 메시지**: 한국어 Conventional Commits
  - `✨ feat: 새 기능 추가`
  - `🐛 fix: 버그 수정`
  - `🔧 chore: 도구 설정`
  - `📝 docs: 문서 수정`

- **코드 컨벤션**: Biome 자동 포맷팅 준수
- **타입 안전성**: 가능한 한 `any` 타입 지양

### Pull Request 체크리스트

- [ ] 모든 테스트 통과 (`pnpm test`)
- [ ] 타입 체크 통과 (`pnpm typecheck`)
- [ ] 린트 검사 통과 (`pnpm lint`)
- [ ] Changeset 생성 완료 (`pnpm changeset`)
- [ ] 문서 업데이트 (필요 시)

---

## 참고 자료

### 공식 문서

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Biome](https://biomejs.dev/)
- [Changesets](https://github.com/changesets/changesets)
- [tsup](https://tsup.egoist.dev/)

### 프로젝트 문서

- [README.md](./README.md): 프로젝트 소개 및 빠른 시작
- [CLAUDE.md](./CLAUDE.md): AI 어시스턴트용 개발 가이드
- [RELEASE.md](./RELEASE.md): 배포 가이드 (있는 경우)

---

**최종 업데이트**: 2025-09-30  
**프로젝트 버전**: 0.1.0  
**문서 버전**: 1.0.0
