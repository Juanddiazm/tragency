<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
          <v-btn :disabled="!valid" color="success" @click="validate">Login</v-btn>
          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//Pagina de login 
import User from "../api/User";

export default {
  //Suscribe a los datos publicados por el servidor 
  meteor: {
    $subscribe: {
      //Estos datos no los uso. Sin embargo tuve que hacer esto para cargar en el store de vuex todos los usuarios necesitaba usar la sintaxis de mongo
      user: []
    },
    user() {
      this.$store.commit(
        "updateUsers",
        User.find({}, { sort: { date: -1 } }).fetch()
      );
      return User.find({}, { sort: { date: -1 } });
    }
  },

  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.login();
      }
    },
    //Borra los datos del los text-field
    reset() {
      this.$refs.form.reset();
    },
    login() {
      const userC = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("submitLoginForm", userC);
    }
  }
};
</script>
