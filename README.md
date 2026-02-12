<p align="center">
  <a href="https://react.dev/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png" width="120" alt="React Logo" /></a>
  <a href="https://tailwindcss.com/" target="blank"><img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" width="160" alt="TailwindCss Logo" /></a>
</p>

# SpringBoot Community-App FE Sample
SpringBoot(Java) + JPA(ORM) 게시판 웹 서비스

## 🖥️ 프로젝트 소개
- 기본적인 커뮤니티의 게시판 백엔드 API 서버 심플 테스트용 HTML 코드
- 자세한 사항은 백엔드 API 서버(메인) 확인 : https://github.com/ryukh1129/community_be

## 🚧 실행 추가 설정
- 해당 저장소 코드 다운로드 또는 클론
- `npm install` node 관련 의존성 설치
- React+TailwindCSS 프론트엔드 프로젝트로 마이그레이션
- npm run dev로 localhost:5173에서 테스트
- 백엔드 프로젝트와 동시 실행 필요

## 📌 주요 기능(Features - Functional Requirements)
### ✅ 게시판 - 관리자 권한(Admin Only)
### ✅ 게시글 - 회원 제한(Authorized User Only)
### ✅ 댓글, 대댓글 - 회원 제한(Authorized User Only)
### ✅ 좋아요(Like) - 회원 제한(Authorized User Only)
### ✅ 파일 첨부 - 회원 제한(Authorized User Only)
### ✅ 로그인 - 비회원 가능(Public)
### ✅ 회원가입 - 비회원 가능(Public)
### ✅ Spring AI 활용 AI 챗봇 - 회원 제한(Authorized User Only)

## 💻 화면(View) 구성
<details>
  <summary> 1차 기본 HTML 버전</summary>
<img width="879" height="532" alt="스크린샷 2025-07-29 오후 6 57 09" src="https://github.com/user-attachments/assets/039e6fba-0857-476c-8d8e-071dce564866" />
<img width="879" height="532" alt="스크린샷 2025-07-29 오후 6 57 27" src="https://github.com/user-attachments/assets/d9d4e129-875a-4f1d-a526-0be1b3de043b" />
<img width="879" height="532" alt="스크린샷 2025-07-29 오후 6 57 36" src="https://github.com/user-attachments/assets/761e3c6a-7ab4-4136-ace7-9d6281df4548" />
</details>

<details>
  <summary> 2차 기본 React+TailwindCSS 버전</summary>
</details>
<img width="879" height="532" alt="스크린샷 2025-07-31 204619" src="https://github.com/user-attachments/assets/1eff9413-1205-41e7-9fda-7f31aa8a9fc6" />
<img width="879" height="532" alt="스크린샷 2025-07-31 204625" src="https://github.com/user-attachments/assets/def09ef7-e222-4361-8920-f7c352605a65" />
<img width="879" height="532" alt="스크린샷 2025-07-31 204648" src="https://github.com/user-attachments/assets/21b5cca6-fff2-4b51-af22-711f61b45371" />
<img width="879" height="532" alt="스크린샷 2025-07-31 204655" src="https://github.com/user-attachments/assets/f2155f1d-c88c-4e04-90a8-a0bdebbf0251" />
<img width="879" height="532" alt="스크린샷 2025-07-31 205826" src="https://github.com/user-attachments/assets/e9f3ec81-4f3c-4a9a-826a-148b76b2a444" />
<img width="879" height="532" alt="스크린샷 2025-07-31 205833" src="https://github.com/user-attachments/assets/b0414d94-e36d-4430-88a9-2545c0d9392f" />
<img width="879" height="532" alt="image" src="https://github.com/user-attachments/assets/fbe52150-629c-4afc-a73a-bfbc8509555d" />