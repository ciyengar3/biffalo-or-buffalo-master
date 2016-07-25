    Template.player.helpers({
        randoNum: function() {
        var randoNum = Math.round(Math.random()); 
        if (randoNum == 0) {
          randoNum = false;
          return randoNum;
        } else {
          randoNum = true;
          return randoNum;
        }
      },

        randoNum2: function() {
        var randoNum2 = Math.round(Math.random()); 
        if (randoNum2 == 0) {
          randoNum2 = false;
          return randoNum2;
        } else {
          randoNum2 = true;
          return randoNum2;
        }
      },

      fillInTheBlank: function() {
        if (this.questionType === "multipleChoice") {
          return false;
        } else {
          return true;
        }
      }
    });

  Template.player.events({
  'click .right.button': function () {
      Session.set("answer", $(event.target).hasClass("right"));
      // Updating score
      var scoreNew = Players.find({pID: Meteor.user()._id}).fetch()[0].score;
      if (isNaN(scoreNew)) { scoreNew = 15; }
      else { scoreNew += 15; }
      Players.update(Players.find({pID: Meteor.user()._id}).fetch()[0]._id, {
        $set: {
          score: scoreNew
        }
      })
      // No more clicking
      $('.button').removeClass("button");
      $(event.target).addClass("selectedChoice");
      // Decerement number of players who need to answer
      var newNotAns = Rounds.find(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID).fetch()[0].playersNotAns;
      newNotAns--;
      Rounds.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID, {
        $set: {
          playersNotAns: newNotAns
        }
      })
      if (newNotAns == 0) {
        Games.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0]._id, {
          $set: {
            scoreboardState: true
          }
        });
      }
    },
    'click .wrong.button': function () {
      Session.set("answer", $(event.target).hasClass("right"));
      $('.button').removeClass("button");
      $(event.target).addClass("selectedChoice");
      var newNotAns = Rounds.find(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID).fetch()[0].playersNotAns;
      newNotAns--;
      Rounds.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID, {
        $set: {
          playersNotAns: newNotAns
        }
      })
      console.log(newNotAns == 0);
      if (newNotAns == 0) {
        Games.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0]._id, {
          $set: {
            scoreboardState: true
          }
        });
      }
      console.log("GENERAL ANSEWR FINISHD");
    },
    "submit #question-answer": function (event) {
      event.preventDefault();
      $('#question-answer input').prop("readonly", true);
      console.log(this.rightAnswer.toLowerCase());
      if ($('#question-answer input').val().toLowerCase() === this.rightAnswer.toLowerCase()) {
        Session.set("answer", true);
        var scoreNew = Players.find({pID: Meteor.user()._id}).fetch()[0].score;
        if (isNaN(scoreNew)) { scoreNew = 15; }
        else { scoreNew += 15; }
        Players.update(Players.find({pID: Meteor.user()._id}).fetch()[0]._id, {
          $set: {
            score: scoreNew
          }
        })
      } else {
        Session.set("answer", false);
      }
      // Decerement number of players who need to answer
      var newNotAns = Rounds.find(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID).fetch()[0].playersNotAns;
      newNotAns--;
      Rounds.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0].roundID, {
        $set: {
          playersNotAns: newNotAns
        }
      })
      if (newNotAns == 0) {
        Games.update(Games.find({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).fetch()[0]._id, {
          $set: {
            scoreboardState: true
          }
        });
      }      
    }

  });
