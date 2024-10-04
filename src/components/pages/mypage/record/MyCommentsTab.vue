<template>
    <div class="header base-wrapper">
        <h2>내 댓글 내역</h2>
    </div>
    <div class="comment-list base-wrapper">
        <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
            <template v-slot:default="{ item }">
                <CommentItem :comment="item">
                    <section class="action-bar">
                        <button class="secondary" @click="goToMyComment(item.episodeId)">
                            [{{ item.novelTitle }}] {{ item.episodeTitle }}
                        </button>
                    </section>
                </CommentItem>
            </template>
        </InfiniteScroll>
    </div>
</template>

<script setup>
import CommentItem from "@/components/reusable/item/CommentItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { reactive, ref } from "vue";
import { memberApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

//InfiniteScroll props 설정
const scrollProps = reactive({
    pageProps: { number: 0, size: 30 },
    loadMethod: async (page, size) => {
        const loadItems = await memberApi.getCommentsByMember(page, size);
        return loadItems;
    },
});

const scrollRef = ref(null);
const reloadScroll = () => {
    scrollRef.value.reset();
};

//댓글 작성한 에피소드로 이동
const router = useRouter();
function goToMyComment(episodeId) {
    router.push({ name: "episode", params: { episodeId } });
}
</script>

<style lang="sass" scoped>

.comment-list
    margin-top: 30px
    display: flex
    flex-flow: column wrap
    gap: 10px

.action-bar
    position: absolute
    bottom: 0
    right: 1rem
    display: flex
    flex-flow: row wrap
    gap: 30px

    button
        font-size: 0.8rem
</style>
