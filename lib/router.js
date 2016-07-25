Router.configure({
  layoutTemplate: 'main'
});


Router.route('/', function () {
	this.render('landing');
});

Router.route('/game/:_id', function() {
	this.render('game', {
		data: function () {
			return Games.findOne({_id: this.params._id});
		}
	});
});

Router.route('/login/', function() {
	this.render('login');
});

Router.route('/join/', function() {
	user = Meteor.user();
    if (! user) {
       this.render('login');
    }
	this.render('join');
});

Router.route('/joined/:_id', function() {
	this.render('pregame', {
		data: function () {
			console.log(Games.findOne({newId: Number(this.params._id)}));
			if (Games.findOne({newId: Number(this.params._id)})) {
				if (Games.findOne({newId: Number(this.params._id)}).gameStarted) {
					var qID = Rounds.findOne({_id: Games.findOne({newId: Number(this.params._id)}).roundID}).questionID;
					this.redirect('/player/' + qID);					
				}
			}
			return Games.findOne({newId: Number(this.params._id)});
		}
	});
});

Router.route('/question/:_id', function() {
	this.render('question', {
		data: function () {
			if (Games.findOne(this.params._id)) {
				if (Games.findOne(this.params._id).scoreboardState) {
					this.redirect('/scoreboard/' + this.params._id);
				}
				return Questions.findOne({_id: Rounds.findOne(Games.findOne(this.params._id).roundID).questionID});				
			}
		}
	});
});

Router.route('/scoreboard/:_id', function() {
	this.render('transition', {
		data: function () {
			return Games.findOne(this.params._id);
		}
	});
});

Router.route('/status/', function() {
	if (Session.get("answer")) {
		this.render('winnerpage', {
			data: function() {
				if (Meteor.user()) {
					
					if (Games.findOne({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).scoreboardState) {
						return Players.findOne({pID: Meteor.user()._id});
					} else {
						var qID = Rounds.findOne({_id: Games.findOne({newId: Players.findOne({pID: Meteor.user()._id}).gameID}).roundID}).questionID;
						this.redirect('/player/' + qID);
					}
				}
			}
		});
	} else {
		this.render('loserpage', {
			data: function() {
				if (Meteor.user()) {
					if (Games.findOne({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).scoreboardState) {
						return Players.findOne({pID: Meteor.user()._id});
					} else {
						var qID = Rounds.findOne({_id: Games.findOne({newId: Players.findOne({pID: Meteor.user()._id}).gameID}).roundID}).questionID;
						this.redirect('/player/' + qID);
					}
				}
			}
		});
	}
});

Router.route('/player/:_id', function() {
	this.render('player', {
		data: function () {
			if (Meteor.user()){
				if (Games.findOne({newId: Players.find({pID: Meteor.user()._id}).fetch()[0].gameID}).scoreboardState) {
					this.redirect('/status/');
				}				
			}
			return Questions.findOne({_id: this.params._id});
		}
	});
});