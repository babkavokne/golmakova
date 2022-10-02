<template>
  <button 
    @click.prevent="log"
    :value="value"
    :class="[`font-medium px-4 py-2.5 inline-block rounded-md cursor-pointer text-white usm:max-w usm:w-full`]"
    >
    {{text}}
  </button>
</template>

<script setup>
const props = defineProps(['text', 'value']);
</script>

<style lang="sass" scoped>
</style>