<script setup lang="ts">
import { ref, VNodeRef } from 'vue'
import { TABLE_FORM } from '@/services/google-sheet'
import Input from '@/components/ui/inputs/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import Form from '@/components/ui/form/Form.vue'
import Keyboard from '@/components/ui/keyboard/Keyboard.vue'
import router from '@/router'

type FProps = {
  isLoading: boolean
}
type FEmits = {
  (eventName: 'onSend', form: TABLE_FORM): void
}
type FieldSchema = {
  ref: VNodeRef | null
  state: 'default' | 'success' | 'error'
  value: string
  focus: boolean
  validReg?: string
  positionCursorStart: number
  positionCursorEnd: number
}

export type SurprizeForm = {
  fullname: FieldSchema
  phone: FieldSchema
  email: FieldSchema
}
defineProps<FProps>()
const emits = defineEmits<FEmits>()
const form = ref<SurprizeForm>({
  fullname: {
    ref: null,
    state: 'default',
    value: 'Василий Астап Игнатьевич',
    focus: false,
    positionCursorStart: 0,
    positionCursorEnd: 0,
  },
  phone: {
    ref: null,
    state: 'default',
    value: '79199999999',
    focus: false,
    positionCursorStart: 0,
    positionCursorEnd: 0,
  },
  email: {
    ref: null,
    state: 'default',
    value: 'vasya.ignatburdjuy@gmail.com',
    focus: false,
    validReg: '.+@.+\..+',
    positionCursorStart: 0,
    positionCursorEnd: 0,
  },
})

const onFocusField = (field: keyof SurprizeForm) => {
  resetFocusForm()
  const startPositionCursor = Number(
    (form.value[field].ref as HTMLInputElement).selectionStart
  )
  const endPositionCursor = Number(
    (form.value[field].ref as HTMLInputElement).selectionEnd
  )
  form.value[field].positionCursorStart = startPositionCursor
  form.value[field].positionCursorEnd = endPositionCursor
  form.value[field].focus = true
}

const resetFocusState = (field: keyof SurprizeForm) => {
  form.value[field].focus = false
}
const resetValueState = (field: keyof SurprizeForm) => {
  form.value[field].value = ''
}

const onPressKey = (field: keyof SurprizeForm, value: string) => {
  const targetField = form.value[field]
  targetField.value =
    targetField.value.substring(0, targetField.positionCursorStart) +
    value +
    targetField.value.substring(targetField.positionCursorEnd)
  targetField.positionCursorStart += 1
  targetField.positionCursorEnd += 1
  ;(targetField.ref as HTMLInputElement).setSelectionRange(
    targetField.positionCursorStart,
    targetField.positionCursorEnd
  )
}

const onBackspace = (field: keyof SurprizeForm) => {
  const targetField = form.value[field]
  if (
    targetField.value.length == targetField.positionCursorStart ||
    targetField.value.length == targetField.positionCursorEnd
  ) {
    targetField.value = targetField.value.slice(0, targetField.value.length - 1)
  } else {
    const leftValue = targetField.value.slice(
      0,
      targetField.positionCursorStart - 1
    )
    const rightValue = targetField.value.slice(
      targetField.positionCursorStart,
      targetField.value.length
    )
    targetField.value = leftValue + rightValue
    targetField.positionCursorStart -= 1
    targetField.positionCursorEnd -= 1
  }
}

const resetFocusForm = () => {
  resetFocusState('fullname')
  resetFocusState('email')
  resetFocusState('phone')
}

const resetValueForm = () => {
  resetValueState('fullname')
  resetValueState('email')
  resetValueState('phone')
}
const validFields = (fields: HTMLInputElement[]) => {
  let valid = true
  fields.forEach((field) => {
    const isValid = field.validity.valid
    const fieldName = field.getAttribute('id') as keyof SurprizeForm
    if (!isValid) {
      form.value[fieldName].state = 'error'
      valid = false
    } else {
      form.value[fieldName].state = 'success'
    }
  })
  return valid
}

const onSubmit = (fields: HTMLInputElement[]) => {
  const valid = validFields(fields)
  if (valid) {
    emits('onSend', {
      fullname: form.value.fullname.value,
      phone: form.value.phone.value,
      email: form.value.email.value,
    })
    resetFocusForm()
    resetValueForm()
  }
}

const onToMain = () => router.push({ name: 'standby' })
</script>

<template>
  <Form :no-validate="true" @on-submit="onSubmit" class="form">
    <div class="fields">
      <div class="field">
        <label for="fullname">ФИО клиента</label>
        <Input
          id="fullname"
          v-model="form.fullname.value"
          :value="form.fullname.value"
          :state="form.fullname.state"
          :min-length="2"
          required
          type="text"
          placeholder="Иванов Иван Иванович"
          class="input"
          @click="onFocusField('fullname')"
          @on-mount="(element) => (form.fullname.ref = element)"
        />
        <Keyboard
          v-if="form.fullname.focus"
          @on-press="(key:string)=>onPressKey('fullname', key)"
          @on-backspace="onBackspace('fullname')"
        />
      </div>
      <div class="field">
        <label for="phone">Номер телефона</label>
        <Input
          id="phone"
          v-model="form.phone.value"
          :value="form.phone.value"
          :state="form.phone.state"
          :min-length="11"
          :max-length="11"
          required
          type="text"
          placeholder="+7 (999) 999 99-99"
          class="input"
          @click="onFocusField('phone')"
          @on-mount="(element) => (form.phone.ref = element)"
        />
        <Keyboard
          v-if="form.phone.focus"
          @on-press="(key:string)=>onPressKey('phone', key)"
          @on-backspace="onBackspace('phone')"
        />
      </div>
      <div class="field">
        <label for="email">Электронная почта</label>
        <Input
          id="email"
          v-model="form.email.value"
          :value="form.email.value"
          :state="form.email.state"
          :pattern="form.email.validReg"
          required
          type="text"
          placeholder="example@mail.ru"
          class="input"
          @click="onFocusField('email')"
          @on-mount="(element) => (form.email.ref = element)"
        />
        <Keyboard
          v-if="form.email.focus"
          @on-press="(key:string)=>onPressKey('email', key)"
          @on-backspace="onBackspace('email')"
        />
      </div>
    </div>
    <div class="actions">
      <Button
        type="button"
        background="primary"
        outline
        title="На главную"
        @on-click="onToMain"
      />
      <Button
        type="submit"
        background="primary"
        title="Отправить"
        :is-loading="isLoading"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  font-weight: 400;
  font-size: 40px;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.input {
  height: 97px;
}
</style>
