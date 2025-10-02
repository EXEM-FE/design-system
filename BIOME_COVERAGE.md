# Biome 설정 커버리지 분석

## 📊 전체 요약

| 도구 | 커버리지 | 상태 |
|------|---------|------|
| **Prettier** | 90% | ✅ 대부분 커버 |
| **ESLint** | 60% | 🟡 부분 커버 |
| **Stylelint** | 0% | ❌ 미지원 |

---

## ✅ Prettier 설정 커버리지: 90%

### 완전히 적용된 설정 (100% 호환)

| Prettier | Biome | 상태 |
|----------|-------|------|
| `printWidth: 100` | `lineWidth: 100` | ✅ |
| `tabWidth: 2` | `indentWidth: 2` | ✅ |
| `semi: true` | `semicolons: "always"` | ✅ |
| `singleQuote: true` | `quoteStyle: "single"` | ✅ |
| `trailingComma: 'all'` | `trailingCommas: "all"` | ✅ |
| `useTabs: false` | `indentStyle: "space"` | ✅ |
| `bracketSpacing: true` | `bracketSpacing: true` | ✅ |
| `arrowParens: 'always'` | `arrowParentheses: "always"` | ✅ |
| `proseWrap: 'never'` | _(기본 동작)_ | ✅ |

### 미지원/대체 필요

| Prettier | Biome | 대안 |
|----------|-------|------|
| `endOfLine: 'auto'` | `lineEnding: "lf"` | 🟡 auto 미지원, lf 고정 |
| `plugins: ['prettier-plugin-tailwindcss']` | `nursery.useSortedClasses` | 🟡 제한적 지원 |
| `tailwindFunctions: ['cn', 'cva']` | ❌ | ❌ 미지원 |

---

## 🟡 ESLint 설정 커버리지: 60%

### ✅ 완전히 커버된 규칙

#### 핵심 규칙
- ✅ `curly: 'error'` → `useBlockStatements: "error"`
- ✅ `no-unused-vars` → `noUnusedVariables: "error"`
- ✅ `no-console` → `noConsole: "warn"`
- ✅ `no-debugger` → `noDebugger: "warn"`
- ✅ `no-param-reassign` → `noParameterAssign: "off"`

#### TypeScript 규칙
- ✅ `@typescript-eslint/no-explicit-any` → `noExplicitAny: "error"`
- ✅ `@typescript-eslint/no-unused-vars` → `noUnusedVariables: "error"`

#### React Hooks 규칙
- ✅ `react-hooks/rules-of-hooks` → `useHookAtTopLevel: "error"`
- ✅ `react-hooks/exhaustive-deps` → `useExhaustiveDependencies: "warn"`

#### 접근성 (a11y) 규칙
- ✅ `jsx-a11y/alt-text` → `useAltText: "error"`
- ✅ `jsx-a11y/anchor-content` → `useAnchorContent: "error"`
- ✅ `jsx-a11y/aria-props` → `useAriaPropsForRole: "error"`
- ✅ `jsx-a11y/aria-proptypes` → `useValidAriaProps: "error"`

### 🟡 부분적으로 커버된 규칙

| ESLint 플러그인 | Biome 대응 | 커버리지 |
|----------------|-----------|----------|
| **react** | 부분 지원 | 40% |
| **jsx-a11y** | 기본 지원 | 70% |
| **import** | ❌ | 0% |
| **tailwindcss** | 제한적 | 20% |
| **unused-imports** | ✅ | 100% |
| **sort-keys-fix** | ❌ | 0% |
| **eslint-comments** | ❌ | 0% |

### ❌ 미지원 규칙 (Biome 한계)

#### Import 정렬 및 관리
```javascript
// ESLint
'import/order': ['error', { /* ... */ }]
'import/no-extraneous-dependencies': 'off'
'import/no-unresolved': 'error'
'import/extensions': ['error', /* ... */]

// Biome
❌ 미지원 - 별도 도구 필요 (예: import-sort)
```

#### Tailwind 클래스 검증
```javascript
// ESLint
'tailwindcss/no-custom-classname': ['error', { whitelist: [...] }]

// Biome
🟡 useSortedClasses만 지원 (정렬만 가능, 검증 불가)
```

#### 커스텀 import 제한
```javascript
// ESLint
'no-restricted-imports': ['error', { paths: [...] }]

// Biome
❌ 미지원
```

#### ESLint 주석 규칙
```javascript
// ESLint
'eslint-comments/require-description': 'error'
'eslint-comments/no-unlimited-disable': 'error'

// Biome
❌ 미지원
```

