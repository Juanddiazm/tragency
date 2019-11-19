
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

/**
 * Archivo donde se publica la colecion de usuarios y se definen metodos sobre dicha colección
 */
export default User = new Mongo.Collection('user')

//El servidor publica la lista users que es la de Meteor que guarda informacion de la autenticacion y user que guarda todos los datos de los usuarios
if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find({});
    }),
        Meteor.publish('user', () => {
            return User.find({});
        })
}
//Metodo sobre la coleccion
Meteor.methods({
    'user.add'(user) {
        User.insert({
            ...user,
            date: new Date()
        })
    }
})

