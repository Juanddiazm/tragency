<template>
  <v-col>
    <v-row align="center" justify="center">
      <v-img
        src="https://www.avianca.com/content/dam/avianca_new/destinos/semana/gig/1-porque-visitarla/destino-rio-de-janeiro-brazil-para-conocer-el-cerro-del-corcovado.jpg"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="window.screen.width"
        max-height="720"
      ></v-img>
    </v-row>
    <p class="display-1 text--primary" align="center">About Us</p>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="window.screen.width">
          <v-card-text>
            <div class="text--primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-img
          src="https://images.ctfassets.net/niwziy2l9cvz/4Ai0yNx1okqIysAwCO2My4/8e6697ca63fb89ea1ff3a8de691029d5/london-bigben-1500x850.jpg"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="window.screen.width"
          max-height="300"
        ></v-img>
      </v-col>
    </v-row>
    <p class="display-1 text--primary" align="center">Next Trips</p>
    <v-row max-width="window.screen.width">
     <!-- <v-btn @click="addTrip()">Add trip</v-btn> -->
      <v-col v-for="item in trip" :key="item.city" align="center" justify="center">
        <v-card max-width="310" align="left">
          <v-img :src="item.photo"  class="align-end"></v-img>
          <v-card-title>
          <div class="title" v-text="item.city+', '+item.country"></div>
          </v-card-title>
          <v-card-title>
          <v-icon class="pr-1" >fas fa-calendar-alt</v-icon>
          <div class="body-1" v-text="formatDate(item.departure)+' - '+formatDate(item.arrival)"></div>
          </v-card-title>
          <v-card-title>
          <v-icon class="pr-1">fas fa-dollar-sign</v-icon>
          <div class="body-1" v-text="item.price"></div>
          </v-card-title>
          <v-card-text>
          <div class="body-1" v-text="item.description"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <p class="display-1 text--primary" align="center">Testimonials</p>
   <!-- <v-btn @click="addTestimonial()">Add testimonial</v-btn> -->
    <v-row>
      <v-col v-for="item in testimonial" :key="item.name" align="center" justify="center">
        <v-card max-width="310" align="left">
          <v-icon class="pr-1">fas fa-quote-left</v-icon>
          <v-card-title>
          <div class="body-1" v-text='"\""+item.description+"\""'></div>
          </v-card-title>
          
          <div class="font-italic font-weight-bold pr-2" align="right" v-text="'-'+item.name"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
//Pagina de inicio 
//este Faker se uso para las pruebas genera datos falsos consultar la documentacion es sencillita
import Faker from "faker/locale/es";
import Trip from "../api/Trip";
import Testimonial from "../api/Testimonial";

export default {
  computed: {},
  methods: {
    addTrip() {
      let trip = {
        city: Faker.address.city(),
        country: Faker.address.country(),
        photo: Faker.image.city(),
        departure: Faker.date.future(),
        arrival: Faker.date.future(),
        description: Faker.lorem.paragraph(),
        price: Faker.commerce.price()
      };
      Meteor.call("trip.add", trip);
      console.log(trip);
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
    addTestimonial() {
      let testimonial = {
        description: Faker.lorem.paragraph(),
        name: Faker.name.findName()
      };
      Meteor.call("testimonial.add", testimonial);
      console.log(testimonial);
    }
  },
  //Esto permite suscribirse a los datos publicados por el server
  meteor: {
    $subscribe: {
      trip: [],
      testimonial: []
    },
    trip() {
      return Trip.find({}, { limit: 3, sort: { date: -1 } });
    },
    testimonial() {
      return Testimonial.find({}, { limit: 3, sort: { date: -1 } });
    }
  }
};
</script>

<style scoped>
.bg {
  background-image: url("imports/resources/img/superior.jpg");
  background-color: gray;
}
</style>