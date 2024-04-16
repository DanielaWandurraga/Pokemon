<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-blue-5 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./imagenes/pokebola.png">
          </q-avatar>
          POKE-WORLD
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/BuscarPokemon" label="Busca Pokemon" />
        <q-route-tab to="/AdivinaPokemon" label="Adivina el Pokemon" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view> </router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftNavOpen = ref(false);

    const toggleLeftNav = () => {
      leftNavOpen.value = !leftNavOpen.value;
    };

    return {
      leftNavOpen,
      toggleLeftNav,
    };
  },
};
</script>

<style scoped>
footer {
  text-align: right;
  padding: 10px;
  background-color: #f8f8f8;
}

.bg-blue-5 {
  background-color: #1976d2;
}

.bg-grey-10 {
  background-color: #eeeeee;
}

.text-dark {
  color: #424242;
}

.text-white {
  color: white;
}
</style>