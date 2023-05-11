<template>
  <div id="container">
    <div id="login">
      <h1>Lunar Socket</h1>
      <h2>Please enter the API key below</h2>
      <input v-model="apiKey" type="password" placeholder="API key goes here" />
      <br />
      <button
        @click="go()"
        style="
          color: rgb(0, 183, 254);
          background-color: rgba(0, 183, 254, 0.1);
        "
      >
        <i class="fa-solid fa-rocket" style="color: rgb(0, 183, 254)"></i>
        Go
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { checkKeyAndProceed } from '../App.vue';

let go: () => Promise<void>;

export default defineComponent({
  name: 'Login',
  data: () => ({
    apiKey: '',
    keyListener: (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        go();
      }
    },
  }),

  methods: {
    async go() {
      if (!this.apiKey) return;
      await checkKeyAndProceed(this.apiKey);
    },
  },

  mounted() {
    go = this.go;
    window.addEventListener('keydown', this.keyListener);
  },

  unmounted() {
    window.removeEventListener('keydown', this.keyListener);
  },
});
</script>

<style scoped>
div#container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
}

div#login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
  animation: fadeIn 0.5s;
  text-align: center;
}

h1 {
  padding: 25px;
  font-size: 36px;
}

h2 {
  color: var(--color-dark-gray);
  font-weight: normal;
}

input {
  outline: none;
  border: none;
  background-color: rgba(0, 183, 254, 0.1);
  font-size: 14px;
  height: 50px;
  width: 85%;
  border-radius: 15px;
  text-align: center;
  margin: 25px 0 10px 0;
}

button {
  height: 50px;
  width: 85%;
  border-radius: 15px;
  outline: none;
  border: none;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 25px;
}

button:hover {
  transform: scale(1.05);
}

button > i {
  margin-right: 6px;
}

button.disabled {
  cursor: not-allowed;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
