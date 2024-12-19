<template>
    <div>
        <h1>회원가입</h1>
        <form @submit.prevent="handleSignup">
            <label>
                사용자 이름 : 
                <input type="text" v-model="username" placeholder="사용자 이름" required />
            </label>

            <label>
                이메일:
                <input type="email" v-model="email" placeholder="이메일 주소" required />
            </label>
            <label>
                비밀번호:
                <input type="password" v-model="password" placeholder="비밀번호" required />
            </label>
            <button type="submit">회원가입</button>
        </form>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

// 상태 선언
const username = ref("");
const email = ref("");
const password = ref("");

const userStore = useUserStore();

// 회원가입 메서드
const handleSignup = async () => {
  await userStore.userSignup({
    username: username.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<style scoped>

</style>