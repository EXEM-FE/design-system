# @exem/design-token

## 1.1.2

### Patch Changes

- b640565: update README.md

## 1.1.1

### Patch Changes

- 1368d13: update README.md

## 1.1.0

### Minor Changes

- 6362f67: TokenKeys 타입 export로 타입 추론 개선

### Patch Changes

- 204ed97: 패키지 exports 및 의존성 구조 개선

## 1.0.2

### Patch Changes

- 66bb6fc: update README.md
- Updated dependencies [66bb6fc]
  - @exem-fe/stylesheet@1.0.2

## 1.0.1

### Patch Changes

- 1509bfe: Update README

## 1.0.0

### Major Changes

- 2beb889: Initial v1.0.0 release with @exem-fe organization scope

### Patch Changes

- Updated dependencies [2beb889]
  - @exem-fe/stylesheet@1.0.0

## 0.2.0

### Minor Changes

- 패키지 구조 재구성 및 자동 토큰 생성 시스템 구현

  ## @exem/stylesheet

  - global.css 파일을 src/ 폴더로 이동하여 패키지 구조 통일
  - 순환 의존성 제거로 안정성 향상
  - CSS 변수 기반 디자인 토큰 제공

  ## @exem/design-token

  - CSS 토큰 자동 생성 시스템 구현 (generateToken.ts)
  - tsx 기반 TypeScript 실행 환경 구성
  - color, radius, shadow, breakpoint 카테고리별 토큰 자동 생성
  - Biome 포맷팅 통합으로 코드 품질 보장
  - stylesheet 패키지 연동으로 전역 CSS 자동 로드

  ## 문서 업데이트

  - 두 패키지의 README를 실제 구현과 일치하도록 전면 개선
  - 사용법 예제 및 패키지 간 관계 명확화

### Patch Changes

- Updated dependencies
  - @exem/stylesheet@0.2.0
