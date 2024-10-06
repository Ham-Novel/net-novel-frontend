<template>
    <div class="header base-wrapper">
        <h2>내 댓글 내역</h2>
    </div>
    <div class="comment-list base-wrapper">
        <InfiniteScroll v-bind="scrollProps" ref="scrollRef">
            <template v-slot:default="{ item }">
                <CommentItem
                    :comment="item"
                    :comment-id="item.commentId"
                    :episode-id="item.episodeId"
                    :options="{
                        like: false,
                        report: false,
                        edit: true,
                        recomment: false,
                        type: true,
                    }"
                    @reload="reload"
                >
                    <section class="action-bar">
                        <button
                            class="secondary"
                            @click="goToMyComment(item.novelId, item.episodeId)"
                        >
                            >> [{{ item.novelTitle }}] {{ item.episodeTitle }}
                        </button>
                    </section>
                </CommentItem>
            </template>
        </InfiniteScroll>
    </div>
</template>

<script setup>
import CommentItem from "@/components/reusable/comment/CommentItemV2.vue";
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
const reload = () => {
    scrollRef.value.reset();
};

//댓글 작성한 에피소드로 이동
const router = useRouter();
function goToMyComment(novelId, episodeId) {
    router.push({ name: "episode", params: { novelId, episodeId } });
}
</script>

<style lang="sass" scoped>

.comment-list
    width: 700px
    // margin-top: 30px
    display: flex
    flex-flow: column
    gap: 10px

.action-bar
    z-index: 1
    position: absolute
    bottom: -8px
    display: flex
    flex-flow: row
    gap: 30px

    button
        padding: 1px 5px
        font-size: 0.7rem
</style>
