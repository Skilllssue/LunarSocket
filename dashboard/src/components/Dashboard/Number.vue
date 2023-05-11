<template>
  <div
    class="number-item"
    :style="$props.disablefixedwidth ? '' : 'width: 200px;'"
  >
    <i
      :class="$props.icon"
      :style="`color: rgb(${$props.color}); background-color: rgba(${$props.color}, 0.1);`"
    ></i>
    <div class="number-text">
      <h3>{{ $props.name }}</h3>
      <h4>{{ $props.value }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Number',
  props: {
    icon: String,
    name: String,
    value: String,
    color: String,
    disablefixedwidth: Boolean,
  },
});
</script>

<style scoped>
div.number-item {
  display: flex;
  height: fit-content;
}

div.number-item > i {
  font-size: 20px;
  border-radius: 16px;
  padding: 21.5px;
}

div.number-text {
  margin-left: 15px;
}

div.number-text > h3 {
  margin-top: 8px;
  font-size: 16px;
  line-height: 19px;
  color: var(--color-dark-gray);
}

div.number-text > h4 {
  font-size: 20px;
  line-height: 23px;
  color: var(--color-black);
}
</style>