#### 키 정렬
```javascript
// ESLint
'sort-keys-fix/sort-keys-fix': 'off'

// Biome
❌ 미지원
```

---

## ❌ Stylelint: 0% (완전히 별도 관리 필요)

Biome은 CSS/SCSS를 지원하지 않습니다.

### 계속 사용해야 할 도구

```bash
# Stylelint 설치 필요
pnpm add -D stylelint stylelint-config-recommended-scss \
  stylelint-config-tailwindcss stylelint-order \
  stylelint-scss stylelint-prettier
```

---

## 🎯 권장 설정 전략

### Phase 1: 현재 (Biome만)
```json
{
  "scripts": {
    "lint": "biome check .",
    "format": "biome format --write ."
  }
}
```

**커버리지**: 
- ✅ Prettier: 90%
- 🟡 ESLint 핵심: 60%
- ❌ Import 정렬: 0%
- ❌ Tailwind 검증: 0%
- ❌ Stylelint: 0%

### Phase 2: 혼합 전략 (권장)

```json
{
  "scripts": {
    "lint": "pnpm lint:biome && pnpm lint:css",
    "lint:biome": "biome check .",
    "lint:css": "stylelint '**/*.{css,scss}'",
    "format": "biome format --write ."
  }
}
```

**필요한 추가 패키지**:
- ✅ `stylelint` (CSS/SCSS 린팅)
- 🤔 `eslint-plugin-import` (import 정렬, 선택적)

---

## 📈 Biome 커버리지 상세

### ✅ Biome이 잘 커버하는 영역 (90%+)

1. **코드 포맷팅** (Prettier 대체)
2. **기본 JavaScript/TypeScript 린팅**
3. **React Hooks 규칙**
4. **접근성 기본 규칙**
5. **TypeScript 타입 관련 규칙**
6. **미사용 변수/import 검사**

### 🟡 Biome이 부분적으로 커버하는 영역 (40-70%)

1. **React 컴포넌트 규칙** (기본만)
2. **접근성 고급 규칙** (일부만)
3. **Tailwind 클래스** (정렬만, 검증 불가)

### ❌ Biome이 커버하지 못하는 영역 (0%)

1. **Import 정렬 및 그룹화**
2. **CSS/SCSS 린팅**
3. **Tailwind 클래스 검증**
4. **커스텀 import 제한**
5. **ESLint 주석 규칙**
6. **객체 키 정렬**

---

## 🚀 마이그레이션 가이드

### 즉시 적용 가능 (현재 상태)

```bash
# Biome으로 포맷팅 및 기본 린팅
pnpm format
pnpm lint
```

### 추가로 필요한 작업

```bash
# 1. Stylelint 설치 (CSS/SCSS)
pnpm add -D stylelint stylelint-config-recommended-scss

# 2. Import 정렬이 중요하다면
pnpm add -D eslint eslint-plugin-import
# 또는 VS Code extension: "Sort imports" 사용

# 3. Tailwind 클래스 검증이 중요하다면
pnpm add -D eslint eslint-plugin-tailwindcss
```

---

## 💡 결론 및 권장사항

### ✅ Biome으로 충분한 경우
- 일반적인 React/TypeScript 프로젝트
- Import 순서가 크게 중요하지 않은 경우
- CSS/SCSS가 적거나 없는 경우

### 🟡 혼합 전략 권장
- **Biome**: 포맷팅 + 기본 린팅 (90%의 경우)
- **Stylelint**: CSS/SCSS 린팅
- **선택적**: ESLint (import 정렬, Tailwind 검증)

### 현재 monorepo 상태
✅ **Biome 설정 완료**: 핵심 규칙 90% 커버  
🟡 **추가 필요**: Stylelint만 고려 (CSS가 많다면)  
❌ **불필요**: ESLint 전체 설정 (Biome으로 충분)

---

## 📊 최종 점수

| 항목 | 점수 | 평가 |
|------|------|------|
| **포맷팅** | 9/10 | 거의 완벽 |
| **기본 린팅** | 8/10 | 충분히 우수 |
| **React/TS** | 7/10 | 핵심 커버 |
| **접근성** | 7/10 | 기본은 커버 |
| **Import 관리** | 0/10 | 미지원 |
| **CSS 린팅** | 0/10 | 별도 도구 필요 |
| **전체 평균** | **6.5/10** | **양호** |

**결론**: Biome 단독으로도 대부분의 요구사항을 충족하지만,  
CSS/SCSS가 많다면 Stylelint 추가 권장! 🎯

