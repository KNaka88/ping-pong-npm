
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
