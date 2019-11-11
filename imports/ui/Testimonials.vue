<template>
    <v-row>
      <v-col v-for="item in testimonial" :key="item.name" align="center" justify="center">
        <v-card min-width="310" align="left">
          <v-icon>fas fa-quote-left</v-icon>
          <div class="body-1" v-text='"\""+item.description+"\""'></div>
          <div class="font-italic font-weight-bold" align="right" v-text="'-'+item.name"></div>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import Testimonial from "../api/Testimonial";
export default {
 meteor: {
    $subscribe: {
      testimonial: []
    },
    testimonial() {
      return Testimonial.find({}, { sort: { date: -1 } });
    }
  }
}
</script>

<style>

</style>