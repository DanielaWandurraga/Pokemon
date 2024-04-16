<template>
  <div class="login">
    <div class="contenido">
      <div class="buttons-container">
      <button class="button" @click="Buscar">Buscar Pokémon</button>
      <button class="button" @click="Adivinar">Adivinar Pokémon</button>
    </div>
      <div>
        <img
          src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/655226/tumblr_lodl4fWXtS1qluebuo1_500.0.gif"
          alt="gif" style="height: 300px; border-radius: 10px;"
        />
      </div>
      <h1 class="lett">Welcome to Pokemon's World</h1>
      <div class="text">
        
      </div>
      <p class="content">
        Explora un universo lleno de aventuras, amistad y emoción con Pokémon.
        Únete a entrenadores de todo el mundo mientras viajas a través de
        paisajes increíbles, capturas Pokémon únicos y desafías a otros en
        emocionantes batallas. ¡Prepárate para embarcarte en una experiencia
        inolvidable y conviértete en un Maestro Pokémon!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const currentImage = ref('');
const pokemonName = ref('');

const Buscar = () => {
  router.push('/BuscarPokemon');
}

const Adivinar = () => {
  router.push('/AdivinaPokemon');
}

onMounted(() => {
  loadInitialImage();
  setInterval(loadRandomImage, 3000); 
});

const loadInitialImage = async () => {
  await loadRandomImage();
}

const loadRandomImage = async () => {
  try {
    const randomId = Math.floor(Math.random() * 1024) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemonData = response.data;
    currentImage.value = pokemonData.sprites.other['official-artwork'].front_default;
    pokemonName.value = pokemonData.name;
  } catch (error) {
    console.log('Error al cargar la imagen:', error);
  }
}
</script>

<style>
body {
  width: 100%;
  /* background: linear-gradient(to top right, #a186ee 0%, #af5ee6 100%); */
  background-color: #111fdc;

}
.login {
  width: 100%;
  height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(../imagenes/fondo1.jpg) no-repeat;
  background-color: transparent;
  backdrop-filter: blur(55px);
  background-size:cover;
}
.contenido {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 50%;
  padding: 20px;
  height: auto;
  border-radius: 20px;
}
.lett {
  color: rgb(55, 10, 202);
  font-size: 50px;
}

.content {
  color: black;
  font-size: 25px;
  
}
.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.button {
  font-size: 20px;
  padding: 10px 20px;
  margin: 1rem;
  background-color: #111fdc;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #3360b3;
  color: #ffffff;
}
</style>