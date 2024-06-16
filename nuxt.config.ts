// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // 서버 사이드 렌더링 비활성화
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ui: {
    global: true // 글로벌로 컴포넌트를 노출
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://49.247.25.154:8080/api' // 백엔드 엔드포인트
    }
  },
  server: {
    port: 80, // HTTP 포트
    host: '0.0.0.0' // 모든 호스트에서 접근 가능하도록 설정
  }
})