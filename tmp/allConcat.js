$(function(){
  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
    document.getElementById("title_font").style.color = color;
  }
  setInterval(getRandomColor, 3000);
});

var Calculator = require('./../js/pingpong.js').calculatorModule;

$(document).ready(function() {
  $('#ping-pong-form').submit(function(event) {
    event.preventDefault();
    var goal = $('#goal').val();
    var simpleCalculator = new Calculator("hot pink");
    var output = simpleCalculator.pingPong(goal);
    output.forEach(function(element) {
      $('#solution').append("<li>" + element + "</li>");
    });
  });
});

$(document).ready(function(){
  $('#signup').submit(function(event){
    event.preventDefault();
    var email = $('#email').val();
    $('#signup').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
  });
});

$(document).ready(function(){
  $('#time').text(moment());
});

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


var Weather = require('./../js/weather.js').weatherModule;

var displayHumidity = function(city, humidityData) {
  $('.showWeather').append("The humidity in " + city + " is " + humidityData + "%<br>");
};

var displayTemperature = function(city, temperatureData) {
  $('.showWeather').append("The temperature in " + city + " is " + temperatureData + "&#8451;<br>");
};



$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");


    $('.showWeather').text("The city you have chosen is " + city + "<br>");
    currentWeatherObject.getHumidity(city, displayHumidity);
    currentWeatherObject.getTemperature(city, displayTemperature);
  });
});
