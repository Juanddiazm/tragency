
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default  Trip = new Mongo.Collection('trip')


if(Meteor.isServer ){
    Meteor.publish('trip' , () => {
        return Trip.find({});
    })
}

Meteor.methods({
    'trip.add'(trip){
        Trip.insert({
            ...trip, 
            date: new Date()
        })
    },
})