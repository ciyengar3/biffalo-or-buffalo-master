  	Template.question.helpers({
      	randoNum: function() {
      	var randoNum = Math.round(Math.random());
      	console.log(randoNum);
      	if (randoNum == 0) {
      		return false;
      	} else {
      		return true;
      	}
      	},

      	randoNum2: function() {
      	var randoNum2 = Math.round(Math.random()); 
      	console.log(randoNum2);
      	if (randoNum2 == 0) {
      		return false;
      	} else {
      		return true;
      	}
      }

    });
