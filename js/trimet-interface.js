var apiKey = require('./../.env').apiKey;
$(function(){
  var nextLocId = '';

  function currentTrimet(){
    $.get("https://developer.trimet.org/ws/v2/vehicles/appID/"+ apiKey, function(response){

      var trimet_lat = response.resultSet.vehicle[20].latitude;
      var trimet_lng = response.resultSet.vehicle[20].longitude;
      nextLocId = response.resultSet.vehicle[20].nextLocID;

      $("#sign_message").text(response.resultSet.vehicle[20].signMessage);
      $("#vehicle_id").text(response.resultSet.vehicle[20].vehicleID);
      console.log(trimet_lat);
      console.log(trimet_lng);

      $("#vechicle_image").empty();
      $("#vechicle_image").append("<img src ='https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+trimet_lat+","+trimet_lng+"&key=YOUR_GOOGLE_API_KEY'/>");
    });

  console.log(nextLocId);

    $.get("https://developer.trimet.org/ws/v2/arrivals/locIDs/"+nextLocId+"/appID/"+ apiKey, function(response){
        console.log($("#next_loc_name").text(response.resultSet.location[0].desc));
    });


  }



  setInterval(currentTrimet, 3000);
});
