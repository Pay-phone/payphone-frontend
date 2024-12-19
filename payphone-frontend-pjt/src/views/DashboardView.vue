<template>
    <div>
        <div>
        <h1>환영합니다, {{ username }}님!</h1>
        <p>오늘도 안전한 금융 서비스를 제공합니다.</p>

        </div>

        <!-- 계좌 요약 세션-->
        <section>
            <h2>계좌 정보 요약</h2>
            <ul>
                <li v-for="(account, index) in accountSummary" :key="index">
                    <strong>{{ account.accountName }}</strong>: {{ account.balance.toLocaleString() }}원<br />
                    계좌번호: {{ account.accountNumber }}
                    <button @click="viewAccountDetail(account)">자세히 보기</button>
                </li>
            </ul>
            <p v-if="accountSummary.length === 0">계좌 정보가 없습니다.</p>
        </section>

        <!--최근 거래 내역-->
        <section>
            <h2>최근 거래 내역</h2>
            <ul>
                <li v-for="(transaction, index) in recentTransactions" :key="index">
                    {{ transaction.date }} | {{ transaction.type }} | {{ transaction.amount.toLocaleString() }}원 | {{ transaction.target }}
                </li>
            </ul>
        </section>

        <!--주요 작업 섹션-->
        <section>
            <h2>주요 작업</h2>
            <div>
                <button @click="goToPage('transfer')">송금하기</button>
                <button @click="goToCreateAccount">계좌 생성</button>
                <button @click="goToPage('savings')">정기 예금 관리</button>
                <button @click="goToPage('loan')">대출 신청</button>
            </div>
        </section>

        <!--추천 금융 서비스-->
        <section>
        <h2>추천 금융 서비스</h2>
        <p>최대 2% 적립 가능한 신용카드를 확인하세요!</p>
        <p>정기 예금 이율 인상 혜택: 3.2% (2024년 한정)</p>
        </section>

    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, onMounted } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import { useRouter } from "vue-router";

// 사용자 및 계좌 데이터 스토어
const userStore = useUserStore();
const accountStore = useAccountStore();
const router = useRouter();

// 상태 선언
const username = ref("");
const accountSummary = ref([]);
const recentTransactions = ref([]);
recentTransactions.value = [
    { date: "2024-12-18", type: "송금", amount: -200000, target: "김철수" },
    { date: "2024-12-17", type: "입금", amount: 500000, target: "직장 급여" },
];

// 계좌 조회 및 초기화 
const initializeDashboard = async () => {

    try {
    // 사용자 정보 가져오기
    username.value = userStore.loginUser?.username || "사용자";

    // 계좌 정보 가져오기
    const userId = userStore.loginUser?.userId; //userId 가져오기 
    if(userId) {
        //API 호출
        const accounts = await accountStore.getAccountsByUserId(userId);
        console.log("accounts",accounts);

        //API 응답 데이터를 accountSummary에 매핑 
        accountSummary.value = accounts.map((account) => ({
            accountId: account.accountId,
            accountName: "일반 계좌", 
            accountNumber: account.accountNumber,
            balance: account.balance,
      }));
    } else {
        console.warn("사용자 ID를 찾을 수 없습니다.");
    }

  } catch (error) {
    console.error("대시보드 초기화 실패:", error);
  } 
};

// 계좌 상세보기
const viewAccountDetail = async (account) => {
  try {
    const accountDetail = await accountStore.getAccountById(account.accountId);
    alert(`
      계좌 상세 정보:
      계좌번호: ${accountDetail.accountNumber}
      잔액: ${accountDetail.balance.toLocaleString()}원
      생성일: ${accountDetail.createdAt}
    `);
  } catch (error) {
    console.error("계좌 상세보기 실패:", error);
  }
};

// 계좌 생성 페이지 이동
const goToCreateAccount = () => {
  router.push({ name: "create-account" });
};


// 컴포넌트 마운트 시 데이터 초기화
onMounted(() => {
  initializeDashboard();
});



</script>

<style scoped>

</style>