# NPM 배포 현황 및 지속가능성 계획

## 📊 현재 배포 현황 (2025-09-30 기준)

### ❌ 미배포 상태

모든 패키지가 **npm registry에 배포되지 않은 상태**입니다.

| 패키지명 | 현재 버전 | NPM 상태 | 비고 |
|----------|----------|----------|------|
| `exem-stylesheet` | 0.2.0 | ❌ 미배포 | CSS 변수 및 전역 스타일 |
| `exem-design-token` | 0.2.1 | ❌ 미배포 | TypeScript 디자인 토큰 |
| `exem-tailwindcss-plugin` | 0.1.2 | ❌ 미배포 | Tailwind CSS 플러그인 |
| `exem-react` | 0.1.1 | ❌ 미배포 | React 컴포넌트 라이브러리 |
| `exem-icon` | 0.0.1 | ❌ 미배포 | 아이콘 시스템 (미구현) |

### 🔍 미배포 원인 분석

1. **패키지 스코프 미설정**: 현재 패키지명이 `exem-*` 형태로 스코프가 없음
2. **초기 배포 프로세스 미실행**: 첫 배포(`npm publish`)가 수행되지 않음
3. **개발 환경에서만 사용**: workspace 내부에서만 개발 및 테스트 중

---

## 🎯 배포 준비 체크리스트

### 필수 준비사항

#### 1. NPM 계정 및 조직 설정

```bash
# NPM 로그인
npm login

# 조직 생성 (선택사항, 권장)
# https://www.npmjs.com/org/create
# 조직명 예시: @exem, @exem-inc, @exem-design
```

#### 2. 패키지명 스코프 변경 (권장)

**현재:**
- `exem-stylesheet` → 전역 네임스페이스 (충돌 가능성 높음)

**권장:**
- `@exem/stylesheet` → 조직 스코프 (안전, 관리 용이)

```json
// package.json 수정 예시
{
  "name": "@exem/stylesheet",
  "publishConfig": {
    "access": "public"  // 스코프 패키지는 기본적으로 private이므로 public 설정 필요
  }
}
```

#### 3. 빌드 산출물 검증

```bash
# 전체 패키지 빌드
pnpm build

# 빌드 결과 확인
ls -la packages/*/dist
```

#### 4. package.json 필수 필드 확인

각 패키지의 `package.json`에 다음 필드 필수:

```json
{
  "name": "@exem/package-name",
  "version": "0.1.0",
  "description": "명확한 설명",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "repository": {
    "type": "git",
    "url": "https://github.com/exem/design-system"
  },
  "keywords": ["exem", "design-system", ...],
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  }
}
```

---

## 🚀 초기 배포 실행 계획

### Phase 1: 기초 패키지 배포 (우선순위 높음)

#### 1.1. exem-stylesheet 배포

```bash
# 1. 패키지 디렉토리 이동
cd packages/stylesheet

# 2. 빌드 확인
pnpm build

# 3. 배포 전 dry-run으로 시뮬레이션
npm publish --dry-run

# 4. 실제 배포
npm publish

# 5. 배포 확인
npm view @exem/stylesheet
```

**예상 시간:** 10분  
**의존성:** 없음  
**영향도:** design-token 배포의 선행 조건

#### 1.2. exem-design-token 배포

```bash
cd packages/design-token
pnpm build
npm publish --dry-run
npm publish
```

**예상 시간:** 5분  
**의존성:** exem-stylesheet 배포 완료  
**영향도:** 다른 모든 패키지의 기반

### Phase 2: 통합 패키지 배포 (우선순위 중간)

#### 2.1. exem-tailwindcss-plugin 배포

```bash
cd packages/tailwindcss3-plugin
pnpm build
npm publish
```

**예상 시간:** 5분  
**의존성:** exem-design-token 배포 완료  
**영향도:** Tailwind 사용자 대상

#### 2.2. exem-react 배포

```bash
cd packages/react
pnpm build
npm publish
```

