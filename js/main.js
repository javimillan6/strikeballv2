var game = new Phaser.Game(800,600,Phaser.AUTO,document.getElementById('game'));

game.state.add('Game',Game);
game.state.add('PreloadCarga',PreloadCarga);
game.state.add('PantallaCarga',PantallaCarga);
game.state.add('PantallaPrincipal',PantallaPrincipal);
game.state.add('MenuPrincipal',MenuPrincipal);
game.state.add('MenuLobby',MenuLobby);
game.state.add('HowToPlay',HowToPlay);
game.state.add('Training',Training);
game.state.add('Lobby',Lobby);
game.state.add('Ranking',Ranking);
game.state.add('Register',Register);
game.state.add('Settings',Settings);
game.state.start('PreloadCarga');