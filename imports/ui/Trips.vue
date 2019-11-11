<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <template v-for="n in 9">
        <v-col :key="n">
          <v-card class="pa-2" outlined tile>
            <v-img :src=trip[n-1].photo max-width="300"></v-img>
            <div class="title" v-text="trip[n-1].city+', '+trip[n-1].country"></div>
            <v-icon>fas fa-calendar-alt</v-icon>
            <div
              class="body-1"
              v-text="formatDate(trip[n-1].departure)+' - '+formatDate(trip[n-1].arrival)"
            ></div>
            <v-icon>fas fa-dollar-sign</v-icon>
            <div class="body-1" v-text="trip[n-1].price"></div>
            <div class="body-1" v-text="trip[n-1].description"></div>
          </v-card>
        </v-col>
        <v-responsive v-if="n === 3 || n === 6 || n === 9" :key="`width-${n}`" width="100%"></v-responsive>
      </template>
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