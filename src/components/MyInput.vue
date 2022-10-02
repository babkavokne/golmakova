<template>
  <label class="relative text-gray-700" for="but"> {{label}}{{required ? '*' : ''}}
    <input ref="el" class="block mt-1 py-[9px] px-[13px] drop-shadow-sm border rounded-md border-gray-300 outline-none  placeholder:w-max-full	placeholder:text-gray-500
      max-w-full w-full" :type="type" id="but" :placeholder="placeholder" :name="name" />
    <p v-if="invalid && required" class="absolute bottom-[-15px] md:top-[0] right-0 text-red-500 text-xs">Обязательное
      поле</p>
  </label>
</template>

<script setup>
const props = defineProps(['invalid', 'label', 'type', 'required', 'placeholder', 'name']);

</script>

<style lang="scss" scoped>

</style>