# CI/CD 파이프라인 가이드

이 문서는 EXEM Design System의 CI/CD 파이프라인에 대한 상세 설명을 제공합니다.

## 📋 목차

- [CI 워크플로우](#ci-워크플로우)
- [Release 워크플로우](#release-워크플로우)
- [설정 방법](#설정-방법)
- [트러블슈팅](#트러블슈팅)

---

## CI 워크플로우

### 📍 파일 위치
`.github/workflows/ci.yml`

### ⚡ 트리거 조건
- `main` 브랜치에 push
- `main` 브랜치로의 Pull Request

### 🔄 실행 단계

1. **코드 체크아웃**
   - 저장소 코드를 가져옵니다

2. **환경 설정**
   - pnpm 10 설치
   - Node.js 18 설정
   - 캐시 활용으로 빌드 속도 향상

3. **의존성 설치**
   - `pnpm install --frozen-lockfile`
   - 잠금 파일을 엄격하게 따라 정확한 버전 설치

4. **코드 품질 검사**
   ```bash
   pnpm lint         # Biome 린팅
   pnpm typecheck    # TypeScript 타입 체크
   pnpm build        # 전체 패키지 빌드
   ```

### 🎯 목적
- 코드 품질 유지
- 타입 안정성 보장
- 빌드 가능 여부 확인
- PR 리뷰 전 자동 검증

---

## Release 워크플로우

### 📍 파일 위치
`.github/workflows/release.yml`

### ⚡ 트리거 조건
- `main` 브랜치에 push (PR 병합 시)

### 🔄 실행 단계

1. **코드 체크아웃**
   - 전체 git history 가져오기 (`fetch-depth: 0`)

2. **환경 설정**
   - pnpm 10 설치
   - Node.js 18 설정
   - npm registry 설정

3. **빌드**
   - `pnpm install --frozen-lockfile`
   - `pnpm build`

4. **Changesets 실행**
   - 변경사항이 있으면 버전 업데이트 PR 생성
   - 버전 PR이 병합되면 npm에 자동 배포

### 🎯 목적
- 버전 관리 자동화
- npm 배포 자동화
- 변경 이력 추적

---

## 설정 방법

### GitHub Secrets 설정

1. **NPM_TOKEN**
   - npm에서 Access Token 발급
   - GitHub 저장소 Settings → Secrets and variables → Actions
   - New repository secret 클릭
   - Name: `NPM_TOKEN`
   - Value: npm 토큰

2. **GITHUB_TOKEN**
   - GitHub Actions에서 자동 제공
   - 별도 설정 불필요

### 로컬 테스트

CI 워크플로우를 로컬에서 테스트:

```bash
# 린트 검사
pnpm lint

# 타입 체크
pnpm typecheck

# 빌드
pnpm build
```

---

## 트러블슈팅

### 빌드 실패

**문제**: CI에서 빌드가 실패합니다.

**해결**:
1. 로컬에서 `pnpm build` 실행
2. 에러 메시지 확인
3. 타입 에러는 `pnpm typecheck`로 확인
4. 린트 에러는 `pnpm lint:fix`로 자동 수정

### 배포 실패

**문제**: npm 배포가 실패합니다.

**해결**:
1. NPM_TOKEN이 올바르게 설정되었는지 확인
2. npm 토큰이 만료되지 않았는지 확인
3. package.json의 version이 중복되지 않는지 확인

### Changesets PR이 생성되지 않음

**문제**: 변경사항이 있는데 PR이 생성되지 않습니다.

**해결**:
1. `.changeset` 디렉토리에 변경 파일이 있는지 확인
2. `pnpm changeset`으로 변경사항 추가
3. commit & push

---

## 참고 자료

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [pnpm Documentation](https://pnpm.io)
