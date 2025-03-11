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

- 역할 분리 패턴: UI와 데이터 핸들링을 분리하여 재사용성과 유지보수성을 향상
- 메모이제이션 필터링: useMemo를 활용해 검색 필터 최적화
- 검색 결과 예외 처리: 검색 결과가 없을 경우 UI에서 명확한 피드백 제공

### ⚡ 트러블 슈팅

1. React Query + Suspense 적용 실패

- 문제: React Query 5버전에서 suspense: true 설정을 했지만 Suspense가 정상 동작하지 않음
- 원인: React Query 5버전에서 Suspense 관련 옵션들이 비활성화되어 있어 Suspense가 동작하지 않음
- 해결 방향: 최신 버전에서는 Suspense를 사용할 수 없으므로, 대체로 isLoading 등을 활용한 로딩 처리 방법을 사용
