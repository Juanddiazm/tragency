import { Meteor } from 'meteor/meteor';
import Trip  from '../imports/api/Trip';
import Testimonial from '../imports/api/Testimonial'
import User from '../imports/api/User'

//El archivo del server es importante poner aqui las colecciones las cuales el publica si no, no funciona dado que es el que tiene los datos. 
Meteor.startup(() => {
  // code to run on server at startup
});
