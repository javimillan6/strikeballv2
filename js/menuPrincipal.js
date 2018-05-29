var MenuPrincipal = {};

MenuPrincipal.preload = function(){
    /*game.load.image('fondoMenu', 'assets/menu/fondo.png');
    game.load.image('botonAzul', 'assets/menu/botonAzul.png');*/
};

MenuPrincipal.create = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;
    
    game.add.sprite(0,0, 'fondoMenu');
    
    bolasAlteatoriasMenu();
    
    Client.agregarBotonesTop();
    var titulo = game.add.sprite(400,130, 'menuPrincipal');
    titulo.anchor.setTo(0.5,0.5);
    
    var botonPlay = game.add.button(300, 220,'botonAzul' , function(){
        Client.efectoBoton(botonPlay);
        game.state.start("MenuLobby");
    }, this, 2, 1, 0);
    botonPlay.scale.setTo(0.5, 0.4);
    var textPlay = game.add.text(botonPlay.x+70, botonPlay.y+15, "PLAY");
    textPlay.font = 'Comfortaa';
    textPlay.fontSize = 30;
    textPlay.fill = '#ffffff';

    var botonHowToPlay = game.add.button(300, 310,'botonAzul' , function(){
        Client.efectoBoton(botonHowToPlay);
        game.state.start("HowToPlay");
    }, this, 2, 1, 0);
    botonHowToPlay.scale.setTo(0.5, 0.4);
    var textHowToPlay = game.add.text(botonHowToPlay.x+15, botonHowToPlay.y+15, "HOW TO PLAY");
    textHowToPlay.font = 'Comfortaa';
    textHowToPlay.fontSize = 25;
    textHowToPlay.fill = '#ffffff';

    var botonTraining = game.add.button(300, 400,'botonAzul' , function(){
        Client.efectoBoton(botonTraining);
        game.state.start("Training");
    }, this, 2, 1, 0);
    botonTraining.scale.setTo(0.5, 0.4);
    var textTraining = game.add.text(botonTraining.x+30, botonTraining.y+15, "TRAINING");
    textTraining.font = 'Comfortaa';
    textTraining.fontSize = 30;
    textTraining.fill = '#ffffff';

    var botonLogout = game.add.button(300, 490,'botonAzul', function(){
        Client.efectoBoton(botonLogout);
        //reiniciamos todas las variables de configuracion del usuario y partida mas importantes
        datosUsuario.idUsuario;
        datosUsuario.nickname;
        datosUsuario.idRoom="";
        datosPartida.gameStarted=false;
        datosPartida.idRoom="";
        datosPartida.map=false;
        datosPartida.name="";
        game.state.start("PantallaPrincipal");
    }, this, 2, 1, 0);
    botonLogout.scale.setTo(0.5, 0.4);
    var textLogout = game.add.text(botonLogout.x+35, botonLogout.y+15, "LOGOUT");
    textLogout.font = 'Comfortaa';
    textLogout.fontSize = 30;
    textLogout.fill = '#ffffff';
};

MenuPrincipal.update = function(){
    
};


function bolasAlteatoriasMenu(){
    for (var i = 0; i < 65; i++) {
        var n= Math.floor(Math.random() * 9) + 1 ;
        var xBola=(Math.floor(Math.random() * 800) + 1);
        var yBola=(Math.floor(Math.random() * 600) + 1);
        var bolaMini= game.add.sprite(xBola, yBola, ('bola'+n));
        game.physics.p2.enable(bolaMini, false);
        bolaMini.body.collideWorldBounds=true;
        var x= Math.floor(Math.random() * 200) + 200 ;
        var y= Math.floor(Math.random() * 200) + 200 ;
        var aleatorio=(Math.floor(Math.random() * 4) + 1);
        if (aleatorio===1){
            bolaMini.body.force.x=-x;
            bolaMini.body.force.y=+y;
        }else if (aleatorio===2){
            bolaMini.body.force.x=+x;
            bolaMini.body.force.y=-y;
        }else if (aleatorio===3){
            bolaMini.body.force.x=+x;
            bolaMini.body.force.y=+y;
        }else{
            bolaMini.body.force.x=-x;
            bolaMini.body.force.y=-y;
        }
        
    } 
}