
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

/**
 * Archivo donde se publica la colecion de viajes y se definen metodos sobre dicha colección
 */
export default Trip = new Mongo.Collection('trip')

//El servidor publica los viajes
if (Meteor.isServer) {
    Meteor.publish('trip', () => {
        return Trip.find({});
    })
}
//Diferentes metodos sobre la coleccion
Meteor.methods({
    'trip.add'(trip) {
        Trip.insert({
            ...trip,
            date: new Date()
        })
    },
    'trip.edit'(trip) {
        Trip.update(
            {
                _id: trip._id
            }, {
            $set: {
                city: trip.city,
                country: trip.country,
                photo: trip.photo,
                departure: trip.departure,
                arrival: trip.arrival,
                description: trip.description,
                price: trip.price,
                date: new Date()
            }
        }
        )
    },
    'trip.delete'(trip) {
        Trip.remove({ 
            _id: trip._id 
        })
    },
})