<template>
  <div
    class="fixed top-0 bottom-0 right-0 left-0 bg-gray-500 bg-opacity-75 justify-center items-center flex px-[10px]">
    <div @click.stop class="bg-white rounded-lg	p-6 max-w-[800px] md:max-w-[670px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

import { useStore } from 'vuex';

const store = useStore();



</script>