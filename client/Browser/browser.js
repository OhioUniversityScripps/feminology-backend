function autoResize(id){
    var newheight;
    var newwidth;

    if(document.getElementById){
        newheight=document.getElementById(id).contentWindow.document .body.scrollHeight;
        newwidth=document.getElementById(id).contentWindow.document .body.scrollWidth;
    }
    else {
    	console.log("Fail autoResize");
    }

    document.getElementById(id).height= (newheight) + "px";
    document.getElementById(id).width= (newwidth) + "px";
}

getCurrentBrowserIndex = function () {
    return Session.get('BrowserIndex');
}

getBrowserBackButtonPath = function (index) {
    stack = Session.get('BrowserStack');
    if (!stack) {
        return("");
    };
    return stack[index-1];
}

getBrowserForwButtonPath = function (index) {
    stack = Session.get('BrowserStack');
    if (!stack) {
        return("");
    };
    return stack[index-1];
}

AddBrowserBackButtonPath = function (path) {
    stack = Session.get('BrowserStack');
    if(!stack){
        stack = [];
        Session.set('BrowserStack',stack);
        Session.set('BrowserIndex',0);
    }

    if (getBackButtonPathTop() != path) {
        stack.push(path);
    };
    Session.set('BrowserStack',stack);
}

removeBrowserOneBackButtonPath = function () {
    stack = Session.get('BrowserStack');
    if (!stack) {return "";};
    var removedPath = stack.pop();
    Session.set('BrowserStack',stack);
}

clearBrowserBackButtonPath = function () {
    Session.set('BrowserStack',null);
}


showBrowserMeteor = function () {
    cordova.call('console.log', ['Hello world']);
    console.log("show browser(from Meteor)");
        cordova.alert("Show Browser", function() {
        // Alert is closed
    }, 'Greeting', 'Ok');
    cordova.call('app.showBrowser', ["http://www.facebook.com"]);
    // var ref = window.open("http://www.facebook.com","_blank","location=yes");
}






if (Meteor.isClient) {


    Template.backURLButton.events({
        'click .browserShow' : function(event) {
            showBrowserMeteor();
        }
    });

Template.browserHeader.showB = function () {
    showBrowserMeteor();
}



	Template.browserWindow.resize = function (pixels) {
		pixels+=32;
	  document.getElementById('frame').contentWindow.style.height=100+"px";
	  console.log("resize")
	}

    Template.browserWindow.created = function () {
        // Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    // Cordova is ready
    //
    function onDeviceReady() {
        // external url
        var ref = window.open(encodeURI('http://apache.org'), '_system', 'location=yes');
        // relative document
        ref = window.open('next.html', '_self');
    }
};