**예상 시간:** 5분  
**의존성:** exem-design-token, exem-icon 배포 완료  
**영향도:** React 사용자 대상

### Phase 3: 추가 패키지 배포 (우선순위 낮음)

#### 3.1. exem-icon 배포

```bash
# 구현 완료 후
cd packages/icon
pnpm build
npm publish
```

**예상 시간:** TBD  
**의존성:** 아이콘 시스템 구현 완료 필요  
**영향도:** exem-react의 아이콘 기능 활성화

---

## 🔄 지속가능한 배포 전략

### 1. 자동화된 배포 파이프라인

#### GitHub Actions 워크플로우 구성

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install

      - name: Run tests
        run: pnpm test

      - name: Run type check
        run: pnpm typecheck

      - name: Run lint
        run: pnpm lint

      - name: Build packages
        run: pnpm build

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          version: pnpm version
          publish: pnpm release
          commit: 'chore: version packages'
          title: 'chore: version packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**장점:**
- ✅ main 브랜치 푸시 시 자동 배포
- ✅ changeset 기반 버전 관리
- ✅ 테스트/린트/빌드 자동 검증
- ✅ 수동 개입 최소화

### 2. Semantic Versioning 엄격 준수

#### 버전 업데이트 규칙

| 변경 유형 | 버전 증가 | 예시 |
|----------|----------|------|
| **Breaking Changes** | Major (1.x.x → 2.0.0) | API 변경, 토큰 구조 변경 |
| **New Features** | Minor (x.1.x → x.2.0) | 새 컴포넌트 추가, 새 토큰 추가 |
| **Bug Fixes** | Patch (x.x.1 → x.x.2) | 버그 수정, 문서 개선 |

#### 실제 적용 예시

```bash
# 새로운 Button 컴포넌트 추가
pnpm changeset
# ✅ 선택: @exem/react
# ✅ 유형: minor
# ✅ 설명: "feat: Add Button component with primary/secondary variants"

# CSS 변수 값 수정
pnpm changeset
# ✅ 선택: @exem/stylesheet, @exem/design-token (linked)
# ✅ 유형: patch
# ✅ 설명: "fix: Update primary color contrast ratio for accessibility"

# 토큰 인터페이스 변경 (Breaking)
pnpm changeset
# ⚠️ 선택: @exem/design-token
# ⚠️ 유형: major
# ⚠️ 설명: "BREAKING CHANGE: Rename token structure from flat to nested"
```

### 3. 패키지 간 의존성 자동 업데이트

#### Changeset 설정 활용

```json
// .changeset/config.json
{
  "linked": [
    ["@exem/stylesheet", "@exem/design-token"]
  ],
  "updateInternalDependencies": "patch"
}
```

**동작 방식:**
1. `@exem/stylesheet` 0.2.0 → 0.2.1 업데이트
2. `@exem/design-token`도 자동으로 0.2.1 → 0.2.2 업데이트
3. `@exem/react`의 `@exem/design-token` 의존성도 자동 업데이트

### 4. 배포 전 검증 프로세스

#### Pre-publish 스크립트 추가

```json
// packages/design-token/package.json
{
  "scripts": {
    "prepublishOnly": "pnpm build && pnpm typecheck && pnpm test"
  }
}
```

#### 체크리스트 자동화

```bash
#!/bin/bash
# scripts/pre-release-check.sh

echo "🔍 Pre-release validation..."

# 1. 빌드 확인
echo "📦 Building packages..."
pnpm build || exit 1

# 2. 테스트 실행
echo "🧪 Running tests..."
pnpm test || exit 1

# 3. 타입 체크
echo "🔎 Type checking..."
pnpm typecheck || exit 1

# 4. 린트 검사
echo "🎨 Linting..."
pnpm lint || exit 1

# 5. 의존성 순환 참조 확인
echo "🔄 Checking circular dependencies..."
npx madge --circular --extensions ts,tsx packages/*/src

echo "✅ All checks passed!"
```

### 5. 버전 관리 전략

