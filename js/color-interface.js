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
