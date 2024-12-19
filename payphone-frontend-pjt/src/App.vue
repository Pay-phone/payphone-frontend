<script setup>
import { RouterView } from 'vue-router';
import HeaderNav from './components/HeaderNav.vue'; // 헤더 컴포넌트
import { useUserStore } from './stores/userStore'; // Pinia 사용자 스토어
import { useRouter } from 'vue-router'; // 라우터 가져오기
import { watch, onMounted } from 'vue';

const userStore = useUserStore(); // 사용자 상태 관리
const router = useRouter(); // 라우터 인스턴스 가져오기

onMounted( async ()=>{
  userStore.restoreSession(); //새로고침 시 세션 복구
})
</script>

<template>
  <div id="app">
    <HeaderNav />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
}
</style>
