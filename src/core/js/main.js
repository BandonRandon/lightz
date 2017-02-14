/*
Package: Lightz
File: main.js
(c) 2017 Brooke Dukes All Rights Reserved

This is the main JavaScript file which is used to post via AJAX and make the inerface appear smoother

See readme.md for more info
*/

// get device id and access token from the form.
var seeedAccessToken="YOUR_SEEED_API_TOKEN"; //replace with your key
var seeedAPIServer="https://us.wio.seeed.io/v1/node/GroveRelay"; //replace with your server

//handles post request

function relayClick(id,status,token,successMessage){
  var status = (status == "on") ? 1 : 0;
  var postURL = seeedAPIServer + id + "/onoff/" + status + "?access_token=" + token;

	$.ajax({
	  type: 'POST',
    url: postURL,
	  success:(function(data){
      if (data['result'] == "ok"){
            ajaxSuccess(successMessage);
        }
      }),
	  error :(function (){ ajaxFailed();}),
	  complete :(function(data){
      if (data['result'] == "ok"){
            ajaxSuccess(successMessage);
        }
      }),
	});
}

function relayStatus(id,token){
  var getURL = seeedAPIServer + id + "/onoff_status?access_token=" + token;
  var result = "";
	$.ajax({
	  type: 'GET',
    url: getURL,
    async: false,
	  success:(function(data){
            result = data['onoff'];
      }),
	  error :(function (data){
            parseData = jQuery.parseJSON(data.responseText);
            result = parseData.error;
            if (result == "Node is offline"){
              ajaxOffline();
            }
            else{
              ajaxFailed();
            }
            }),
	});
  return result;
}

function checkRelayStatus(seeedAccessToken){
  if (relayStatus("D0",seeedAccessToken) == 1){
    $('.status').addClass("bulb-on").removeClass('bulb-off');
    $('#action-button').html('Turn Light Off').removeClass('disabled').removeClass('bulb-disabled');
  }
  else if ( relayStatus("D0",seeedAccessToken) == 'Node is offline'){
    $('.status').addClass("bulb-disabled").removeClass('bulb-off').removeClass('bulb-on');
    $('#action-button').html('Device Offline. Click To Reconnect.').addClass('disabled');
  }
  else{
    $('.status').addClass("bulb-off").removeClass('bulb-on').removeClass('bulb-disabled');
    $('#action-button').html('Turn Light On').removeClass('disabled');
  }
}

//returned on fail
function ajaxFailed() {
    $(".result").stop().fadeIn().html("Error Occured, Please Try Again.").removeClass().addClass("result fail").delay(3000).fadeOut(2000);
}
function ajaxOffline() {
    $(".result").stop().fadeIn().html("Check outlets power and WiFi connection before trying to reconnect.").removeClass().addClass("result fail").delay(3000).fadeOut(2000);
}
//returned on success
function ajaxSuccess(){
    $(".result").hide();
}

$(document).ready(function() {
   //hide our results message div
   $(".result").hide();
   $(".reconnect").hide();

   //check Relays on page load
   checkRelayStatus(seeedAccessToken);

   //led lights relay
   $( 'body' ).on('click',"#action-button", function(e){
     if ( $('.status').hasClass( "bulb-on" ) ){
       relayClick("D0","off",seeedAccessToken,"Turning Lamp Off");
       $('#action-button').html('Turn Light On');
       $('.status').addClass("bulb-off").removeClass('bulb-on').removeClass('bulb-disabled');

     }
     else if ( $('.status').hasClass( "bulb-disabled" ) ){
           e.preventDefault();
           checkRelayStatus(seeedAccessToken);
     }
     else{
       relayClick("D0","on",seeedAccessToken,"Turning Lamp On");
       $('#action-button').html('Turn Light Off');
       $('.status').addClass("bulb-on").removeClass('bulb-off').removeClass('bulb-disabled');
     }
     return false;
   });

});
