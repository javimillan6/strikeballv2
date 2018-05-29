var Training = {};
var land;
var cursors;
var player;
var velocidad;
var grupoPlayers;
var grupoVelocidades;
var grupoMuros;
var velX;
var velY;
var alive = true;
var teleportBlueLeft;
var teleportBlueRight;
var teleportRedLeft;
var teleportRedRight;
var teleportYellowLeft;
var teleportYellowRight;
var delayTp=0;

Training.preload = function(){ 

};

Training.create = function() {
    //Inicializacion variables globales del juego.
    alive = true;
    velocidad = 5;
    velX = 0;
    velY = 0;

    //Tamano del mundo.
    game.world.setBounds(0, 0, 3000, 3000);


    //Agregamos sus fisicas
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Collision groups
    grupoPlayers = game.add.physicsGroup();
    grupoPlayers.enableBody = true;
    grupoPlayers.physicsBodyType = Phaser.Physics.ARCADE;
    grupoVelocidades = game.add.physicsGroup();
    grupoVelocidades.enableBody = true;
    grupoVelocidades.physicsBodyType = Phaser.Physics.ARCADE;    
    grupoMuros = game.add.physicsGroup();
    grupoMuros.enableBody = true;
    grupoMuros.physicsBodyType = Phaser.Physics.ARCADE;
    grupoSea = game.add.physicsGroup();
    grupoSea.enableBody = true;
    grupoSea.physicsBodyType = Phaser.Physics.ARCADE;

    //Crear tablero.
    var tablero = new Tablero();
    var matriz = tablero.getTablero();

    //Mapear el terreno.
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            switch(matriz[i][j]){
                case 'water': 
                    var sea = grupoSea.create(i*100, j*100, 'agua');
                    sea.animations.add('moveSea');
                    //Parametros (nombre animacion, velocidad, se repite).
                    sea.animations.play('moveSea', 8, true);
                    sea.body.immovable = true;
                    break;
                case 'terrain':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    break;
                case 'terrainTopLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCespedTopLeft');
                    break;
                case 'terrainBotLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCespedBotLeft');
                    break;
                case 'terrainTopRight':
                    game.add.sprite(i*100, j*100, 'terrenoCespedTopRight');
                    break;
                case 'terrainBotRight':
                    game.add.sprite(i*100, j*100, 'terrenoCespedBotRight');
                    break;
                case 'terrainLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCespedLeft');
                    break;
                case 'terrainRight':
                    game.add.sprite(i*100, j*100, 'terrenoCespedRight');
                    break;
                case 'terrainTop':
                    game.add.sprite(i*100, j*100, 'terrenoCespedTop');
                    break;
                case 'terrainBot':
                    game.add.sprite(i*100, j*100, 'terrenoCespedBot');
                    break;
                case 'wallHorizontal':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    var wall = grupoMuros.create(i*100, j*100, 'wallHorizontal');
                    wall.body.immovable = true;
                    break;
                case 'wallVertical':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    var wall = grupoMuros.create(i*100, j*100, 'wallVertical');
                    wall.body.immovable = true;
                    break;
                case 'speedItem':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    grupoVelocidades.create(i*100+35, j*100+35, 'velocidad');
                    break;
                case 'powerItem':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    break;
                case 'teleportBlueLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportBlueLeft = game.add.sprite(i*100+35, j*100+35, 'teleportBlue');
                    teleportBlueLeft.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportBlueLeft, Phaser.Physics.ARCADE);
                    break;
                case 'teleportBlueRight':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportBlueRight = game.add.sprite(i*100+35, j*100+35, 'teleportBlue');
                    teleportBlueRight.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportBlueRight, Phaser.Physics.ARCADE);
                    break;
                case 'teleportRedLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportRedLeft = game.add.sprite(i*100+35, j*100+35, 'teleportRed');
                    teleportRedLeft.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportRedLeft, Phaser.Physics.ARCADE);
                    break;
                case 'teleportRedRight':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportRedRight = game.add.sprite(i*100+35, j*100+35, 'teleportRed');
                    teleportRedRight.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportRedRight, Phaser.Physics.ARCADE);
                    break;
                case 'teleportYellowLeft':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportYellowLeft = game.add.sprite(i*100+35, j*100+35, 'teleportYellow');
                    teleportYellowLeft.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportYellowLeft, Phaser.Physics.ARCADE);
                    break;
                case 'teleportYellowRight':
                    game.add.sprite(i*100, j*100, 'terrenoCesped');
                    teleportYellowRight = game.add.sprite(i*100+35, j*100+35, 'teleportYellow');
                    teleportYellowRight.anchor.setTo(0.5,0.5);
                    game.physics.enable(teleportYellowRight, Phaser.Physics.ARCADE);
                    break;
            }
        }
    }

    //Crear jugador.
    player = grupoPlayers.create(375, 275, datosUsuario.color);
    player.body.collideWorldBounds=true;

    //Variable que pilla el teclado.
    cursors = game.input.keyboard.createCursorKeys();

    game.world.bringToTop(grupoPlayers);
    game.world.bringToTop(grupoVelocidades);
    game.world.bringToTop(grupoMuros);
};

