<template>
  <div class="event-item">
    <i
      :class="icon"
      :style="`color: rgb(${color}); background-color: rgba(${color}, 0.1);`"
    ></i>
    <h4>{{ text }}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Event',
  props: {
    type: String,
    value: String,
  },
  data: () => ({
    icon: '',
    color: '',
    text: '',
  }),

  created() {
    switch (this.$props.type) {
      case 'login':
        this.icon = 'fa-solid fa-arrow-right-to-bracket';
        this.color = '1, 130, 57';
        this.text = `${this.$props.value} connected`;
        break;
      case 'logout':
        this.icon = 'fa-solid fa-arrow-right-from-bracket';
        this.color = '253, 34, 84';
        this.text = `${this.$props.value} disconnected`;
        break;
      case 'role-set':
        this.icon = 'fa-solid fa-user-gear';
        this.color = '85, 31, 255';
        // @ts-ignore
        const values = this.$props.value.split(',');
        this.text = `${values[0]}'s role: ${values[1]}`;
        break;
      case 'start':
        this.icon = 'fa-solid fa-rocket';
        this.color = '52, 103, 235';
        this.text = `Server started on ${this.$props.value}`;
        break;
      default:
        break;
    }
  },
});
</script>

<style scoped>
div.event-item {
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  width: 75%;
}

div.event-item > i {
  padding: 10px;
  border-radius: 16px;
  height: 20px;
  width: 20px;
}

div.event-item > h4 {
  padding: 5px;
  font-weight: normal;
  font-size: 16px;
}
</style>
