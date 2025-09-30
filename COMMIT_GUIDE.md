# 커밋 메시지 가이드

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

## 📋 형식

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

## 🎯 Type

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **perf**: 성능 개선
- **test**: 테스트 추가 또는 수정
- **build**: 빌드 시스템이나 외부 의존성 변경
- **ci**: CI 설정 파일 및 스크립트 변경
- **chore**: 기타 변경사항 (src 또는 test 파일 수정 없음)
- **revert**: 이전 커밋 되돌리기

## 📦 Scope

- **react**: React 컴포넌트 패키지
- **design-token**: 디자인 토큰 패키지
- **stylesheet**: 스타일시트 패키지
- **tailwind**: Tailwind CSS 플러그인
- **icon**: 아이콘 패키지
- **docs**: 문서 사이트
- **deps**: 의존성 업데이트
- **ci**: CI/CD 설정
- **build**: 빌드 설정
- **root**: 루트 프로젝트 설정

## ✅ 올바른 예시

### 한글 커밋 (권장)

```bash
feat(react): Button 컴포넌트에 size variants 추가
fix(design-token): 토큰 생성 레이스 컨디션 해결
docs(readme): 설치 가이드 업데이트
refactor(react): color 유틸 함수 분리
chore(deps): TypeScript 5.4로 업데이트
ci(root): GitHub Actions 워크플로우 추가
```

### 영문 커밋 (허용)

```bash
feat(react): add size variants to Button component
fix(design-token): resolve token generation race condition
docs(readme): update installation guide
refactor(react): extract color utility function
chore(deps): update TypeScript to 5.4
ci(root): add GitHub Actions workflow
```

## ❌ 거부되는 예시

```bash
# ❌ Type 누락
add button component

# ❌ Scope 누락
feat: add button

# ❌ Subject 누락
feat(react):

# ❌ Type이 대문자
Feat(react): add button

# ❌ 잘못된 scope
feat(components): add button  # 'components'는 정의되지 않음

# ❌ 잘못된 type
feature(react): add button  # 'feature'가 아닌 'feat'
```

## 🚀 커밋 팁

### Body 사용

복잡한 변경사항은 body에 자세히 설명:

```bash
feat(react): Button 컴포넌트에 size variants 추가

- small, medium, large 크기 지원
- 기본값은 medium으로 설정
- 각 크기에 맞는 padding 및 font-size 적용
```

### Breaking Changes

Breaking change가 있는 경우 footer에 명시:

```bash
feat(react): Button API 개선

BREAKING CHANGE: variant prop이 color prop으로 변경되었습니다
```

### 이슈 참조

관련 이슈가 있는 경우 footer에 참조:

```bash
fix(design-token): 토큰 생성 오류 해결

Closes #123
Refs #456
```

## 🔍 검증

커밋 메시지는 자동으로 검증됩니다:

```bash
# 로컬 테스트
echo "feat(react): add button" | npx commitlint

# 올바른 커밋
✔  feat(react): Button 추가

# 잘못된 커밋
✖  add button
    ⚠ type may not be empty
    ⚠ scope may not be empty
```

## 📚 참고 자료

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
