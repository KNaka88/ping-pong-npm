(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "E975133B8D9B4D685797782C9";

},{}],2:[function(require,module,exports){
function Calculator(skinName) {
  this.skin = skinName;
}

Calculator.prototype.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
    } else if (i % 3 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
    } else  {
      output.push(i);
    }
  }
  return output;
};

exports.calculatorModule = Calculator;

},{}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
function Weather(){
}

Weather.prototype.getHumidity = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
    displayFunction(city, response.main.humidity);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

Weather.prototype.getTemperature = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
    displayFunction(city, (parseFloat(response.main.temp)-273.15).toFixed(2));
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;

},{"./../.env":1}],4:[function(require,module,exports){
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

},{"./../.env":1,"./../js/pingpong.js":2,"./../js/weather.js":3}]},{},[4]);
