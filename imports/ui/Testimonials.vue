<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col v-for="item in testimonial" :key="item.name" align="left" justify="center">
        <v-card min-width="310"  max-width="360" align="left">
          <v-icon>fas fa-quote-left</v-icon>
          <v-card-title>
          <div class="body-1" v-text='"\""+item.description+"\""'></div>
          </v-card-title>
          <!--   <div class="body-1" v-text='"\""+item.description+"\""'></div> -->
          <div class="font-italic font-weight-bold pr-2" align="right" v-text="'-'+item.name"></div>
          <v-btn v-if="currentUserIsAdmin" color="error" @click="deleteTestimonial(item)">Delete</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-layout v-if="this.$store.state.user && !currentUserIsAdmin" row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field> -->

          <v-text-field v-model="description" :rules="descriptionRules" label="Comment" required></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validate">Register Trip</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

//Pagina donde se publican los testimonios 
import Testimonial from "../api/Testimonial";
export default {
  computed: {

    currentUserIsAdmin() {
      if (this.$store.state.user === false) {
        return false;
      } else {
        return this.$store.state.user.isAdmin;
      }
    }
  },
  data: () => ({
    valid: true,
    name: "",
    description: "",
    descriptionRules: [v => !!v || "Comment is required"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.register();
      }
    },
    //Registra un testimonio
    register() {
      let testimonial = {
        description: this.description,
        name: this.$store.state.user.name + " "+ this.$store.state.user.lastName
      };
      Meteor.call("testimonial.add", testimonial);
      console.log(testimonial);
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    deleteTestimonial(item) {
      Meteor.call("testimonial.delete", item);
    }
  },
  meteor: {
    //Suscripcion a los datos 
    $subscribe: {
      testimonial: []
    },
    testimonial() {
      return Testimonial.find({}, { sort: { date: -1 } });
    }
  }
};
</script>

<style>
</style>