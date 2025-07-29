# 📦 패키지 배포 가이드

EXEM 디자인 시스템 모노레포의 npm 패키지 배포 및 버전 관리 가이드입니다.

## 🚀 배포 워크플로우

### 1. 개발 완료 후 변경사항 기록

```bash
# changeset 생성 (대화형)
pnpm changeset

# 또는 특정 패키지만 지정
pnpm changeset --snapshot beta
```

**변경 유형 선택:**
- **major** (1.0.0 → 2.0.0): Breaking changes
- **minor** (1.0.0 → 1.1.0): 새로운 기능 추가
- **patch** (1.0.0 → 1.0.1): 버그 수정

### 2. 버전 업데이트 및 CHANGELOG 생성

```bash
# 모든 패키지 버전 업데이트
pnpm version

# 특정 패키지만 업데이트
pnpm changeset version --snapshot
```

### 3. 빌드 및 배포

```bash
# 전체 빌드 후 npm 배포
pnpm release

# 개별 패키지 배포 (필요시)
cd packages/design-token && npm publish
```

## 📋 배포 시나리오별 가이드

### 시나리오 1: CSS 변수 수정 (stylesheet 변경)

```bash
# 1. CSS 변수 수정 후
pnpm changeset
# ✅ @exem/stylesheet: minor (새 변수 추가) 또는 patch (기존 변수 수정)
# ✅ @exem/design-token: patch (자동 연동, linked 설정으로 같이 업데이트)

# 2. 토큰 재생성
cd packages/design-token && pnpm generate

# 3. 버전 업데이트 및 배포
pnpm version && pnpm release
```

### 시나리오 2: 새로운 React 컴포넌트 추가

```bash
# 1. 컴포넌트 개발 완료 후
pnpm changeset
# ✅ @exem/react: minor (새 컴포넌트)

# 2. 버전 업데이트 및 배포
pnpm version && pnpm release
```

### 시나리오 3: Tailwind 플러그인 기능 추가

```bash
# 1. 플러그인 기능 추가 후
pnpm changeset
# ✅ @exem/tailwindcss3-plugin: minor (새 유틸리티)

# 2. 버전 업데이트 및 배포
pnpm version && pnpm release
```

### 시나리오 4: Breaking Changes

```bash
# 1. API 변경 (Breaking)
pnpm changeset
# ⚠️ @exem/react: major (Props 인터페이스 변경)
# ⚠️ @exem/design-token: major (토큰 구조 변경)

# 2. 마이그레이션 가이드 작성 후 배포
pnpm version && pnpm release
```

## 🔧 의존성 관리 전략

### Linked Packages (연동 배포)
stylesheet와 design-token은 연결되어 있어 함께 업데이트됩니다:

```json
{
  "linked": [
    ["@exem/stylesheet", "@exem/design-token"]
  ]
}
```

### Internal Dependencies 업데이트
내부 패키지 의존성은 자동으로 patch 업데이트됩니다:

```json
{
  "updateInternalDependencies": "patch"
}
```

## 📈 버전 관리 규칙

### 패키지별 배포 빈도
1. **@exem/stylesheet**: 낮음 (디자인 토큰 변경시만)
2. **@exem/design-token**: 중간 (stylesheet 변경에 따라)
3. **@exem/tailwindcss3-plugin**: 중간 (기능 추가시)
4. **@exem/react**: 높음 (컴포넌트 추가/수정 빈번)
5. **@exem/react-theming**: 낮음 (테마 시스템 안정화 후)
6. **@exem/icon**: 중간 (아이콘 추가시)

### 배포 우선순위
```
stylesheet → design-token → (tailwind-plugin, react, theming, icon)
```

## 🚨 주의사항

### Before Release Checklist
- [ ] 모든 테스트 통과: `pnpm test`
- [ ] 타입 체크 통과: `pnpm typecheck`
- [ ] 린팅 통과: `pnpm lint`
- [ ] 빌드 성공: `pnpm build`
- [ ] CHANGELOG 확인
- [ ] Breaking Changes 문서화

### 배포 후 확인사항
```bash
# 배포된 패키지 확인
npm view @exem/design-token versions --json

# 의존성 업데이트 테스트
npm install @exem/design-token@latest
```

## 🔄 Emergency Rollback

문제 발생시 롤백:

```bash
# 이전 버전으로 롤백
npm unpublish @exem/package-name@1.2.3

# 또는 deprecated 처리
npm deprecate @exem/package-name@1.2.3 "버그 수정을 위해 사용 중단"
```

## 📚 유용한 명령어

```bash
# 현재 패키지 상태 확인
pnpm changeset status

# changeset 미리보기
pnpm changeset --dry-run

# 특정 패키지만 배포
cd packages/design-token && npm publish

# 모든 패키지 최신 버전 확인
pnpm outdated
```