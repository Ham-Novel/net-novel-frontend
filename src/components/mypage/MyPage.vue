<template>
    <div class="my-page">
        <div class="profile">
            <div class="profile-background"></div>
            <div class="profile-header">
                <div class="profile-header-background"></div>
                <div class="profile-picture"></div>
            </div>

            <div class="user-info">
                <h1>{{ userData.nickName }}</h1>
                <p class="user-id">ID: 4319251275</p>

                <div class="user-meta">
                    <span>2021-11-20 Joined</span>
                    <span>Global</span>
                </div>
            </div>
        </div>

        <div class="reading-stats">
            <div class="stat">
                <span class="stat-value">0.3h</span>
                <span class="stat-label">of Reading</span>
            </div>
            <div class="stat">
                <span class="stat-value">35</span>
                <span class="stat-label">Read books</span>
            </div>
        </div>

        <div class="user-details">
            <h2>User Information</h2>
            <p><strong>Email:</strong> {{ userData.email }}</p>
            <p><strong>Coin:</strong> {{ userData.coinCount }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import novelAPI from "@/serverApi";

const userData = ref({
    nickName: "aaa",
    coinCount: 0,
    email: "aaa",
});

async function loadUserData() {
    try {
        let resp = await novelAPI.getMyPageData();
        console.log(resp);
        userData.value = resp;
    } catch (error) {
        console.error("Error In Loading MyPage Data:", error);
    }
}

onMounted(() => {
    loadUserData();
});
</script>

<style scoped>
.my-page {
}

.profile {
    position: relative;
}

.profile-background {
    position: absolute;
    background-color: rgb(247, 251, 255);
    height: 105%;
    width: 200%;
    left: -50%;
    z-index: -1;
}

.profile-header {
    position: relative;
    height: 200px;
}

.profile-header-background {
    height: 150px;
    background-color: #f0f0f0;
    border-radius: 10px 10px 0 0;
}

.profile-picture {
    position: absolute;
    bottom: 0;
    left: 20px;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    border-radius: 50%;
    border: 4px solid white;
}

.user-info {
    box-sizing: border-box;
    margin-top: 3px;
    margin-bottom: 30px;
}

.user-info h1 {
    font-size: 24px;
    margin-bottom: 5px;
}

.user-id {
    color: #666;
    margin-bottom: 10px;
}

.user-meta {
    font-size: 14px;
    color: #666;
}

.user-meta span:not(:last-child) {
    margin-right: 20px;
}

.reading-stats {
    display: flex;
    justify-content: space-around;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 18px;
    font-weight: bold;
}

.stat-label {
    font-size: 14px;
    color: #666;
}

.user-details,
.badges {
    margin-bottom: 20px;
}

h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.badge-container {
    display: flex;
    gap: 10px;
}

.badge {
    width: 50px;
    height: 50px;
    background-color: #ffd700;
    border-radius: 10px;
}
</style>
