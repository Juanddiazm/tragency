<template>
  <v-container class="grey lighten-5">
    <v-row max-width="window.screen.width">
      <v-col v-for="item in trip" :key="item.city" align="left" justify="center">
        <v-card min-width="310" max-width="360">
          <v-img class="align-end" :src="item.photo"></v-img>
          <v-card-title>
            <div class="title" v-text="item.city+', '+item.country"></div>
          </v-card-title>
          <v-card-title>
            <v-icon>fas fa-calendar-alt</v-icon>
            <div class="body-1" v-text="formatDate(item.departure)+' - '+formatDate(item.arrival)"></div>
          </v-card-title>
          <v-card-title>
            <v-icon>fas fa-dollar-sign</v-icon>
            <div class="body-1" v-text="item.price"></div>
          </v-card-title>
          <v-card-text>
            <div class="body-1" v-text="item.description"></div>
          </v-card-text>
          <v-btn v-if="currentUserIsAdmin" color="primary" @click="editProcess(item)">Edit</v-btn>
          <v-btn v-if="currentUserIsAdmin" color="error" @click="deleteTrip(item)">Delete</v-btn>

          <v-btn v-if="(user) && !currentUserIsAdmin" color="primary" @click="buy(item)">Buy</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-layout row wrap v-if="currentUserIsAdmin">
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="city" :rules="cityRules" label="City" required></v-text-field>

          <v-text-field v-model="country" :rules="countryRules" label="Country" required></v-text-field>

          <v-text-field v-model="photo" :rules="photoRules" label="URL Photo" required></v-text-field>

          <v-text-field
            v-model="departure"
            :rules="departureRules"
            label="Departure mm/dd/yyyy"
            required
          ></v-text-field>

          <v-text-field v-model="arrival" :rules="arrivalRules" label="Arrival mm/dd/yyyy" required></v-text-field>

          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>

          <v-text-field v-model="price" :rules="priceRules" label="Price" required></v-text-field>

          <!-- <v-text-field v-model="dependency" label="Dependency" required></v-text-field> -->

          <v-btn v-if="!editing" :disabled="!valid" color="success" @click="validate">Register Trip</v-btn>
          <v-btn v-else :disabled="!valid" color="success" @click="editTrip">Edit Trip</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import { router } from "../router";
import Trip from "../api/Trip";
//Faker para probar con datos aunque falsos 
import Faker from "faker/locale/es";
//Pagina de los viajes 
export default {
  computed: {
    //Retorna si hay un usuario logueado 
    user() {
      if (this.$store.state.user != false) {
        return true;
      } else {
        return false;
      }
    },
    //Retorna si el usario actual es administrador si no retorna falso 
    currentUserIsAdmin() {
      if (this.$store.state.user === false) {
        return false;
      } else {
        return this.$store.state.user.isAdmin;
      }
    }
  },
  data: () => ({
    tripInEditingProcess: null,
    editing: false,
    valid: true,
    city: "",
    cityRules: [v => !!v || "City is required"],
    country: "",
    countryRules: [v => !!v || "Country is required"],
    departure: "",
    //
    photo: "",
    photoRules: [v => !!v || "Photo URL is required"],
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
    deleteTrip(item) {
       Meteor.call("trip.delete", item);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.register();
      }
    },
    register() {
      const trip = {
        city: this.city,
        country: this.country,
        // photo: Faker.image.city(),
        photo: this.photo,
        departure: this.departure,
        arrival: this.arrival,
        description: this.description,
        price: this.price
      };
      Meteor.call("trip.add", trip);
      this.reset();
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
    },
    editProcess(item) {
      this.tripInEditingProcess = item;
      this.editing = true;
      this.city = item.city;
      this.country = item.country;
      this.photo = item.photo;
      this.departure = item.departure;
      this.arrival = item.arrival;
      this.description = item.description;
      this.price = item.price;
    },
    editTrip() {
      let trip = {
        _id: this.tripInEditingProcess._id,
        city: this.city,
        country: this.country,
        photo: this.photo,
        departure: this.departure,
        arrival: this.arrival,
        description: this.description,
        price: this.price
      };
      this.editing = false;
      Meteor.call("trip.edit", trip);
      this.reset();
    },
    buy(item) {
      this.$store.commit("updateItemTrip", item);
      router.push("buyTrip");
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