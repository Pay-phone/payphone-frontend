import {ref} from "vue";
import {defineStore} from "pinia";
import axios from "axios"; 
import router from "@/router"; 

const REST_USER_AIP = `http://localhost:8080/api/auth`;
// Axios 요청 시 Authorization 헤더 자동 설정
axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


export const useUserStore = defineStore("user", () => {
    const loginUser = ref(null);
    const isLoggedIn = ref(false);

    //회원가입
    const userSignup = async ({username, email, password}) => {
        try {
            await axios.post(`${REST_USER_AIP}/signup`, {username, email, password});
            alert("회원가입이 완료되었습니다.");
            router.push({name:"login"}); //회원가입 성공 후 로그인 화면으로 이동
        } catch (error) {
            console.error("회원가입 실패:", error.response || error);
            alert("회원가입 중 문제가 발생했습니다.");
        }
    };

    //로그인
    const userLogin = async ({username, password}) => {
        try {
            const response = await axios.post(`${REST_USER_AIP}/login`, {username, password});

            isLoggedIn.value =true;

            //세션에 JWT 토큰과 사용자 정보 저장
            const token = response.data.token;
            const userInfo = response.data.user;
            sessionStorage.setItem("access-token", token);
            sessionStorage.setItem("user-info", JSON.stringify(userInfo));

            loginUser.value = userInfo;

            alert(`${userInfo.username}님, 환영합니다!`);
            router.push({ name: "dashboard" }); // 로그인 성공 후 대시보드로 이동
        } catch (error) {
            console.error("로그인 실패:", error.response || error);
            alert("로그인에 실패했습니다. 사용자 정보를 확인하세요.");
        }
    };
    // 세션 복구
    const restoreSession = () => {
        try {
            const token = sessionStorage.getItem("access-token");
            const userInfo = sessionStorage.getItem("user-info");

            console.log("복구된 토큰:", token);
            console.log("복구된 사용자 정보:", userInfo);
    
            if (token && userInfo) {
               loginUser.value = JSON.parse(userInfo);
               isLoggedIn.value = true;
            } else {
                // 세션이 없는 경우 로그아웃 처리
                loginUser.value = null;
                isLoggedIn.value = false;
                console.warn("세션 정보가 없습니다. 로그인이 필요합니다.");
            }
 
        } catch (error) {
            console.error("세션 복구 중 오류:", error);
        }
    };

    // 로그아웃
    const logoutUser = () => {
        loginUser.value = null;
        isLoggedIn.value = false;
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("user-info");
        alert("로그아웃 되었습니다.");
        router.push({ name: "userLogin" });
    };

    return {isLoggedIn, loginUser, userSignup, userLogin, restoreSession, logoutUser};

})