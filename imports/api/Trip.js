
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default Trip = new Mongo.Collection('trip')


if (Meteor.isServer) {
    Meteor.publish('trip', () => {
        return Trip.find({});
    })
}

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
    }
})