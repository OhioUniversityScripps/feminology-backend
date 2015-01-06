displayName = function (userId) {
  userArray = Meteor.users.find(userId).fetch();
  if (userArray.length==0) {
    return "Error!!";
  };
  user = userArray[0];
  if (user.profile && user.profile.name){
    return user.profile.name;
  };
  if (user.emails[0].address) {
    return user.emails[0].address;
  };
  return user;
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};


getProfileAtrributes = function (userId) {
  var userProfile = Meteor.users.findOne(userId).profile;

  if (!userProfile || userProfile == undefined) {
    console.log("user profile:",userProfile)
    setDefaultProfile()
  };
  return userProfile;
}

setDefaultProfile = function () {
  var result = Meteor.call("initUserProfile");
}

buildStringFromHash = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  var split = args[0];
  var returnString = "";
  var hash = args[1];
  var currentString = ""
  try{
    for (var i = 2; i < args.length; i++) {
      currentString = hash[args[i]];
      if (currentString) {
        if (i<args.length && i!=2) {
          returnString += split;
        };
        console.log(currentString);
        returnString += currentString;
      };
    }
  }
  catch(ex){
    console.log(ex.message);
    return returnString;
  };
  return returnString;
}

buildStringFromArray = function (split,args) {
  var returnString = "";
  try{
    for (var i = 0; i < args.length; i++) {
      returnString += args[i];
      if (i<args.length-1) {
        returnString += split;
      };
    };
  }
  catch(ex){
    console.log(ex.message);
    return returnString;
  }
  return returnString;
}
