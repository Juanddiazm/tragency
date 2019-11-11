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
  </v-container>
</template>

<script>
import Trip from "../api/Trip";

export default {
  methods: {
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