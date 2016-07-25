ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1493754110921338',
    secret: '8037f660a27096f2912f11e141debe2d'
});

Meteor.methods({
 addLocationQuestions: function (accessToken) { // make async call to grab the picture from facebook
    var result;
    result = Meteor.http.get("https://graph.facebook.com/me/photos", {
      params: {
        access_token: accessToken,
        fields: 'place'
      }
    });
    console.log("gi start");
    if(result.error) {
      throw result.error;
    }
    console.log("loop beg + " + result.data);
    // for (var i = 0; i < result.data.length; i++) {
    // 	console.log(result.data[i]);
    //     if (result.data[i].place) {
    //     	var largerPic = Meteor.http.get("https://graph.facebook.com/" + result.data[i].id, {
    //   			params: {
    //     			access_token: accessToken,
    //     			type: 'normal'
    //   			}
    // 		});
    // 		if(largerPic.error) {
    // 			throw largerPic.error;
    // 		}
	   //      Questions.insert({
	   //      	question: "Name the location!",
	   //      	imageURL: largerPic.data.url,
	   //      	rightAnswer: result.data[i].place
	   //      });
    //     }
    // }
    return result.data;
  }
});