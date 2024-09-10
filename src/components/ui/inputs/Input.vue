<script setup lang="ts">
import {onMounted, ref} from 'vue'

type IProps = {
  type: 'text' | 'number' | 'phone' | 'email' | 'password' | 'search'
  textPosition?: 'left' | 'center' | 'right'
  state?: 'default' | 'success' | 'error'
  minLength?: number
  maxLength?: number
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
}
type IEmits = {
  (eventName: 'update:modelValue', value: string): void
  (eventName: 'onChange', value: string | number): void
  (eventName: 'onInput', value: string | number): void
  (eventName: 'onMount', element: HTMLInputElement): void

}
const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()
const inputRef = ref<HTMLInputElement | null>(null)
const modelValue = ref(props.modelValue)

const onChange = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
  emits('update:modelValue', modelValue.value)
  emits('onChange', modelValue.value)
}

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
  emits('update:modelValue', modelValue.value)
  emits('onInput', modelValue.value)
}
onMounted(() => {
  if (inputRef.value) {
    console.log(inputRef.value)
    emits('onMount', inputRef.value)
  }
})
</script>

<template>
  <input
      ref="inputRef"
      v-model="modelValue"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input', textPosition, state]"
      :min-length="minLength"
      :max-length="maxLength"
      required
      @change="onChange"
      @input="onInput"
  />
</template>

<style scoped>
.input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding: 0 48px;
  border-radius: 16px;
  border: 2px solid transparent;
  font-size: 32px;
  background-color: #F6F6F6;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:disabled {
    background-color: #fff;
    opacity: 0.5;
  }


  &:focus {
    background-color: #fff;
    transition: var(--animation-time) all ease-in-out;
    border-color: var(--thrid-color);
    outline: none;
  }

  &::placeholder {
    font-size: 32px;
  }
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.left {
  text-align: start;
}

.center {
  text-align: center;
}

.right {
  text-align: end;
}
</style>
