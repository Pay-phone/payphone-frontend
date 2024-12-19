<template>
    <div>
        <h1>로그인</h1>
        <form @submit.prevent="handleLogin">
            <label>
                사용자 이름:
                <input type="text" v-model="username" required />
            </label>
            <label>
                비밀번호:
                <input type="password" v-model="password" required />
            </label>
            <button type="submit">로그인</button>
        </form>
    </div>
</template>

<script setup>
import {ref} from "vue";
import { useUserStore } from "@/stores/userStore";

//상태 선언
const username = ref("");
const password = ref("");

const userStore = useUserStore();

//로그인 메서드
const handleLogin = async () => {
    await userStore.userLogin({
        username: username.value,
        password: password.value,
    });
};

</script>

<style lang="scss" scoped>

</style>