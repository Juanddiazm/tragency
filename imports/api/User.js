
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'




if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find({});
    });

}

