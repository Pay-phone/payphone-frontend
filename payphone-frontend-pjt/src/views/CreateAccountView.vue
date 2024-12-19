<template>
    <div>
      <h1>계좌 생성</h1>
      <div>
        <button @click="handleCreateAccount">계좌 생성</button>
      </div>
      <div v-if="createdAccount">
        <h2>새로 생성된 계좌 정보</h2>
        <p>계좌번호: {{ createdAccount.accountNumber }}</p>
        <p>초기 잔액: {{ createdAccount.balance.toLocaleString() }}원</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/userStore";
  import { useAccountStore } from "@/stores/accountStore";
  
  // Pinia 스토어 사용
  const userStore = useUserStore();
  const accountStore = useAccountStore();
  
  // 생성된 계좌 상태
  const createdAccount = ref(null);
  
  // 계좌 생성 메서드
  const handleCreateAccount = async () => {
    try {
      const userId = userStore.loginUser?.userId; // 현재 로그인된 사용자 ID 가져오기
      if (!userId) {
        console.error("로그인된 사용자 정보를 찾을 수 없습니다.");
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }
  
      const account = await accountStore.createAccount(userId);
      createdAccount.value = account; // 생성된 계좌 정보를 저장
      alert("새 계좌가 성공적으로 생성되었습니다.");
    } catch (error) {
      console.error("계좌 생성 중 오류:", error);
      alert("계좌 생성 중 문제가 발생했습니다.");
    }
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  h2 {
    margin-top: 30px;
    color: #2c3e50;
  }
  </style>
  