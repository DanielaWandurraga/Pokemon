import Login from "../components/Login.vue"
import BuscarPokemon from "../components/BuscarPokemon.vue"
import AdivinaPokemon from "../components/AdivinaPokemon.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes=[
{path:"/",component:Login},
{path:"/BuscarPokemon",component:BuscarPokemon},
{path:"/AdivinaPokemon",component:AdivinaPokemon},
]
export const router=createRouter({
history:createWebHashHistory(),
routes
})