<template>
  <div class="relative">
    <p class="text-gray-700"></p> {{label}}{{required ? "*" : ""}}
    <p v-if="invalid && required" class="absolute bottom-[-15px] md:top-[0] right-0 text-red-500 text-xs">Обязательное
      поле</p>
    <header @click="optionsToggle"
      class="relative py-[9px] px-[13px] mt-[4px] rounded-md border border-gray-300 text-gray-900 cursor-pointer">
      {{selected}}
      <img src="../assets/drop-arrow.svg" alt="drop-arrow"
        :class="['absolute right-[13px] top-[50%] -translate-y-2/4 transition-all duration-300', areOptionsVisible ? 'rotate-180' : '']">
    </header>
    <main v-if="areOptionsVisible"
      class="absolute top-[70px] rounded-md border border-gray-300 bg-white cursor-pointer w-full">
      <div @click="selectOption(option)" v-for="option in options" :key="option.name"
        class="hover:bg-gray-200 py-[4px] px-[13px]">{{option.name}}</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  invalid: Boolean,
  label: String,
  required: String,
  options: Array,
  selected: Object,
  name: String
});

onMounted(() => selectOption(props.selected));

const emit = defineEmits(["selected"]);

const selected = ref(props.selected);
const areOptionsVisible = ref(false);

function selectOption(option) {
  selected.value = option.name;
  emit("selected", option);
  areOptionsVisible.value = false;
}

function optionsToggle() {
  areOptionsVisible.value = !areOptionsVisible.value;
}

</script>