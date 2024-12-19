<template>
    <div>
      <h1>환영합니다! JW 지우은행</h1>
      <p v-if="!userStore.isLoggedIn">로그인하거나 회원가입하여 서비스를 이용하세요.</p>
      <RouterLink v-if="!userStore.isLoggedIn" to="/register" class="button">회원가입</RouterLink>
      <RouterLink v-if="!userStore.isLoggedIn" to="/login" class="button">로그인</RouterLink>
      <p v-if="userStore.isLoggedIn">대시보드로 이동하세요.</p>
      <RouterLink v-if="userStore.isLoggedIn" to="/dashboard" class="button">대시보드</RouterLink>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore';
  const userStore = useUserStore();
  </script>
  
  <style scoped>
  .button {
    display: inline-block;
    margin: 0.5rem;
    padding: 1rem 2rem;
    background-color: #004d40;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .button:hover {
    background-color: #00796b;
  }
  </style>
  