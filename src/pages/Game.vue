<script setup lang="ts">

import {onMounted, ref} from "vue";
import Header from "@/components/globals/header/Header.vue";
import Quiz from "@/components/ui/quiz/Quiz.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const questions = ref(null)
const loadQuestions = async () => {
  const response = await fetch('/questions.json')
  return response.json()
}
const finishQuiz = (typeClient: 'new' | 'old') => router.push(`/feedback?type=${typeClient}`)
onMounted(async () => {
  questions.value = await loadQuestions()
})
</script>

<template>
  <div class="page ">
    <section class="page-top ">
      <Header/>
      <h1 class="page-title">Игра - «Верю нe верю»</h1>
    </section>
    <section class="page-center container">
      <Quiz v-if="questions" :questions="questions" @on-finish="finishQuiz!"/>
    </section>
    <section class="page-bottom">
    </section>
  </div>
</template>

<style scoped lang="scss">
.page {

  &-title {
    font-weight: normal;
    text-align: center;
    font-size: 64px;
    color: #fff;
  }

  &-top {
    padding: 64px 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &-center {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.btn {
  max-width: 200px;
}
</style>