#### Git Tag 자동 생성

Changesets는 배포 시 자동으로 Git tag 생성:

```bash
# 예시 태그
@exem/design-token@0.2.1
@exem/stylesheet@0.2.0
@exem/react@0.1.2
```

#### Monorepo Tag 전략

```bash
# 개별 패키지 태그 (Changesets 자동 생성)
@exem/design-token@0.2.1

# 전체 릴리즈 태그 (수동 생성, 선택사항)
v0.1.0  # 전체 디자인 시스템 버전
```

### 6. 배포 후 검증

#### 자동화된 배포 검증

```bash
#!/bin/bash
# scripts/post-release-check.sh

PACKAGE_NAME=$1
VERSION=$2

echo "🔍 Verifying $PACKAGE_NAME@$VERSION on npm..."

# 1. npm에서 패키지 정보 조회
npm view $PACKAGE_NAME@$VERSION

# 2. 설치 테스트
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR
npm init -y
npm install $PACKAGE_NAME@$VERSION

# 3. import 테스트
node -e "require('$PACKAGE_NAME')"

echo "✅ Package verified successfully!"
```

---

## 📈 배포 로드맵

### Q4 2025 (10월 - 12월)

#### 10월: 초기 배포 및 인프라 구축

- [ ] **Week 1-2**: 패키지명 스코프 변경 (`@exem/*`)
- [ ] **Week 2**: exem-stylesheet 첫 배포 (v0.2.0)
- [ ] **Week 2**: exem-design-token 첫 배포 (v0.2.1)
- [ ] **Week 3**: GitHub Actions 배포 자동화 구축
- [ ] **Week 4**: exem-tailwindcss-plugin 배포 (v0.1.2)

#### 11월: React 컴포넌트 라이브러리 안정화

- [ ] **Week 1-2**: Button, Input 등 기본 컴포넌트 구현
- [ ] **Week 3**: Storybook 문서 작성
- [ ] **Week 4**: exem-react 첫 배포 (v0.2.0)

#### 12월: 아이콘 시스템 및 문서화

- [ ] **Week 1-2**: exem-icon 시스템 구현
- [ ] **Week 3**: exem-icon 첫 배포 (v0.1.0)
- [ ] **Week 4**: 전체 문서 사이트 배포 (docs 패키지)

### Q1 2026 (1월 - 3월): 안정화 및 채택

#### 1월: 베타 테스트

- [ ] 내부 프로젝트 3개 이상 적용
- [ ] 피드백 수집 및 버그 수정
- [ ] 마이너 버전 업데이트 (v0.3.x)

#### 2월: 프로덕션 준비

- [ ] 성능 최적화
- [ ] 접근성 검증 (WCAG 2.1 AA)
- [ ] v1.0.0-rc.1 배포 (Release Candidate)

#### 3월: 정식 출시

- [ ] **v1.0.0 정식 출시** 🎉
- [ ] 공식 블로그 포스트 발행
- [ ] 커뮤니티 공개 (GitHub Discussions)

---

## 🔐 보안 및 액세스 관리

### NPM 토큰 관리

#### 1. 팀 액세스 설정

```bash
# npm 조직에 팀 추가
npm team create exem:developers
npm team create exem:maintainers

# 패키지별 액세스 권한 부여
npm access grant read-write exem:developers @exem/design-token
npm access grant read-write exem:maintainers @exem/stylesheet
```

#### 2. CI/CD용 토큰 생성

```bash
# Automation 토큰 생성 (읽기 전용, IP 제한 권장)
# https://www.npmjs.com/settings/{username}/tokens

# GitHub Secrets에 저장
# Repository Settings → Secrets → Actions
# NPM_TOKEN = npm_xxxxxxxxxxxx
```

#### 3. 2FA (Two-Factor Authentication) 필수

```bash
# npm 계정에 2FA 활성화
npm profile enable-2fa auth-and-writes
```

---

## 📊 모니터링 및 분석

### 1. 다운로드 통계 추적

