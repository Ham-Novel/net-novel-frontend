<template>
    <article class="novel-create-page">
        <form @submit.prevent class="create-form base-wrapper">
            <section class="info-form">
                <h3>에피소드 작성</h3>
                <div class="novel-info">
                    <div>
                        <p>에피소드 제목</p>
                        <input type="text" v-model="title" />
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea name="content" v-model="content"></textarea>
                    </div>
                </div>
            </section>
            <button class="create-button" @click="submitEpisode">에피소드 등록</button>
        </form>
    </article>
</template>

<script setup>
import CheckBox from "@/components/reusable/CheckBox.vue";
import Radio from "@/components/reusable/Radio.vue";

import { ref } from "vue";
import { episodeApi, novelApi } from "@/hooks/backendApi";
import { useRouter } from "vue-router";

const props = defineProps({
    novelId: {
        type: Number,
        required: true,
    },
});

const router = useRouter();

const title = ref("");
const tags = ref("");
const content = ref("");

async function submitEpisode() {
    console.log(title.value, content.value, props.novelId);

    const createdId = await episodeApi.createEpisode(props.novelId, {
        novelId: props.novelId,
        title: title.value,
        content: content.value,
        costPolicyId: 1,
    });

    router.push({ name: "episode", params: { episodeId: createdId } });
}
</script>

<style scoped lang="sass">


.create-form
    margin-top: 30px
    margin-bottom: 30px
    padding: 50px
    min-height: 300px
    border-radius: 20px
    border: 2px solid rgba(0, 0, 0, 0.15)
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

    position: relative
    display: flex
    flex-flow: column wrap
    justify-content: center
    gap: 60px

    h3
        margin-bottom: 10px
        padding-left: 10px
        padding-bottom: 5px
        font-size: 23px
        border-bottom: 2px solid gray


    .info-form
        flex-grow: 1

        .novel-info
            display: flex
            flex-flow: column wrap
            gap: 10px

            div
                min-height: 50px

            p
                margin: 5px

            input[type=text]
                width: 100%
                height: 25px

            textarea
                width: 100%
                min-height: 600px
                height: auto
                resize: none

.create-button
    position: absolute
    bottom: 10px
    right: 10px
</style>
