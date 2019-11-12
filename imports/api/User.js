
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default User = new Mongo.Collection('user')


if (Meteor.isServer) {
    Meteor.publish('user', () => {
        return User.find({});
    })
}

Meteor.methods({
    'user.add'(user) {
        User.insert({
            ...user,
            date: new Date()
        })
    },
})