```bash
# npm 다운로드 통계 확인
npm view @exem/design-token downloads

# 주간/월간 통계
npm-stat @exem/design-token
```

### 2. 번들 사이즈 모니터링

```bash
# 번들 사이즈 추적 (bundlephobia)
npx bundlephobia @exem/design-token

# CI에서 자동 체크
- name: Check bundle size
  run: npx size-limit
```

#### size-limit 설정

```json
// package.json
{
  "size-limit": [
    {
      "path": "dist/index.js",
      "limit": "10 KB"
    }
  ]
}
```

### 3. 사용자 피드백 수집

#### GitHub Issues 템플릿

```markdown
<!-- .github/ISSUE_TEMPLATE/bug_report.md -->
---
name: 버그 리포트
about: 패키지 사용 중 발견한 버그 보고
labels: bug
---

**패키지명 및 버전**
- 패키지: @exem/design-token
- 버전: 0.2.1

**버그 설명**
명확하고 간결한 버그 설명

**재현 방법**
1. ...
2. ...

**예상 동작**
어떻게 동작해야 하는지

**실제 동작**
실제로 어떻게 동작하는지

**환경**
- OS: [예: macOS 13.0]
- Node: [예: 18.17.0]
- 패키지 매니저: [예: pnpm 8.0.0]
```

---

## 🚨 위기 대응 계획

### 1. 긴급 패치 배포

```bash
# Critical 버그 발견 시

# 1. Hotfix 브랜치 생성
git checkout -b hotfix/critical-bug main

# 2. 버그 수정
# ...

# 3. Changeset 생성 (patch)
pnpm changeset
# 선택: patch
# 설명: "fix: critical bug in token generation"

# 4. 즉시 배포
pnpm version
pnpm release

# 5. Main 브랜치에 머지
git checkout main
git merge hotfix/critical-bug
```

**예상 시간:** 30분 이내

### 2. 잘못된 버전 배포 시

```bash
# Option 1: Deprecate (권장)
npm deprecate @exem/design-token@0.2.3 "버그로 인해 사용 중단. 0.2.4 사용 권장"

# Option 2: Unpublish (24시간 이내만 가능)
npm unpublish @exem/design-token@0.2.3

# Option 3: 빠른 패치 버전 배포
# 0.2.3 → 0.2.4로 버그 수정 버전 즉시 배포
```

### 3. Breaking Changes 롤백

```bash
# Major 버전 업데이트 후 문제 발생 시

# 1. 이전 버전 복구 (Git)
git revert <commit-hash>

# 2. 패치 버전 배포
pnpm changeset
# v2.0.0에서 문제 → v2.0.1로 임시 해결

# 3. 마이그레이션 가이드 작성
# docs/migration/v1-to-v2.md

# 4. 공지사항 발행
# GitHub Releases, 블로그 등
```

---

## 📋 체크리스트 템플릿

### 배포 전 체크리스트

```markdown
## 배포 전 필수 확인사항

### 코드 품질
- [ ] `pnpm test` 모든 테스트 통과
- [ ] `pnpm typecheck` 타입 오류 없음
- [ ] `pnpm lint` 린트 오류 없음
- [ ] `pnpm build` 빌드 성공

### 버전 관리
- [ ] Changeset 생성 완료
- [ ] CHANGELOG.md 업데이트 확인
- [ ] 버전 번호 Semantic Versioning 준수
- [ ] Breaking Changes 문서화 (major 버전 시)

### 문서
- [ ] README.md 최신 상태 확인
- [ ] API 문서 업데이트 (있는 경우)
- [ ] 마이그레이션 가이드 작성 (Breaking Changes 시)

### 의존성
- [ ] 내부 패키지 의존성 버전 확인
- [ ] peerDependencies 버전 범위 검증
- [ ] 순환 의존성 없음 확인

### 보안
- [ ] npm audit 취약점 없음
- [ ] 민감 정보 노출 없음 (.gitignore 확인)
- [ ] 빌드 산출물만 배포 (dist 폴더)

### 최종 확인
- [ ] dry-run 테스트 완료 (`npm publish --dry-run`)
- [ ] 배포 권한 확인 (npm 로그인 상태)
- [ ] 배포 후 롤백 계획 수립
```

