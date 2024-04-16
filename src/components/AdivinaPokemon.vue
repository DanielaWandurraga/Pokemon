<template>
  <div>
    <div class="main-container">
      <div class="sub-container">
        <div class="action-section">
          <button class="random-button" @click="rotar()">Adivina el Pokémon</button>
          <button class="check-button" @click="comprobar()">Comprobar</button>
        </div>
        <div class="input-section">
          <label>
            <input type="text" v-model="creatureName" :disabled="guessed" placeholder="Escribe el nombre del Pokémon">
          </label>
        </div>
        <div class="type-section">
          <ul class="type-list" v-if="creatureData && creatureName === creatureData.name">
            <h3>Tipo:</h3>
            <li v-for="(type, index) in creatureData.types" :key="index" :class="type.type.name">
              <span>{{ type.type.name }}</span>
            </li>
          </ul>
        </div>
        <div class="image-section">
          <section v-if="creatureData" class="creature-image">
            <h2 class="creature-name" v-if="creatureName === creatureData.name">{{ creatureData.name }}</h2>
            <p>Peso: {{ creatureData.weight }}</p>
            <div class="image-wrapper">
              <img :src="creatureData.sprites.other?.['official-artwork']?.front_default" :alt="creatureData.name"
                   :class="{ 'creature-img': 1, 'colored-img': (creatureName === creatureData.name), 'darkened-img': (creatureName !== creatureData.name && !guessed) }">
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2';

let creatureData = ref(null);
let creatureName = ref("");
let guessed = ref(false);

rotar()

async function rotar() {
  try {
    const randomId = Math.floor(Math.random() * 1024) + 1;
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    creatureData.value = result.data;
    creatureName.value = "";
    guessed.value = false;
    console.log(creatureData.value.name);
  } catch (error) {
    console.log(error);
  }
}

function comprobar() {
  if (creatureName.value.toLowerCase() === creatureData.value.name.toLowerCase()) {
    correcto("¡Correcto!");
    guessed.value = true;
  } else {
    incorrecto("¡Fallaste!");
  }
}

function incorrecto(mensaje) {
  Swal.fire({
    width: 400,
    title: mensaje,
    color: "white",
    background: "rgba(189, 63, 29, 0.7)",

  });
}

function correcto(mensaje) {
  Swal.fire({
    width: 500,
    title: mensaje,
    color: "black",
    background: "rgb(21, 102, 139)",
    showConfirmButton: false,
    timer: 1900
  });
}
</script>



<style scoped>
.notification-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.notification {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h5 {
  font-size: 2rem;
  color: white;
  text-align: center;
}

.error-msg {
  color: #e53935;
}

.success-msg {
  color: #4caf50;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
}

.sub-container {
  text-align: center;
  padding: 10px;
  width: 80%;
}

.creature-img {
  filter: grayscale(100%);
}

.colored-img {
  filter: none;
}

.darkened-img {
  filter: brightness(0);
}

.input-section {
  margin-bottom: 2%;
}

.counter {
  font-size: 2rem;
  background-color: #500157;
  width: 25%;
  border-radius: 8px;
  margin: 0 auto;
  padding: 10px;
  color: white;
}

input {
  width: 60%;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.random-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #e496eb;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
}

.random-button:hover {
  background-color: #1976d2;
}



.input-label {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.creature-name{
color: white
}

.creature-image p {
  font-size: 1.2rem;
  padding-left: 5%;
  color:white
}

.image-wrapper {
  text-align: center;
  height: auto;
  display: block;
  transform: scale(1);
  margin-bottom: 0;
}

.type-section {
  margin-top: 10px;
}

.type-list {
  margin-top: 15px;
}

.type-list h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 500;
  color: white
}

.type-list li {
  list-style: none;
  margin-bottom: 8px;
}

.type-list li span {
  padding: 6px 10px;
  border-radius: 4px;
  background-color: #f5f7f6;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
}

.check-button{
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #e496eb;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
}

@media (max-width: 1000px) {
  .sub-container {
    width: 100%;
  }

  .image-wrapper {
    transform: scale(0.75);
  }
}

@media (max-width: 700px) {
  .image-wrapper {
    transform: scale(0.6);
  }

  .counter {
    font-size: 1.5rem;
  }
}
</style>