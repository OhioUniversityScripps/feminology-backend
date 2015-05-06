/* global buildStringFromArray */
/* global buildStringFromHash */
/* global displayName */
/* global findPicIDWithUserId: true */
/* global getPicURLForUser: true */
/* global getProfileAtrributes */
/* global getTwitterProfilePicUrl: true */

if (Meteor.isClient) {
	
	getTwitterProfilePicUrl = function (userId,big) {
		try {
			var url = Meteor.users.findOne(userId).services.twitter.profile_image_url;
			if(big){
				url = url.replace('_normal','');
			}
			return url;
		}	catch(e) {
			return '';
		}
	};

	findPicIDWithUserId = function (userId,isBigPic) {
		var TwitterUrl = getTwitterProfilePicUrl(userId,isBigPic);
		if(TwitterUrl !== ''){
			return TwitterUrl;
		}
		return '';
	};

	getPicURLForUser = function (userId,ownedBy,isBigPic) {
		var userIdPicUrl = findPicIDWithUserId(userId,isBigPic);
		var ownedByUserIdPicUrl;
		if(ownedBy !== '') {
			ownedByUserIdPicUrl = findPicIDWithUserId(ownedBy,isBigPic);
		}
		if (userIdPicUrl !== '') {
			return userIdPicUrl;
		}
		else if(ownedBy !== ''){
			return ownedByUserIdPicUrl;
		}
		return '';
	};

	Template.userName.helpers({
		user_name: function (user) {
			return displayName(user);
		}
	});

	Template.profilePosts.helpers({
		posts: function (userId) {
			return Posts.find({ownedBy: userId},{sort: {createdAt: -1}});
		}
	});

	Template.profileActivity.posts = function (userId) {
		var commentsWithThisPost = Comments.find({
			ownedBy: userId
		},{
			sort: {
				createdAt: -1
			}
		}).fetch();
		var commentIDs = [];
		for (var i = 0; i < commentsWithThisPost.length; i++) {
			commentIDs.push(commentsWithThisPost[i]._id);
		}
		return Posts.find({$or: [{
			ownedBy: userId
		},{
			comments: {
				$in:commentIDs
			}}]},{
				sort: {
					createdAt: -1
				}});
	};

	Template.editProfileLink.helpers({
		isMyProfile: function (userId) {
			return userId === Meteor.userId();
		}
	});

	Template.profile.helpers({
		isMyProfile: function (userId) {
			return userId === Meteor.userId();
		},
		currentUsersIsInstructor: function () {
			var me = Meteor.user({});
			if(me == null){
				// not logged in
				return false;
			}
			return me.profile.acedemics.role === 'Instructor';
		}
	});

	Template.acedemics.helpers({
		getAcedemic: function (userId) {
			var usersProfile = getProfileAtrributes(userId);
			if(usersProfile === undefined) return ('');
			return buildStringFromHash(', ',usersProfile.acedemics,'role','school');
		},
		getAcedemicMajor: function (userId) {
			var usersProfile = getProfileAtrributes(userId);
			if(usersProfile === undefined) return ('');
			return buildStringFromHash(', ',usersProfile.acedemics,'major','minor');
		}
	});

	Template.bio.helpers({
		getBio: function (userId) {
			var usersProfile = getProfileAtrributes(userId);
			if(usersProfile === undefined) return ('');
			return usersProfile.bio;
		}
	});

	Template.interestedIn.helpers({
		getInterests: function (userId) {
			var usersProfile = getProfileAtrributes(userId);
			if(usersProfile === undefined) return ('');
			return buildStringFromArray(', ',usersProfile.interests);
		}
	});

	Template.genderAndSexuality.helpers({
		getGender: function (userId) {
			var usersProfile = getProfileAtrributes(userId);
			if(usersProfile === undefined) return ('');
			return buildStringFromHash(
					', ',
					usersProfile.genderAndSexuality,
					'gender',
					'sex');
		}
	});

	Template.profilePicture.getUrl = function (userId,ownedBy) {
		return getPicURLForUser(userId,ownedBy,false);
	};

	Template.profileBigPicture.getUrl = function (userId,ownedBy) {
		return getPicURLForUser(userId,ownedBy,true);
	};

	Template.profileBigPictureForUser.getUrl = function (userId) {
		return getPicURLForUser(userId,'',true);
	};

	Template.profilePicture.helpers({
		hasPicture: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false) !== '';
		}
	});

	Template.tableViewProfilePic.helpers({
		hasPicture: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false) !== '';
		},
		getUrl: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false);
		}
	});

	Template.getBigProfilePic.helpers({
		hasPicture: function (userId, ownedBy) {
			return getPicURLForUser(userId, ownedBy, true) !== '';
		}
	});

	Template.getBigProfilePicForUser.helpers({
		hasPicture: function(userId) {
			return getPicURLForUser(userId,'',true) !== '';
		}
	});
}
