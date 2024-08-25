<template>
    <main>
        <p>경로가 잘못되었습니다.</p>
        <p>홈페이지로 돌아가기:</p>
        <router-link :to="{ name: 'home' }">Home Page</router-link>
    </main>
</template>