Training.update = function(){
    delayTp++;
    //giramos la rotacion de los teleports infinitamente
    teleportBlueLeft.angle+=3;
    teleportBlueRight.angle+=3;
    teleportRedLeft.angle+=3;
    teleportRedRight.angle+=3;
    teleportYellowLeft.angle+=3;
    teleportYellowRight.angle+=3;
    
    game.physics.arcade.overlap(grupoPlayers, grupoVelocidades, cogerVelocidadTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, grupoSea, swimTraining, null, this);
    game.physics.arcade.collide(grupoPlayers, grupoMuros, choqueMuroTraining);
    
    game.physics.arcade.overlap(grupoPlayers, teleportBlueLeft, teleportBlueLeftToRightTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportBlueRight, teleportBlueRightToLeftTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportRedLeft, teleportRedLeftToRightTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportRedRight, teleportRedRightToLeftTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportYellowLeft, teleportYellowLeftToRightTraining, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportYellowRight, teleportYellowRightToLeftTraining, null, this);

    if(alive){
        if (cursors.left.isDown)
        {
            velX = velX-velocidad;
        }
        else if (cursors.right.isDown)
        {
            velX = velX+velocidad;
        }

        if (cursors.up.isDown)
        {
            velY = velY-velocidad;
        }
        else if (cursors.down.isDown)
        {
            velY = velY+velocidad;
        }
    }

    //Movimiento del jugador
    player.body.velocity.x = velX;
    player.body.velocity.y = velY;

    //La camara sigue al jugador.
    if(alive){
        game.camera.follow(player);
    }else{
        game.camera.follow(null);
    }
};

function cogerVelocidadTraining(body1, body2){
    sndSprint.play();
    body2.destroy();
    velocidad += 1;
}

function teleportBlueLeftToRightTraining(body1, body2){
    if (delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportBlueRight.x;
        body2.y = teleportBlueRight.y;
    }
}
        

function teleportBlueRightToLeftTraining(body1, body2){
    if (delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportBlueLeft.x;
        body2.y = teleportBlueLeft.y;
    }
}

function teleportRedLeftToRightTraining(body1, body2){
    if (delayTp>50){ 
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportRedRight.x;
        body2.y = teleportRedRight.y;
    }
}

function teleportRedRightToLeftTraining(body1, body2){
    if (delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportRedLeft.x;
        body2.y = teleportRedLeft.y;
    }
}

function teleportYellowLeftToRightTraining(body1, body2){
    if (delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportYellowRight.x;
        body2.y = teleportYellowRight.y;
    }
}

function teleportYellowRightToLeftTraining(body1, body2){
    if (delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportYellowLeft.x;
        body2.y = teleportYellowLeft.y;
    }
}

function choqueMuroTraining(body1, body2){
    sndChoque.play();
    if(body2.body.touching.up == true || body2.body.touching.down == true) velY = -velY;
    if(body2.body.touching.right == true || body2.body.touching.left == true) velX = -velX;
    
    switch (body2.key){
        case 'wallHorizontal':  body2.loadTexture('wallHorizontal2');
                                break;
        case 'wallHorizontal2': body2.loadTexture('wallHorizontal3');
                                break;
        case 'wallHorizontal3': body2.destroy();
                                break;
        case 'wallVertical':    body2.loadTexture('wallVertical2');
                                break;
        case 'wallVertical2':   body2.loadTexture('wallVertical3');
                                break;
        case 'wallVertical3':   body2.destroy();
                                break;
    }
    
}

function swimTraining(body1, body2){
    var distanciaX = Math.abs((body1.x+25) - (body2.x+50));
    var distanciaY = Math.abs((body1.y+25) - (body2.y+50));
    
    //Si te mueres...
    if(distanciaX<38 && distanciaY<38 && alive){
        alive=false;
        game.add.tween(body1).to( { alpha: 0 }, 30000/(velX+velY), Phaser.Easing.Linear.None, true);
        sndSwim.play();
        //Volvemos a la lobby despues de un timeout de 3s
        setTimeout(function(){
            game.state.start("MenuPrincipal");
            sndFondo.play();
        }, 3000);
    }
}

