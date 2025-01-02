import { defineStore } from "pinia";
import {ref} from "vue";
import axios from "axios";

const ACCOUNT_API = "http://3.39.190.135:8080/api/account";

export const useAccountStore = defineStore("account", () => {
    // 1. 계좌 생성
    const createAccount = async (userId) => {
      try {
        const token = sessionStorage.getItem("access-token"); // 세션에서 토큰 가져오기
        const response = await axios.post(
          `${ACCOUNT_API}/create`,
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        alert("계좌 생성이 완료되었습니다!");
        return response.data; // 생성된 계좌 정보 반환
      } catch (error) {
        console.error("계좌 생성 실패:", error.response || error);
        alert("계좌 생성 중 문제가 발생했습니다.");
        throw error; // 오류를 호출한 쪽으로 전달
      }
    };

    // 2. 상세 계좌 조회
    const getAccountById = async (accountId) => {
        try {
            const token = sessionStorage.getItem("access-token");
            const response = await axios.get(`${ACCOUNT_API}/${accountId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
      
            return response.data; // 특정 계좌 정보 반환
          } catch (error) {
            console.error("계좌 상세 조회 실패:", error.response || error);
            throw error;
          }
    };

    const accounts = ref([]); 

    // 3. 전체 계좌 조회
    const getAccountsByUserId = async (userId) => {
        try {
            const token = sessionStorage.getItem("access-token");
            const response = await axios.get(`${ACCOUNT_API}/user/${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            
            accounts.value = response.data;
            return response.data;
          } catch (error) {
            console.error("계좌 상세 조회 실패:", error.response || error);
            throw error;
          }
    };



  
    return { accounts, createAccount, getAccountById , getAccountsByUserId};
  });