---

## 🎓 배포 모범 사례

### 1. 배포 빈도

**권장 전략: 정기 배포 + 긴급 배포**

- **정기 배포**: 매주 금요일 오전 (Weekly Release)
- **긴급 배포**: Critical bug 발견 시 즉시
- **Major 배포**: 분기별 1회 (충분한 베타 테스트 후)

### 2. 배포 커뮤니케이션

#### 배포 공지 채널

1. **GitHub Releases**: 모든 배포 시 자동 생성
2. **Changelog**: 패키지별 CHANGELOG.md 자동 업데이트
3. **내부 Slack/Discord**: 팀 공지
4. **외부 블로그**: Major 버전 업데이트 시

#### 배포 공지 템플릿

```markdown
## 🎉 @exem/design-token v0.3.0 Released!

### ✨ New Features
- Add new spacing tokens for consistent layouts
- Support dark mode color variants

### 🐛 Bug Fixes
- Fix incorrect shadow token values
- Improve TypeScript type definitions

### 📚 Documentation
- Add migration guide from v0.2.x
- Update usage examples

### ⚠️ Breaking Changes
None

### 📦 Installation
\`\`\`bash
npm install @exem/design-token@0.3.0
\`\`\`

**Full Changelog**: https://github.com/exem/design-system/releases/tag/@exem/design-token@0.3.0
```

### 3. 사용자 지원

#### Support Channels

1. **GitHub Issues**: 버그 리포트 및 기능 요청
2. **GitHub Discussions**: 질문 및 사용법 논의
3. **Documentation Site**: 공식 문서 및 예제
4. **Stack Overflow**: `exem-design-system` 태그

---

## 📝 실행 가이드

### 즉시 실행 가능한 단계

#### Step 1: 패키지명 스코프 적용 (30분)

```bash
# 각 패키지의 package.json 수정
# exem-stylesheet → @exem/stylesheet
# exem-design-token → @exem/design-token
# etc.

# 의존성 참조도 함께 업데이트
pnpm install
```

#### Step 2: 첫 배포 실행 (1시간)

```bash
# 1. NPM 로그인
npm login

# 2. 빌드 검증
pnpm build

# 3. stylesheet 배포
cd packages/stylesheet
npm publish --access public

# 4. design-token 배포
cd ../design-token
pnpm generate  # 토큰 재생성
npm publish --access public

# 5. 나머지 패키지 배포
cd ../tailwindcss3-plugin
npm publish --access public

cd ../react
npm publish --access public
```

#### Step 3: CI/CD 구축 (2시간)

1. `.github/workflows/release.yml` 생성
2. NPM_TOKEN을 GitHub Secrets에 추가
3. main 브랜치에 푸시하여 자동 배포 테스트

---

## 🎯 성공 지표 (KPI)

### 3개월 후 (2026년 1월)

- [ ] npm 주간 다운로드 100+ 달성
- [ ] GitHub Stars 50+ 달성
- [ ] 내부 프로젝트 3개 이상 적용
- [ ] 버그 리포트 응답 시간 24시간 이내

### 6개월 후 (2026년 4월)

- [ ] npm 주간 다운로드 500+ 달성
- [ ] GitHub Stars 200+ 달성
- [ ] 외부 오픈소스 프로젝트 1개 이상 사용
- [ ] 커뮤니티 기여자 5명 이상

### 1년 후 (2026년 9월)

- [ ] npm 주간 다운로드 2,000+ 달성
- [ ] GitHub Stars 1,000+ 달성
- [ ] v2.0.0 Major 업데이트 안정화
- [ ] 공식 플러그인 생태계 구축

---

**문서 버전:** 1.0.0  
**최종 업데이트:** 2025-09-30  
**담당자:** Design System Team
