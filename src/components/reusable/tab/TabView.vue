<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-bind="$attrs" />
        </keep-alive>
    </router-view>
</template>
