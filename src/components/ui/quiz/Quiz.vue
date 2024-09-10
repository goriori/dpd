<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {computed, onMounted, ref} from "vue";
import {gsap} from "gsap";

type Question = {
  "id": number,
  "preview": string,
  "question": {
    "title": string,
    "isCorrectly": boolean,
    "messageCorrectly": string
    "messageNotCorrectly": string
  }
}

type QProps = {
  questions: Question[]
}
type QEmits = {
  (eventName: 'onFinish', typeClient?: 'new' | 'old'): void
}
const emits = defineEmits<QEmits>()
const props = defineProps<QProps>()
const stateQuiz = ref<'question' | 'answer'>('question')
const numberQuestion = ref(0)
const question = computed(() => props.questions[numberQuestion.value])
const progress = computed(() => `${(numberQuestion.value / (props.questions.length - 1) * 100)}%`)
const currentAnswer = ref<boolean>(false)
const countCorrectlyAnswers = ref(0)

const onBelieve = () => {
  if (question.value.question.isCorrectly) countCorrectlyAnswers.value += 1
  stateQuiz.value = 'answer'
  currentAnswer.value = true
}

const onNotBelieve = () => {
  stateQuiz.value = 'answer'
  currentAnswer.value = false
}

const onNextQuestion = () => {
  stateQuiz.value = 'question'
  numberQuestion.value += 1
}

const newClient = () => {
  return onFinish('new')
}

const oldClient = () => {
  return onFinish('old')
}

const onFinish = (typeClient: 'new' | 'old' ) => emits('onFinish', typeClient)
onMounted(() => {
  gsap.timeline()
      .fromTo('.card',
          {
            position: 'relative',
            left: -1000
          }, {
            left: 0
          })
      .fromTo('.track', {width: 0}, {width: '100%'})
      .fromTo('.question-status', {
        position: 'relative',
        opacity: 0,
        right: -1000
      }, {
        opacity: 1,
        right: 0
      })
      .fromTo('.question-title', {scale: 0}, {scale: 1})
      .fromTo('.preview', {
        position: 'relative',
        right: -1000
      }, {
        right: 0
      })
})
</script>

<template>
  <article class="quiz">
    <section class="question">
      <div v-if="stateQuiz === 'question'" class="card-question card">
        <div class="track"></div>
        <p class="question-status">Вопросов {{ numberQuestion + 1 }} / {{ questions.length }}</p>
        <p class="question-title">{{ question.question.title }}</p>
        <div class="actions">
          <Button title="Верю" background="primary" @on-click="onBelieve"/>
          <Button title="Не верю" background="primary" @on-click="onNotBelieve"/>
        </div>
      </div>
      <div v-else class="card-answer card">
        <h3>{{ currentAnswer ? 'Верю' : 'Не верю' }}</h3>
        <p class="answer-title">{{
            currentAnswer === question.question.isCorrectly
                ?
                question.question.messageCorrectly
                :
                question.question.messageNotCorrectly
          }}</p>
        <div class="actions">
          <Button v-if="numberQuestion !== 8" title="Продолжить" background="primary" class="btn-next"
                  @on-click="onNextQuestion"/>
          <Button v-if="numberQuestion === 8" title="Новый клиент" background="primary" @on-click="newClient"/>
          <Button v-if="numberQuestion === 8" title="Клиент DPD" background="primary" @on-click="oldClient"/>
        </div>
      </div>
    </section>
    <section class="preview">
      <img :src="question.preview" alt="">
    </section>
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/scss/animation";

.quiz {
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 211px;
}

.actions {
  display: flex;
  gap: 32px;
}

.track {
  width: 100%;
  height: 12px;
  border-radius: 20px;
  background: #F6F6F6;

  &::before {
    content: ' ';
    display: block;
    border-radius: 20px;
    width: v-bind(progress);
    height: 12px;
    background: var(--primary-color);
  }
}

.card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  &-answer {
    h3 {
      text-align: center;
      font-weight: 400;
      font-size: 72px;
    }
  }
}

.question {
  &-status {
    font-weight: 300;
    font-size: 32px;
  }

  &-title {
    font-size: 40px;
    animation: 0.3s display-card linear;
  }
}

.question, .preview {
  flex: 0 1 600px;
}

.preview {
  img {
    display: flex;
    margin: 0 auto;
    width: 800px;
    height: 800px;
    object-fit: cover;
  }
}

.answer {
  &-title {
    text-align: center;
    color: #414042;
    font-size: 32px;
    animation: 0.3s display-card linear;

  }
}

.btn {
  &-next {
    max-width: 460px;
    margin: 0 auto;
  }
}
</style>