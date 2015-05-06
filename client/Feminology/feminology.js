if (Meteor.isClient || Meteor.isCordova) {
  Meteor.subscribe("allUserData");
   Meteor.startup(function() {
    AccountsEntry.config({
      logo: '/img/longLogo.png',                  // if set displays logo above sign-in options
      homeRoute: '/feed' ,                   // mandatory - path to redirect to after sign-out
      dashboardRoute: '/feed',      // mandatory - path to redirect to after successful sign-in
      showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
    });
});
};


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

truncateStringInclusive = function (s,n) {
	if (s) {
		var cut = s.indexOf(' ', n);
	} else {
		var cut = -1;
	}
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
}

Template.displayDate.helpers({
	getFixedDate:function (date) {
		return DateStringFixer(date);
	}
});

Template.statusFooter.helpers({
	me: function() {return whoami(); }
});

Template.backButton.events({
  'click .backButton': function (event) {
    window.history.back();
  }
});

Template.profileHeader.helpers({
	isMyProfile: function(userId) {return userId === whoami(); }
});
