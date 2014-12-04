$('#create-game').submit(function(e) {
  e.preventDefault();
  var gameName = $('#gameName').val();
  var password = $('#password').val();
  var numPlayers = parseInt($('#numPlayers').val());
  console.log(gameName+' '+password+' '+numPlayers);
  console.log('Submitted Form');
});
