if (Meteor.isServer) {
  Meteor.methods({
    updateUserProfile: function(profile) {
      if (profile.name == "" || profile.name == null) {
        profile.name = Meteor.user().profile.name
      }
      console.log("Updated Profile for ", profile.name);
     return Meteor.users.update(Meteor.user(), {$set: {profile: profile}});
	  },

	  initUserProfile: function () {
		  profile = new Object;
		  profile.acedemics = {
		    school:"OU",
		    role:"student"
		  };
		  profile.name = "What's your name??";
		  profile.bio = " Add a bio!";

		  profile.genderAndSexuality = {
		    gender:"M",
		    sex:"Straight"
		  };

		  profile.interests = ["fun","Stuff"];
		  console.log("setting user profile: ",Meteor.userId())
	    return Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
   	}
	});
	
}