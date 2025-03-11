# 인프런 워밍업 클럽 3기 풀스택 2주 차 과제 - My Drop

### 📌 프로젝트 개요

- 이 프로젝트는 **인프런 워밍업 클럽 3기 풀스택 2주 차 과제**로 제출된 next todo 앱입니다.
- **작업 기간: 2025. 3. 8 - 진행 중**

### 🛠️ 설치 방법

```bash
git clone https://github.com/mynolog/inflearn-warmup-3-2-my-drop.git
cd ./inflearn-warmup-3-2-my-drop
pnpm install
# .env.sample 참고하여 프로젝트 루트에 .env 생성
```

### ▶️ 실행 방법

```bash
pnpm run dev
```

### 🎥 데모 영상

<!-- [![유튜브 썸네일](https://img.youtube.com/vi/dMRzbDt6sh0/0.jpg)](https://www.youtube.com/watch?v=dMRzbDt6sh0)

- 이미지 클릭 시 유튜브로 연결 -->

### 🚀 배포 링크

### 🧳 기술 스택

<p style="display: flex; gap: 10px;">
  <a href="https://nextjs.org/">
    <img src="https://skillicons.dev/icons?i=nextjs" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" />
  </a>
  <a href="https://tanstack.com/query/v5/docs/framework/react/overview">
  <img
      src="https://go-skill-icons.vercel.app/api/icons?i=reactquery"
    />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://skillicons.dev/icons?i=tailwind" alt="TailwindCSS" />
  </a>
  <a href="https://supabase.com/">
    <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" />
  </a>
</p>

### ✨ 기능 설명

### 🎯 적용한 패턴

- 역할 분리 패턴: UI(`components/ui`)와 데이터 핸들링(`components/manager`)을 분리하여 재사용성과 유지보수성을 향상
- 검색 결과 예외 처리: 검색 결과가 없을 경우 UI에서 명확한 피드백 제공

### ⚡ 트러블 슈팅

- [x] React Query + Suspense 적용 실패 (2025.3.10)

| 항목          | 내용                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **문제**      | React Query 5버전에서 `suspense: true` 설정을 했지만 Suspense가 정상 동작하지 않음                  |
| **원인**      | React Query 5버전에서 Suspense 관련 옵션들이 비활성화되어 있어 Suspense가 동작하지 않음             |
| **해결 방향** | 최신 버전에서는 Suspense를 사용할 수 없으므로, 대체로 `isLoading` 등을 활용한 로딩 처리 방법을 사용 |

- [x] 파일명에 한글 또는 특수문자가 포함될 경우 업로드 실패 (2025.3.12)

| 항목            | 내용                                                                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **문제**        | Supabase Storage 업로드 시 **파일명에 한글 또는 특수문자가 포함**되어 있을 경우 업로드가 되지 않음                                                                                                              |
| **원인**        | Supabase Storage는 내부적으로 **파일명을 URL-safe하게 처리**해야 하므로, 특수문자나 비알파벳 문자가 포함된 파일명은 문제가 될 수 있음                                                                           |
| **해결 방향 1** | **Server Action에서 try-catch로 에러를 던지고, mutation의 onError에서 에러를 캐치**하여 화면에 에러 메시지를 출력하고 실제 업로드는 차단하는 방식으로 처리하였음                                                |
| **해결 방향 2** | 파일명을 안전한 문자열로 변환하여 업로드하기 전에 **한글 및 특수문자를 랜덤한 문자열로 변경**한 업로드하도록 처리함. 이 방식은 파일명에 한글 및 특수문자가 포함되었을 경우에도 정상적으로 업로드가 가능하게 함. |
