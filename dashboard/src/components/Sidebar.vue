<template>
  <div id="container">
    <h1 id="title">Lunar Socket</h1>
    <div id="buttons">
      <div
        class="button"
        v-for="button in dashboardButtons"
        :class="button.selected ? 'selected' : ''"
        v-bind:key="button"
        @click="toggleSelect(button.text)"
      >
        <i :class="button.icon"></i>{{ button.text }}
      </div>
      <div class="separator"></div>
      <div
        class="button"
        v-for="button in adminButtons"
        v-bind:key="button"
        @click="adminAction(button.action)"
      >
        <i :class="button.icon"></i>{{ button.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

let toggleSelect: (newButton: string) => void;
export { toggleSelect };

export default defineComponent({
  name: 'Sidebar',
  data: () => ({
    dashboardButtons: [
      {
        icon: 'fa-solid fa-chart-line',
        text: 'Main',
        tab: 'Main',
        selected: false,
      },
      {
        icon: 'fa-solid fa-user',
        text: 'Players',
        tab: 'Players',
        selected: false,
      },
      {
        icon: 'fa-solid fa-newspaper',
        text: 'Logs',
        tab: 'Logs',
        selected: false,
      },
    ],
    adminButtons: [
      {
        icon: 'fa-solid fa-arrow-right-from-bracket',
        text: 'Logout',
        action: 'logout',
      },
    ],
  }),

  methods: {
    toggleSelect(newButton: string): void {
      for (const button of this.dashboardButtons) {
        button.selected = button.text === newButton;
        if (button.selected)
          // @ts-ignore
          this.$store.commit('setActiveTab', button.tab);
      }
    },
    adminAction(action: 'logout') {
      switch (action) {
        case 'logout':
          if (!confirm('Are you sure you wanna logout?')) return;
          localStorage.removeItem('apiKey');
          window.location.reload();
          break;

        default:
          break;
      }
    },
  },

  created() {
    toggleSelect = this.toggleSelect;
    this.toggleSelect(this.dashboardButtons[0].text);
  },
});
</script>

<style scoped>
div#container {
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0px 36px 36px 0px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
}

h1#title {
  margin: 55px auto 0 auto;
  font-size: 24px;
  line-height: 28px;
  color: var(--color-blue);
}

div#buttons {
  margin: 65px auto 0 auto;
}

div.button {
  color: var(--color-gray);
  cursor: pointer;
  width: 225px;
  height: 75px;
  text-align: center;
  border-radius: 100px;
  margin-bottom: 25px;
}

div.button > i {
  color: var(--color-gray);
  margin-right: 20px;
  margin-top: 24px;
}

div.button.selected {
  background-color: var(--color-light-gray);
  color: var(--color-blue);
}

div.button.selected > i {
  color: var(--color-blue);
}

div.separator {
  width: 225px;
  height: 1px;
  background-color: var(--color-gray);
  margin-bottom: 25px;
}
</style>
