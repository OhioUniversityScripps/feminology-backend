'use strict';

if (Meteor.isClient || Meteor.isCordova) {
	Meteor.subscribe('allUserData');
	Meteor.startup(function() {
	});
}

var fixDateString = function (dateString) {
	var createdDate = moment(dateString);
	var Today = moment({hour: 0});
	var hoursDiff = Today.diff(createdDate,'hours');
	var daysDiff = Today.diff(createdDate,'days');
	if (hoursDiff <=0) {
		return moment(dateString).format('[Today at ]  h:mm a');
	}
	else if (hoursDiff <=24) {
		return moment(dateString).format('[Yesterday at ]  h:mm a');
	}
	else if (daysDiff<7) {
		return moment(dateString).format('dddd, MMMM Do h:mm a');
	}
	else if (moment(Today).isSame(createdDate,'year')) {
		return moment(dateString).format('MMMM Do h:mm a');
	}
	else{
		return moment(dateString).format('MMMM Do YYYY h:mm a');
	}
};

Template.statusFooter.helpers({
	me: function() { return Meteor.userId(); }
});

Template.statusFooterProfileActive.helpers({
	me: function() { return Meteor.userId(); }
});

Template.statusFooterFeedActive.helpers({
	me: function() { return Meteor.userId(); }
});

Template.displayDate.helpers({
	getFixedDate:function (date) {
		return fixDateString(date);
	}
});

Template.backButton.events({
	'click .backButton': function () {
		window.history.back();
	}
});

Template.profileHeader.helpers({
	isMyProfile: function(userId) {return userId === Meteor.userId(); }
});
