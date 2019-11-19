import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

/**
 * Archivo donde se publica la colecion de testimonios y se definen metodos sobre dicha colección
 */
export default Testimonial = new Mongo.Collection('testimonial')

//Esto lo publica el servidor
if (Meteor.isServer) {
    Meteor.publish('testimonial', () => {
        return Testimonial.find({});
    })
}


Meteor.methods({
    'testimonial.add'(testimonial) {
        Testimonial.insert({
            ...testimonial,
            date: new Date()
        })
    },
    'testimonial.delete'(testimonial) {
        Testimonial.remove({ 
            _id: testimonial._id 
        })
    },
    
})