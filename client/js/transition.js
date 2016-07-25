  Template.transition.helpers({
      players: function () {
        console.log(this.newId);
        return Players.find({gameID: this.newId});
      }
    });

 Template.transition.events({
 	'click #nextButton': function () {
      event.preventDefault();
      var array = Questions.find().fetch();
      var randomIndex = Math.floor( Math.random() * array.length);
      var id = Rounds.insert({
      	gameID: this.newId,
        createdAt: new Date(),
        questionID: array[randomIndex]._id,
        playersNotAns: Players.find({gameID: this.newId}).count()
      });
      Games.update(this._id, {
        $set: {
        	roundID: id,
        	scoreboardState: false
        }
      });
    Router.go('/question/' + this._id);
 }
});