<template>
    <div>
        <CommentItem :comment="comment" :feature-recomment="true" @reload="emits('reload')">
            <template #default>
                <div class="recomment-list">
                    <template v-for="recomment in recommentList" :key="recomment.reCommentId">
                        <CommentItem :comment="recomment"></CommentItem>
                    </template>
                </div>
            </template>
        </CommentItem>
    </div>
</template>

<script setup>
import CommentItem from "@/components/reusable/item/CommentItem.vue";
import InfiniteScroll from "@/components/reusable/InfiniteScroll.vue";

import { commentApi } from "@/hooks/backendApi";
import { reactive, ref } from "vue";

const emits = defineEmits(["reload"]);

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});

const recommentList = ref(props.comment.reCommentList);
</script>

<style scoped lang="sass">

article
    position: relative
    margin: 0

.recomment-list
    margin-bottom: 0.5rem
    // padding-left: 30px
</style>
