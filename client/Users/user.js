/* global buildStringFromArray: true */
/* global buildStringFromHash: true */
/* global displayName: true */
/* global getProfileAtrributes: true */

displayName = function (userId) {
	var userArray = Meteor.users.find(userId).fetch();
	if (userArray.length === 0) {
		return 'Error!!';
	}
	var user = userArray[0];
	if (user.profile && user.profile.name){
		return user.profile.name;
	}
	if (user.emails[0].address) {
		return user.emails[0].address;
	}
	return user;
};

var setDefaultProfile = function () {
	Meteor.call('initUserProfile');
};

getProfileAtrributes = function (userId) {
	var userProfile = Meteor.users.findOne(userId).profile;

	if (!userProfile || userProfile === undefined) {
		setDefaultProfile();
	}
	return userProfile;
};

buildStringFromHash = function () {
	var args = Array.prototype.slice.call(arguments, 0);
	var split = args[0];
	var returnString = '';
	var hash = args[1];
	var currentString = '';
		try{
			for (var i = 2; i < args.length; i++) {
				currentString = hash[args[i]];
				if (currentString) {
					if (i < args.length && i !== 2) {
						returnString += split;
					}
					returnString += currentString;
				}
			}
		}
	catch(ex){
		//TODO: Handle error
		return returnString;
	}
	return returnString;
};

buildStringFromArray = function (split,args) {
	var returnString = '';
	try{
		for (var i = 0; i < args.length; i++) {
			returnString += args[i];
			if (i<args.length-1) {
				returnString += split;
			}
		}
	}
	catch(ex){
		//TODO: Handle error
		return returnString;
	}
	return returnString;
};
