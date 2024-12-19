<script setup>
import { useUserStore } from '@/stores/userStore'; // 사용자 스토어
import { RouterLink } from 'vue-router';

const userStore = useUserStore(); // 사용자 상태 관리

// 로그아웃 함수
const logout = () => {
  userStore.logoutUser(); // Pinia 로그아웃 처리
};
</script>

<template>
  <header class="header">
    <nav>
      <div class="logo">
        <RouterLink to="/">JW 지우은행</RouterLink>
      </div>
      <ul class="menu">
        <!-- 로그인 상태에 따른 네비게이션 -->
        <li v-if="!userStore.isLoggedIn"><RouterLink to="/">홈</RouterLink></li>
        <li v-if="!userStore.isLoggedIn"><RouterLink to="/register">회원가입</RouterLink></li>
        <li v-if="!userStore.isLoggedIn"><RouterLink to="/login">로그인</RouterLink></li>
        <li v-if="userStore.isLoggedIn"><RouterLink to="/dashboard">대시보드</RouterLink></li>
      </ul>
      <!-- 로그아웃 버튼 -->
      <button v-if="userStore.isLoggedIn" @click="logout" class="logout-button">로그아웃</button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #004d40;
  color: white;
}

.menu {
  display: flex;
  gap: 1rem;
}

.logout-button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.logout-button:hover {
  background-color: white;
  color: #004d40;
}
</style>
