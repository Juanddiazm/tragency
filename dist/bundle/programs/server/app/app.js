var require = meteorInstall({"imports":{"api":{"Testimonial.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// imports/api/Testimonial.js                                                                //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
module.exportDefault(Testimonial = new Mongo.Collection('testimonial'));

if (Meteor.isServer) {
  Meteor.publish('testimonial', () => {
    return Testimonial.find({});
  });
}

Meteor.methods({
  'testimonial.add'(testimonial) {
    Testimonial.insert((0, _objectSpread2.default)({}, testimonial, {
      date: new Date()
    }));
  },

  'testimonial.delete'(testimonial) {
    Testimonial.remove({
      _id: testimonial._id
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////

},"Trip.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// imports/api/Trip.js                                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
module.exportDefault(Trip = new Mongo.Collection('trip'));

if (Meteor.isServer) {
  Meteor.publish('trip', () => {
    return Trip.find({});
  });
}

Meteor.methods({
  'trip.add'(trip) {
    Trip.insert((0, _objectSpread2.default)({}, trip, {
      date: new Date()
    }));
  },

  'trip.edit'(trip) {
    Trip.update({
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
    });
  },

  'trip.delete'(trip) {
    Trip.remove({
      _id: trip._id
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////

},"User.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// imports/api/User.js                                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
module.exportDefault(User = new Mongo.Collection('user'));

if (Meteor.isServer) {
  Meteor.publish('users', () => {
    return Meteor.users.find({});
  }), Meteor.publish('user', () => {
    return User.find({});
  });
}

Meteor.methods({
  'user.add'(user) {
    User.insert((0, _objectSpread2.default)({}, user, {
      date: new Date()
    }));
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// server/main.js                                                                            //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Trip;
module.link("../imports/api/Trip", {
  default(v) {
    Trip = v;
  }

}, 1);
let Testimonial;
module.link("../imports/api/Testimonial", {
  default(v) {
    Testimonial = v;
  }

}, 2);
let User;
module.link("../imports/api/User", {
  default(v) {
    User = v;
  }

}, 3);
Meteor.startup(() => {// code to run on server at startup
});
///////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".vue"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvVGVzdGltb25pYWwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1RyaXAuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1VzZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIk1vbmdvIiwibW9kdWxlIiwibGluayIsInYiLCJNZXRlb3IiLCJleHBvcnREZWZhdWx0IiwiVGVzdGltb25pYWwiLCJDb2xsZWN0aW9uIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwiZmluZCIsIm1ldGhvZHMiLCJ0ZXN0aW1vbmlhbCIsImluc2VydCIsImRhdGUiLCJEYXRlIiwicmVtb3ZlIiwiX2lkIiwiVHJpcCIsInRyaXAiLCJ1cGRhdGUiLCIkc2V0IiwiY2l0eSIsImNvdW50cnkiLCJwaG90byIsImRlcGFydHVyZSIsImFycml2YWwiLCJkZXNjcmlwdGlvbiIsInByaWNlIiwiVXNlciIsInVzZXJzIiwidXNlciIsImRlZmF1bHQiLCJzdGFydHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFKO0FBQVVDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0YsT0FBSyxDQUFDRyxDQUFELEVBQUc7QUFBQ0gsU0FBSyxHQUFDRyxDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBQWtELElBQUlDLE1BQUo7QUFBV0gsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRSxRQUFNLENBQUNELENBQUQsRUFBRztBQUFDQyxVQUFNLEdBQUNELENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBdkVGLE1BQU0sQ0FBQ0ksYUFBUCxDQUdlQyxXQUFXLEdBQUcsSUFBSU4sS0FBSyxDQUFDTyxVQUFWLENBQXFCLGFBQXJCLENBSDdCOztBQUtBLElBQUlILE1BQU0sQ0FBQ0ksUUFB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LENBQVkscUJBQVosRUFBa0M7QUFBQzhCLFNBQU8sQ0FBQzdCLENBQUQsRUFBRztBQUFDMEIsUUFBSSxHQUFDMUIsQ0FBTDtBQUFPOztBQUFuQixDQUFsQyxFQUF1RCxDQUF2RDtBQUtwT0MsTUFBTSxDQUFDNkIsT0FBUCxDQUFlLE1BQU0sQ0FDbkI7QUFDRCxDQUZELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJ1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcidcblxuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25pYWwgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndGVzdGltb25pYWwnKVxuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLnB1Ymxpc2goJ3Rlc3RpbW9uaWFsJywgKCkgPT4ge1xuICAgICAgICByZXR1cm4gVGVzdGltb25pYWwuZmluZCh7fSk7XG4gICAgfSlcbn1cblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAgICd0ZXN0aW1vbmlhbC5hZGQnKHRlc3RpbW9uaWFsKSB7XG4gICAgICAgIFRlc3RpbW9uaWFsLmluc2VydCh7XG4gICAgICAgICAgICAuLi50ZXN0aW1vbmlhbCxcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgfSlcbiAgICB9LFxuICAgICd0ZXN0aW1vbmlhbC5kZWxldGUnKHRlc3RpbW9uaWFsKSB7XG4gICAgICAgIFRlc3RpbW9uaWFsLnJlbW92ZSh7IFxuICAgICAgICAgICAgX2lkOiB0ZXN0aW1vbmlhbC5faWQgXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBcbn0pIiwiXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbydcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InXG5cbmV4cG9ydCBkZWZhdWx0IFRyaXAgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndHJpcCcpXG5cblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIE1ldGVvci5wdWJsaXNoKCd0cmlwJywgKCkgPT4ge1xuICAgICAgICByZXR1cm4gVHJpcC5maW5kKHt9KTtcbiAgICB9KVxufVxuXG5NZXRlb3IubWV0aG9kcyh7XG4gICAgJ3RyaXAuYWRkJyh0cmlwKSB7XG4gICAgICAgIFRyaXAuaW5zZXJ0KHtcbiAgICAgICAgICAgIC4uLnRyaXAsXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAndHJpcC5lZGl0Jyh0cmlwKSB7XG4gICAgICAgIFRyaXAudXBkYXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9pZDogdHJpcC5faWRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICBjaXR5OiB0cmlwLmNpdHksXG4gICAgICAgICAgICAgICAgY291bnRyeTogdHJpcC5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIHBob3RvOiB0cmlwLnBob3RvLFxuICAgICAgICAgICAgICAgIGRlcGFydHVyZTogdHJpcC5kZXBhcnR1cmUsXG4gICAgICAgICAgICAgICAgYXJyaXZhbDogdHJpcC5hcnJpdmFsLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0cmlwLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHByaWNlOiB0cmlwLnByaWNlLFxuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICAndHJpcC5kZWxldGUnKHRyaXApIHtcbiAgICAgICAgVHJpcC5yZW1vdmUoeyBcbiAgICAgICAgICAgIF9pZDogdHJpcC5faWQgXG4gICAgICAgIH0pXG4gICAgfSxcbn0pIiwiXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbydcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXIgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndXNlcicpXG5cblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIE1ldGVvci5wdWJsaXNoKCd1c2VycycsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE1ldGVvci51c2Vycy5maW5kKHt9KTtcbiAgICB9KSxcbiAgICBNZXRlb3IucHVibGlzaCgndXNlcicsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZCh7fSk7XG4gICAgfSlcbn1cblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAgICd1c2VyLmFkZCcodXNlcikge1xuICAgICAgICBVc2VyLmluc2VydCh7XG4gICAgICAgICAgICAuLi51c2VyLFxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IFRyaXAgIGZyb20gJy4uL2ltcG9ydHMvYXBpL1RyaXAnO1xuaW1wb3J0IFRlc3RpbW9uaWFsIGZyb20gJy4uL2ltcG9ydHMvYXBpL1Rlc3RpbW9uaWFsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vaW1wb3J0cy9hcGkvVXNlcidcblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAvLyBjb2RlIHRvIHJ1biBvbiBzZXJ2ZXIgYXQgc3RhcnR1cFxufSk7XG4iXX0=
