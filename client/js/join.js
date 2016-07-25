  Template.login.events({
      'click #facebook-login': function(event) {
          Meteor.loginWithFacebook({
            requestPermissions: ['email', 'user_friends', 'user_location', 'user_status', 'user_hometown', 'user_likes', 'user_photos', 'user_birthday']
          }, function(err){
              if (err) {
                  throw new Meteor.Error("Facebook login failed");
              } else {
                Router.go('/join/');
              }
          });
      },
   
      'click #logout': function(event) {
          Meteor.logout(function(err){
              if (err) {
                  throw new Meteor.Error("Logout failed");
              }
          })
      }
  });

  Template.join.events({
      "submit #join-game": function (event) {
        event.preventDefault();
        var gameToJoin = Number(event.target.gameid.value);
        if (Games.findOne({newId: gameToJoin})) {
          if (Players.findOne({pID: Meteor.user()._id})) {
            var id = Players.findOne({pID: Meteor.user()._id})._id;
            Players.update(id, {
                    $set: {gameID: gameToJoin, score : 0}
                  });
          } else {
            Players.insert({
                    pID: Meteor.user()._id,
                    gameID: gameToJoin,
                    name: Meteor.user().profile.name,
                    createdAt: new Date(), // current time
                    score : 0,
                    profilePic: "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large"
                  });            
          }
          // Meteor.call("addLocationQuestions", Meteor.user().services.facebook.accessToken);
          var myPhotoPlaces = FacebookCollections.getPhotos("me",["place"],100);
          console.log(myPhotoPlaces.find().fetch().length);
          function createPhotoLocationQuestions() {
            console.log(myPhotoPlaces.find().fetch().length);
            for (var i = 0; i < myPhotoPlaces.find().fetch().length; i++) {
              if (myPhotoPlaces.find().fetch()[i].place != undefined) {
                console.log(myPhotoPlaces.find().fetch()[i].place);
                var largerPic = "https://graph.facebook.com/" + myPhotoPlaces.find().fetch()[i].id + "/picture?type=normal&access_token=" + Meteor.user().services.facebook.accessToken;
                Questions.insert({
                  question: "Name the location!",
                  imageURL: largerPic,
                  questionType: "photoLocation",
                  rightAnswer: myPhotoPlaces.find().fetch()[i].place.name
                });
              }
            }
            Router.go('/joined/' + gameToJoin);
          }
          setTimeout(createPhotoLocationQuestions, 500);
        } else {
          console.log("error");
        }
      }
    });

  Template.join.helpers({
      profilePic: function() {
        return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
      }
  });