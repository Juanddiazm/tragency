<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn tag="span" style="cursor: pointer" @click="$router.push('/home')">TRAVEL AGENCY</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <!-- navigation bar links -->
    <v-toolbar-items class="hidden-xs-only" v-if="!currentUser">
      <v-btn @click="$router.push('/aboutUs')">ABOUT US</v-btn>
      <v-btn @click="$router.push('/trips')">TRIPS</v-btn>
      <v-btn @click="$router.push('/testimonials')">TESTIMONIALS</v-btn>
      <v-btn v-for="item in items" :key="item.title" :to="item.link">{{item.title}}</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <!-- sign out button -->
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn @click="$router.push('/aboutUs')">ABOUT US</v-btn>
      <v-btn @click="$router.push('/trips')">TRIPS</v-btn>
      <v-btn @click="$router.push('/testimonials')">TESTIMONIALS</v-btn>
      <v-btn @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    items() {
      let menuItems = [
        {
          title: "Register",
          link: "/register"
        },
        {
          title: "Login",
          link: "/login"
        }
      ];
      return menuItems;
    },
    // user() {
    //   return window.localStorage.getItem("user");
    // }
    ...mapState({
          currentUser: state => state.user
        })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
</style>