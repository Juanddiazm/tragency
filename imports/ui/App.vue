<template>
  <v-app>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from "./NavBar";
import store from '../store'
//Desde aca se inicia todo lo de Vue
export default {
  name: "App",
  components: {
    NavBar
  }
 
};
</script>

<style>
</style>
