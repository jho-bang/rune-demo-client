# rune-demo-client

--- 

## 소개
데모 프로젝트입니다.

간단한 틱택토 게임과 이미지 잡티 제거 기능이 있습니다.


### 틱택토
`/tictactoe`로 접근할 수 있습니다.

### 티끌
`/tikkle`로 접근할 수 있습니다.

티끌 프로젝트는 `rune-demo-apis` 서버를 띄운 다음에 사용 가능


## 구조

- **.storybook**: 스토리북 관련 설정 파일
- **src** 
  - **app**: 애플리케이션의 라우팅, 설정, 전역 스타일 등 애플리케이션 구동에 필요한 것들이 있습니다.
  - **pages**: 애플리케이션의 페이지가 포함됩니다.
  - **components**: 페이지에서 사용되는 UI 컴포넌드들입니다.
  - **stores**: 상태 관리
  - **types**: 타입 관리
  - **apis**: API 통신을 위한 코드
  - **shared**: 전역적으로 사용할 컴포넌트, 상수, 헬퍼 함수 등등..

## 사용
```bash
$ pnpm install

$ npm run dev # 서버 시작

$ npm run storybook # 스토리북
```