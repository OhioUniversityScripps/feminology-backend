if (Meteor.isClient) {
	Template.userName.helpers({
		user_name: function (user) {return displayName(user);}
	});

  Template.profilePosts.helpers({
	  posts: function (userId) {
    	return Posts.find({ownedBy: userId},{sort: {createdAt: -1}});
  	  }
  });

  Template.profileActivity.posts = function (userId) {
    var commentsWithThisPost = Comments.find({ownedBy: userId},{sort: {createdAt: -1}}).fetch();
    var commentIDs = [];
    for (var i = 0; i < commentsWithThisPost.length; i++) {
      commentIDs.push(commentsWithThisPost[i]._id);
    };
    return Posts.find({$or: [{ownedBy: userId},{comments: {$in:commentIDs}}]},{sort: {createdAt: -1}});
  }

  Template.editProfileLink.helpers({
	  isMyProfile: function (userId) {
    	return userId == whoami();
  	  }
  });

  Template.profile.helpers({
	  isMyProfile: function (userId) {
    	return userId == whoami();
  	  },
	  currentUsersIsInstructor: function () {
    	me = Meteor.user({});
    	if(me == null){
      		// not logged in
      		return false;
    	}
    	return me.profile.acedemics.role == "Instructor";
  	  }
  });

  Template.acedemics.helpers({
	  getAcedemic: function (userId) {
    	usersProfile = getProfileAtrributes(userId);
    	if(isUndefined(usersProfile)) return ("");
    	return buildStringFromHash(", ",usersProfile.acedemics,"role","school");
	  },
	  getAcedemicMajor: function (userId) {
    	usersProfile = getProfileAtrributes(userId);
    	if(isUndefined(usersProfile)) return ("");
    	return buildStringFromHash(", ",usersProfile.acedemics,"major","minor");
	  }
  });

  Template.bio.helpers({
	  getBio: function (userId) {
  	  	usersProfile = getProfileAtrributes(userId);
    	if(isUndefined(usersProfile)) return ("");
    	return usersProfile.bio;
  	  }
  });

  Template.interestedIn.helpers({
	  getInterests: function (userId) {
		  usersProfile = getProfileAtrributes(userId);
		  if(isUndefined(usersProfile)) return ("");
		  return buildStringFromArray(", ",usersProfile.interests);
  	  }
  });

  Template.genderAndSexuality.helpers({
	  getGender: function (userId) {
		usersProfile = getProfileAtrributes(userId);
    	if(isUndefined(usersProfile)) return ("");
    	return buildStringFromHash(", ",usersProfile.genderAndSexuality,"gender","sex");
  	  }
  });


  Template.profilePicture.getUrl = function (userId,ownedBy) {
    return getPicURLForUser(userId,ownedBy,false);
  }
  Template.profileBigPicture.getUrl = function (userId,ownedBy) {
    return getPicURLForUser(userId,ownedBy,true);
  }

  Template.profileBigPictureForUser.getUrl = function (userId) {
    return getPicURLForUser(userId,"",true);
  };

  Template.profilePicture.helpers({
		hasPicture: function (userId,ownedBy) {
	    return getPicURLForUser(userId,ownedBy,false) != "";
	  }
	});

	Template.tableViewProfilePic.helpers({
		hasPicture: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false) != "";
		},
		getUrl: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false);
		}
	});

  Template.getBigProfilePic.helpers({
	  hasPicture: function (userId, ownedBy) {return getPicURLForUser(userId, ownedBy, true) !== "";}
  });

  Template.getBigProfilePicForUser.helpers({
	hasPicture: function(userId) {return getPicURLForUser(userId,"",true) !== "";}
  });

  getPicURLForUser = function (userId,ownedBy,isBigPic) {
    userIdPicUrl = findPicIDWithUserId(userId,isBigPic);
    if(ownedBy!="")ownedByUserIdPicUrl = findPicIDWithUserId(ownedBy,isBigPic);
    if (userIdPicUrl != "") {
      return userIdPicUrl;
    }
    else if(ownedBy!=""){
      return ownedByUserIdPicUrl;
    };
    return "";
  }

  findPicIDWithUserId = function (userId,isBigPic) {
    FBUrl = getFBProfilePicUrl(userId,isBigPic);
    TwitterUrl = getTwitterProfilePicUrl(userId,isBigPic);
    if(FBUrl != ""){
      return FBUrl;
    }
    if(TwitterUrl != ""){
      return TwitterUrl;
    }
    return "";
  }


  getFBProfilePicUrl = function (userId,big) {
    try{
      username = Meteor.users.findOne(userId).services.facebook.username;
      url = "http://graph.facebook.com/"+username+"/picture"
      width = "100"
      height = "100"
      if(big){
        url += "?type=normal&width="+width+"&height="+height;
      }

      return url;
    }
    catch(e){
      return "";
    }
  }

  getTwitterProfilePicUrl = function (userId,big) {
    try{
      url = Meteor.users.findOne(userId).services.twitter.profile_image_url;
      if(big){
        url = url.replace("_normal","");
      }
      return url;
    }
    catch(e){
      return "";
    }
  }


  isUndefined = function (profile) {
    if (profile==undefined) {
      return true;
    };
    return false;
  }
};
