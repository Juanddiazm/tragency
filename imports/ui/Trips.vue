<template>
  <v-container class="grey lighten-5">
    <v-row max-width="window.screen.width">
      <v-col v-for="item in trip" :key="item.city" align="center" justify="center">
        <v-card min-width="310" max-width="310" align="left">
          <v-img :src="item.photo" max-width="300"></v-img>
          <div class="title" v-text="item.city+', '+item.country"></div>
          <v-icon>fas fa-calendar-alt</v-icon>
          <div class="body-1" v-text="formatDate(item.departure)+' - '+formatDate(item.arrival)"></div>
          <v-icon>fas fa-dollar-sign</v-icon>
          <div class="body-1" v-text="item.price"></div>
          <div class="body-1" v-text="item.description"></div>
        </v-card>
      </v-col>
    </v-row>

    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="city" :rules="cityRules" label="City" required></v-text-field>

          <v-text-field v-model="country" :rules="countryRules" label="Country" required></v-text-field>

          <v-text-field v-model="arrival" :rules="arrivalRules" label="Arrival mm/dd/yyyy" required></v-text-field>

          <v-text-field
            v-model="departure"
            :rules="departureRules"
            label="Departure mm/dd/yyyy"
            required
          ></v-text-field>

          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>

          <v-text-field v-model="price" :rules="priceRules" label="Price" required></v-text-field>

          <!-- <v-text-field v-model="dependency" label="Dependency" required></v-text-field> -->

          <v-btn :disabled="!valid" color="success" @click="validate">Register Trip</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Trip from "../api/Trip";
import Faker from "faker/locale/es";

export default {
  data: () => ({
    valid: true,
    city: "",
    cityRules: [v => !!v || "City is required"],
    country: "",
    countryRules: [v => !!v || "Country is required"],
    departure: "",
    //
    departureRules: [
      v =>
        /((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})/.test(
          v
        ) || "Date must be valid",
      v => !!v || "Departure is required"
    ],
    arrival: "",
    //
    arrivalRules: [
      v =>
        /((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})/.test(
          v
        ) || "Date must be valid",
      v => !!v || "Arrival is required"
    ],
    description: "",
    descriptionRules: [v => !!v || "Description is required"],
    price: "",
    priceRules: [
      v => !!v || "Price is required",
      v => /[0-9]/.test(v) || "Price must be valid"
    ]
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
      const trip = {
        city: this.city,
        country: this.country,
        photo: Faker.image.city(),
        departure: this.departure,
        arrival: this.arrival,
        description: this.description,
        price: this.price
      };
      console.log(trip);
      Meteor.call("trip.add", trip);
    },
    reset() {
      this.$refs.form.reset();
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
  },
  meteor: {
    $subscribe: {
      trip: []
    },
    trip() {
      return Trip.find({}, { limit: 10, sort: { date: -1 } });
    }
  }
};
</script>

<style>
</style>