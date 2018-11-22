function setMenuToggleStatus(){
  $("#toggle").click(function() {
    // store the current state of its clicked attribute
    clicked = $(this).attr("clicked");

    // invert its status
    if(clicked == "true"){
      $(this).attr("clicked", "false");
    }else{
      $(this).attr("clicked", "true");
    }
  });
}
function changeLang(){
  $("#switchLang").click(function () {

      // get the current language stored in the cookies
      if (Cookies.get("lang") === "en") {
          // if the current lang is en change everything to french
          $("[lang='fr']").attr("style", "display");
          $("[lang='en']").attr("style", "display:none !important");

          // set lang to be french
          Cookies.set("lang", "fr");
          $("#newTitle").attr("placeholder", "Renommez le projet au maximum 20 caractères");
      } else {

          // set to english if current language is french
          $("[lang='en']").attr("style", "display");
          $("[lang='fr']").attr("style", "display:none !important");
          Cookies.set("lang", "en");
          $("#newTitle").attr("placeholder", "Rename the project with a maximum of 20 characters");
      }
  });
}
function setLang(){
  // set the language on the page based on whats currently set in cookies
  if (Cookies.get("lang") === "en") {
      // display only english elements
      $("[lang='fr']").attr("style", "display:none !important");
      $("#newTitle").attr("placeholder", "Rename the project with a maximum of 20 characters");
  } else {
      // display only french elements
      $("[lang='en']").attr("style", "display:none !important");
      $("#newTitle").attr("placeholder", "Renommez le projet au maximum 20 caractères");
  }
}
