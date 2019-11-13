import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default Testimonial = new Mongo.Collection('testimonial')

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