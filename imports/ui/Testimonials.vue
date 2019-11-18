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
          <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="description" :rules="descriptionRules" label="Comment" required></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validate">Register Trip</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import Testimonial from "../api/Testimonial";
export default {
  computed: {
    // ...mapState({
    //   admin: state => state.admin
    // })
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
    nameRules: [v => !!v || "Name is required"],
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
    register() {
      //  let ran = Math.ceil(Math.random() * 1000000);
      let testimonial = {
        description: this.description,
        name: this.name
      };
      Meteor.call("testimonial.add", testimonial);
      console.log(testimonial);
    },
    reset() {
      this.$refs.form.reset();
    },
    deleteTestimonial(item) {
      Meteor.call("testimonial.delete", item);
    }
  },
  meteor: {
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