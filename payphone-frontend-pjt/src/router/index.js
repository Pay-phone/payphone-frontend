import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false }, // 인증 불필요
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false }, // 인증 불필요
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: false }, // 인증 불필요
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }, // 인증 필요
  },
  {
    path: "/create-account",
    name: "create-account",
    component: CreateAccountView,
    meta: { requiresAuth: true }, // 인증 필요
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드: 인증 상태 확인
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Pinia 스토어 가져오기
  const isLoggedIn = userStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 인증이 필요한 페이지인데 로그인하지 않은 경우
    alert("로그인이 필요합니다.");
    next({ name: "login" }); // 로그인 페이지로 리다이렉트
  } else if (!to.meta.requiresAuth && isLoggedIn && (to.name === "login" || to.name === "register")) {
    // 이미 로그인 상태에서 로그인/회원가입 페이지로 이동하려고 할 때
    next({ name: "dashboard" }); // 대시보드로 리다이렉트
  } else {
    next(); // 정상적으로 페이지 이동
  }
});

export default router;
