
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default User = new Mongo.Collection('user')


if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find({});
    }),
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
    }
})

