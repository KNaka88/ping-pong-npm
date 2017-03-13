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
