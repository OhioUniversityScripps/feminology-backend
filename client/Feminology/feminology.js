// Meteor.absoluteUrl("", {rootUrl:"http://71.66.100.107"})

if (Meteor.isClient || Meteor.isCordova) {
  Meteor.subscribe("allUserData");
   Meteor.startup(function() {
    AccountsEntry.config({
      logo: '/img/longLogo.png',                  // if set displays logo above sign-in options
      // privacyUrl: '/privacy-policy',     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
      // termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
      homeRoute: '/feed' ,                   // mandatory - path to redirect to after sign-out
      dashboardRoute: '/feed',      // mandatory - path to redirect to after successful sign-in
      // passwordSignupFields: 'EMAIL_ONLY',
      // showSignupCode: true,
      showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
      // extraSignUpFields: [{             // Add extra signup fields on the signup page
      //   field: "name",                           // The database property you want to store the data in
      //   name: "This Will Be The Initial Value",  // An initial value for the field, if you want one
      //   label: "Full Name",                      // The html lable for the field
      //   placeholder: "John Doe",                 // A placeholder for the field
      //   type: "text",                            // The type of field you want
      //   required: true                           // Adds html 5 required property if true
      //  }]
    });
});
};

cordova = new Cordova({
  plugins: {
    notification: true, // More docs below in the native section
    // vibration: true, // only the vibration plugin
  }
});

Template.hello.helpers({
	deviceready: function(){
		console.log("deviceready: ", cordova.isReady());
		return cordova.isReady();
	},
});

Template.statusFooter.events({
	'click .femFeedButton' : function(event) {
		clearBackButtonPath();
	}
});

/*
Template.hello.deviceready = function() {
	console.log("deviceready: ", cordova.isReady());
	// cordova.vibrate(500);
	// cordova.alert("Hello", function() {
 //        // Alert is closed
 //    }, 'Greeting', 'Ok');

  return cordova.isReady();
 };
*/
whoami = function () {
	return Meteor.userId();
}

haveILikedThis = function (postID) {
	var post = Posts.findOne({_id:postID});
	if (!post) {
		return false;
	};

	likedBy = post.likedBy;
  me = whoami();
  if(_.contains(likedBy, me))
  	return true;
  return false
}


DateStringFixer = function (dateString) {
	createdDate = moment(dateString);
	Today = moment({hour: 0});
	hoursDiff = Today.diff(createdDate,'hours');
	daysDiff = Today.diff(createdDate,'days');
	if (hoursDiff <=0) {
		return moment(dateString).format('[Today at ]  h:mm a')
	}
	else if (hoursDiff <=24) {
		return moment(dateString).format('[Yesterday at ]  h:mm a')
	}
	else if (daysDiff<7) {
		return moment(dateString).format('dddd, MMMM Do h:mm a')
	}
	else if (moment(Today).isSame(createdDate,'year')) {
		return moment(dateString).format('MMMM Do h:mm a')
	}
	else{
		return moment(dateString).format('MMMM Do YYYY h:mm a')
	};
}



getBackButtonPathTop = function () {
	stack = Session.get('backButtonStack');
	if (!stack) {
		return("");
	};
	return stack[stack.length-1];
}

getBackButtonPath = function () {
	stack = Session.get('backButtonStack');
	if (!stack) {
		return("");
	};
	return stack[stack.length-2];
}

AddBackButtonPath = function (path) {
	stack = Session.get('backButtonStack');
	if(!stack){
		stack = ["/split","/feed"];
		Session.set('backButtonStack',stack);
	}

	if (getBackButtonPathTop() != path && path != "/login" &&path != "/sign-up" && path != "/sign-out") {
		stack.push(path);
	};
	Session.set('backButtonStack',stack);
}

removeOneBackButtonPath = function () {
	stack = Session.get('backButtonStack');
	if (!stack) {return "";};
	var removedPath = stack.pop();
	Session.set('backButtonStack',stack);
}

clearBackButtonPath = function () {
	Session.set('backButtonStack',null);
}

createMessageWithLinks = function (message) {
	return message.autoLink({ target: "_blank", rel: "nofollow", id: "1" });
}


truncateStringInclusive = function (s,n) {
	var cut = s.indexOf(' ', n);
  if(cut== -1) return s;
  return s.substring(0, cut)+"...";
}


truncateStringExclusive = function(s,n){
	if (s.length<=n) {
		return s;
	};
  return s.substr(0, Math.min(s.substr(0,n).length, s.lastIndexOf(" ")));
};

var shortenLength = 100; // shorten to 100 characters

ShortLinkMessage = function (message) {
	return truncateStringInclusive(message,shortenLength);
	// return createMessageWithLinks(truncateStringInclusive(message,shortenLength),postData);

}


Template.displayDate.helpers({
	getFixedDate:function (date) {
		return DateStringFixer(date);
	}
});

Template.statusFooter.helpers({
	me: function() {return whoami(); }
});

Template.backButton.helpers({
	getMyLink: function () {
		//remove link
		link = getBackButtonPath();
		if (!link || link=='/profile') {
			link = "/feed"
		};
		return link;
	}
});

Template.profileHeader.helpers({
	isMyProfile: function(userId) {return userId === whoami(); }
});


// Template.splash.rendered = function () {
// 	var seconds = 3;
// 	setTimeout(function(){Router.go('femFeed');},seconds*1000)
// }
