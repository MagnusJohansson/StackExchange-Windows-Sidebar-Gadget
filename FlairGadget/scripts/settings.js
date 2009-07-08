//---------------------------------------------------
// Copyright © Magnus Johansson
// http://www.InsomniacGeek.com
//---------------------------------------------------

//---------------------------------------------------
// Get settings
//---------------------------------------------------
document.onreadystatechange = function() {
  if (document.readyState == "complete") {
  
    // Get saved user id
    var userId = System.Gadget.Settings.read("userId");
    if (userId != "") {
      userIdBox.value = userId;
    }

    // Get saved site id
    var siteId = System.Gadget.Settings.read("siteId");
    if (siteId != "") {
      siteIdList.value = siteId;
    }
  }
}

//---------------------------------------------------
// Save settings
//---------------------------------------------------
System.Gadget.onSettingsClosing = function(event) {
  if (event.closeAction == event.Action.commit) {
    
    // Save user id
    var userId = userIdBox.value;
    if (userId != "") {
      System.Gadget.Settings.write("userId", userId);
    }
    
    // Save site id
    var siteId = siteIdList.value;
    if (siteId != "") {
      System.Gadget.Settings.write("siteId", siteId);
    }
    event.cancel = false;
  }

}

