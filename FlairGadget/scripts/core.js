//---------------------------------------------------
// Copyright © Magnus Johansson
// http://www.InsomniacGeek.com
//---------------------------------------------------

//---------------------------------------------------
// Things to do when document is rendered complete
//---------------------------------------------------
document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    System.Gadget.settingsUI = "Settings.html";
    System.Gadget.onSettingsClosed = settingsClosed;
  }
}

//---------------------------------------------------
// Settings page closed event
//---------------------------------------------------
function settingsClosed(event) {
  if (event.closeAction == event.Action.commit) {
    // $("#background").fadeOut("slow", function() {
    GetFlair();
    // });
  }
}

//---------------------------------------------------
// Call the JSON page for getting the actual flair 
//---------------------------------------------------
function GetFlair() {

  // Get the User id from the saved setttings
  var userId = System.Gadget.Settings.read("userId");

  // Get the site from the saved settings
  var siteId = System.Gadget.Settings.read("siteId");

  // Show the init help text and bail out if no user id was found
  if (userId == "") {
    $("#background").css("visibility", "hidden");
    $("#firstpage").fadeIn("slow");
    return;
  }
  else {
    $("#firstpage").fadeOut("slow");

    // Set the correct site logo
    if (siteId.indexOf("serverfault") > 1) {
      $("#logo").css("background-image", "url('images/ServerFaultSmallLogo.png')");
    }
    else if (siteId.indexOf("superuser") > 1) {
      $("#logo").css("background-image", "url('images/SuperUserSmallLogo.png')");
    }
    else if (siteId.indexOf("meta") > 1) {
      $("#logo").css("background-image", "url('images/MetaStackOverflowSmallLogo.png')");
    }
    else {
      $("#logo").css("background-image", "url('images/StackOverflowSmallLogo.png')");
    }

    // Build the JSON query URL
    $.getJSON(siteId + "/users/flair/" + userId + ".json?callback=?", flairCallback);

    $("#background").css("visibility", "visible");
    $("#background").fadeIn(1500, function() {

    });
  }

  // Poll the site every 20 minutes
  setTimeout("GetFlair()", 1000 * 1200); // 1000 * 1200 = 20min.
}

//--------------------------------------------
// Populate the page with the retrieved data
//--------------------------------------------
function flairCallback(data) {

  // Gravatar
  $("#gravatar").empty();
  $("#gravatar").append(data.gravatarHtml);

  // Reputation
  $("#reputation").empty();
  $("#reputation").append("Reputation: " + data.reputation);

  // Badges
  $("#badges").empty();
  $("#badges").append(data.badgeHtml);
  // $("#displayname").append(data.displayName);

  // Profiel home page URL
  $("#profileurl").empty();
  $("#profileurl").attr("href", data.profileUrl).append(data.displayName);
}

