var apiKey = "";

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
      .then(function(response){
        $('.showWeather').append("The Temperture in  " + city + " is " + (parseFloat(response.main.temp)-273.15).toFixed(2) + "&#8451;<br>");
        $('.showWeather').append("The humidity in " + city + " is " + response.main.humidity + "%");
      })
      .fail(function(error) {
        $('.showWeather').text(error.responseJSON.message);
      });
  });
});
