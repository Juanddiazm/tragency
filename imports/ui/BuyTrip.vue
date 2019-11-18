<template>
  <v-col align="center" justify="center">
    <v-card v-if="itemTrip" max-width="700" align="left">
      <v-img :src="itemTrip.photo" max-width="700"></v-img>
      <div class="title" v-text="itemTrip.city+', '+itemTrip.country"></div>
      <v-icon>fas fa-calendar-alt</v-icon>
      <div
        class="body-1"
        v-text="formatDate(itemTrip.departure)+' - '+formatDate(itemTrip.arrival)"
      ></div>
      <v-icon>fas fa-dollar-sign</v-icon>
      <div class="body-1" v-text="itemTrip.price"></div>
      <div class="body-1" v-text="itemTrip.description"></div>
      <v-form
        v-if="this.$store.state.user && !currentUserIsAdmin"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field v-model="creditCard" :rules="creditCardRules" label="Credit Card" required></v-text-field>
        <v-btn :disabled="!valid" color="primary" @click="buy()">Buy</v-btn>
       
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import jsPDF from "jspdf";
import { router } from "../router";
export default {
  data: () => ({
    valid: false,
    creditCard: "",
    creditCardRules: [v => !!v || "Credit Card is required"]
  }),
  computed: {
    itemTrip() {
      if (this.$store.state.itemTrip === null) {
        return false;
      } else {
        return this.$store.state.itemTrip;
      }
    },
    currentUserIsAdmin() {
      if (this.$store.state.user === false) {
        return false;
      } else {
        return this.$store.state.user.isAdmin;
      }
    },
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    buy() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        var doc = new jsPDF();
        doc.text("RECEIPT", 90, 20);
        doc.text(
          "ID_TRIP: " + this.currentUser._id + this.itemTrip._id,
          10,
          30
        );
        doc.text(
          "Client: " + this.currentUser.name + " " + this.currentUser.lastName,
          10,
          40
        );
        doc.text("Email: " + this.currentUser.email, 10, 50);
        doc.text(
          "Destination: " + this.itemTrip.city + ", " + this.itemTrip.country,
          10,
          60
        );
        doc.text("Departure: " + this.formatDate(this.itemTrip.departure), 10, 70);
        doc.text("Arrival: " + this.formatDate(this.itemTrip.arrival), 10, 80);

        doc.text("Price: " + this.itemTrip.price, 10, 90);
        doc.text(
          "Go to our offices to obtain tickets and information.",
          10,
          100
        );
        doc.text("THANKS FOR TRUSTING US.", 10, 110);

        doc.save("RECEIPT_TRIP.pdf");
        router.push('trips')        
      }
    }
  }
};
</script>

<style>
</style>