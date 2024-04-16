<template>
  <div>
    <div class="search-section">
      <h4 id="alert-message" v-if="errorMessage != ''">{{ errorMessage }}</h4>
      <label>
        <p class="label-text"></p>
        <input type="text" v-model="creatureIdOrName" placeholder="Nombre del pokemon">
        <button class="buscarbtn"  @click="validateInput()">Buscar</button>
        <div class="gif" >
          <img
            id="p"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkVp-Im9KlR_st0SvJv4Y9QRA4hA6QGpE35zWEF5vcw&s"
            alt="gif"
            v-if="borrarpokemon"
/>
        </div>
        
      </label>
    </div>
    <div class="content-container">
      <div class="info-container">
        <section v-if="creatureData" class="info-card">
          <h2 class="creature-name">{{ creatureData.name }}</h2>
          <p class="numero">Número: {{ creatureData.id }}</p>
          <p class="peso" >Peso: {{ creatureData.weight }}</p>

          <div class="cont_tipo">
 <ul class="type-list" v-if="creatureData">
            <h3 class="tipo">Tipo:</h3>
            <li v-for="(type, index) in creatureData.types" :key="index" :class="type.type.name">
              <div class="conttipo">
                <span>{{ type.type.name }}</span>              </div>
            </li>
          </ul>
          </div>
         

          <div class="stats-container">
            <h3 class="estadisticas">Estadísticas:</h3>
            <ul class="stats-list">
              <li v-for="(stat, index) in creatureData.stats" :key="index">
                <span class="tipo_result">{{ stat.stat.name }}:</span>
                <progress :value="stat.base_stat" max="255" ></progress>
                <span>{{ stat.base_stat }}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div class="image-container">
        <img v-if="creatureData && creatureData.sprites"
          :src="creatureData.sprites.other?.['official-artwork']?.front_default" :alt="creatureData.name">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

let creatureData = ref(null);
let creatureIdOrName = ref("");
let errorMessage = ref("");
let borrarpokemon = ref(true)

function validateInput() {
  borrarpokemon.value=false
  if (creatureIdOrName.value === "") {
    errorMessage.value = "Ingrese un identificador";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);

  } else {
    fetchCreatureData();
    creatureIdOrName.value = "";
  }
}

async function fetchCreatureData() {
  try {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${creatureIdOrName.value}`);
    creatureData.value = result.data;
    console.log(result.name);
    console.log(creatureData.value.name);
  } catch (error) {
    console.log(error);
    errorMessage.value = "Error al buscar la criatura.";
  }
}
</script>

<style>

* {
  margin: 0;
  font-family: 'Roboto', sans-serif;

}

#alert-message {
  text-align: center;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background-color: #e53935;
  color: white;
  margin-bottom: 15px;
}

.search-section {
  padding-top: 15px;
  text-align: center;
}

.label-text {
  font-size: 1.2rem;
  font-weight: 500;
}

input[type="text"] {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 8px;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #2f032d;
  color: white;
  cursor: pointer;
 
}


.content-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.info-container {
  flex: 1;
  padding-right: 20px;
}

.image-container {
  flex: 1;
  text-align: center;
}

.info-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 15px;
  background-image: linear-gradient(to bottom, #dad8f0, #9295e3,#dad8f0);
  margin-left: 20px;
  width: 80%;
}

.creature-name {
  text-align: center;
  font-size: 2.5rem;
  color: blue;
  font-weight: 700;
  font-family: 'Times New Roman';
}

.numero{
  text-align:center;
  font-size: 2.0rem;
  color: rgb(8, 84, 96);
  font-weight: 700;
  font-family: 'Times New Roman';
}
.peso{
  text-align:center;
  font-size: 2.0rem;
  color: rgb(5, 97, 39);
  font-weight: 700;
  font-family: 'Times New Roman';
}
.tipo{
  text-align: center;
  font-size: 2.0rem;
  color: rgb(65, 6, 70);
  font-weight: 700;
  font-family: 'Times New Roman';
  margin-right: 50px;

}

.estadisticas{
  text-align: center;
  font-size: 2.0rem;
  color: blue;
  font-weight: 700;
  font-family: 'Times New Roman';
}

.conttipo{
  text-align:center;
  font-size: 1.5rem;
  color: rgb(152, 25, 80);
  font-family: 'Times New Roman';
  margin-right: 50px;
  font-weight: 700;
}



.type-list {
  margin-top: 15px;
}


.type-list li {
  list-style: none;
  margin-bottom: 8px;
}



.stats-container {
  margin-top: 20px;
}

.stats-container  {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.stats-list {
  text-align: left;
}

.stats-list li {
  list-style: none;
  margin-bottom: 15px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.stats-list li span {
  width: 150px;
  font-weight: 500;
  color: rgb(47, 30, 200);
  font-family: 'Times New Roman';
}

.progress {
  flex-grow: 1;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 0 10px;
}

.gif{
  margin-top: 35px;
}

#p {
  height: 300px;
  width: 200px;
  border-radius:10%;
}

.buscarbtn{
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #e496eb;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;}


@media (max-width: 1000px) {
  .info-container {
    padding-right: 0;
  }

  .info-card {
    padding: 15px;
  }
}
</style>