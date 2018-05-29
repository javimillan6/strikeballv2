var Game = {};
var land;
var cursors;
var player;
var velocidad;
var grupoFuerza;
var grupoPlayers;
var grupoVelocidades;
var grupoMuros;
var velX;
var velY;
var alive = true;
var playerCargado=false;
var canMove = false;
var jugadoresCargados=0;
var updateCountSpeed=0;
var updateCountLocation=0;
var delayChoque=0;
var delayTp=0;
var contSpeed=0;
var contPower=0;
var drawArrows=false;
var gameStarted=false;

var teleportBlueLeft;
var teleportBlueRight;
var teleportRedLeft;
var teleportRedRight;
var teleportYellowLeft;
var teleportYellowRight;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function(){ 

};

Game.create = function() {
    sndFondo.stop();
    //Inicializacion variables globales del juego.
    Game.playerMap = {};
    Game.indexPlayerMap = {};
    velocidad = 5;
    velX = 0;
    velY = 0;
    alive = true;
    canMove = false;
    playerCargado=false;
    drawArrows=false;
    jugadoresCargados=0;
    updateCountSpeed=0;
    updateCountLocation=0;
    delayChoque=0;
    contSpeed=0;
    contPower=0;
    
    //Tamano del mundo.
    game.world.setBounds(0, 0, 3000, 3000);

    //Agregamos sus fisicas
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.TILE_BIAS=40;
    //Collision groups
    grupoPlayers = game.add.physicsGroup();
    grupoPlayers.enableBody = true;
    grupoPlayers.physicsBodyType = Phaser.Physics.ARCADE;
    grupoVelocidades = game.add.physicsGroup();
    grupoVelocidades.enableBody = true;
    grupoVelocidades.physicsBodyType = Phaser.Physics.ARCADE;
    grupoFuerza = game.add.physicsGroup();
    grupoFuerza.enableBody = true;
    grupoFuerza.physicsBodyType = Phaser.Physics.ARCADE;
    grupoMuros = game.add.physicsGroup();
    grupoMuros.enableBody = true;
    grupoMuros.physicsBodyType = Phaser.Physics.ARCADE;
    grupoSea = game.add.physicsGroup();
    grupoSea.enableBody = true;
    grupoSea.physicsBodyType = Phaser.Physics.ARCADE;

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
                    grupoFuerza.create(i*100+35, j*100+35, 'power');
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
    //Creamos el grupo de la brujula que fijaremos a la camara
    brujulaPlayers= game.add.group();
    brujulaPlayers.fixedToCamera = true;
    
    brujula = game.add.sprite(100, 500, 'brujula');
    brujula.anchor.setTo(0.5,0.5);
    brujulaPlayers.add(brujula);
    
    
    //Creamos el panel de info de la partida
    panelInfo= game.add.group();
    
    var transparenciaPanel = game.add.sprite(800-165, 0, 'transparencia');
    transparenciaPanel.scale.setTo(0.24,0.20);
    transparenciaPanel.fixedToCamera = true;
    panelInfo.add(transparenciaPanel);
    
    var marco = game.add.sprite(transparenciaPanel.x, 0, 'marco');
    var marcoAnim = marco.animations.add('marcoAnim');
    marco.animations.play('marcoAnim', 5, true);
    marco.scale.setTo(0.25,0.25);
    marco.fixedToCamera = true;
    panelInfo.add(marco);
    
    textAlive = game.add.text(transparenciaPanel.x+15, transparenciaPanel.y+10, "Alive: ");
    textAlive.font = 'Comfortaa';
    textAlive.fontSize = 20;
    textAlive.fill = '#ffffff';
    textAlive.fixedToCamera = true;
    panelInfo.add(textAlive);
    
    textSpeed = game.add.text(transparenciaPanel.x+15, transparenciaPanel.y+40, "Speed: "+contSpeed);
    textSpeed.font = 'Comfortaa';
    textSpeed.fontSize = 20;
    textSpeed.fill = '#ffffff';
    textSpeed.fixedToCamera = true;
    panelInfo.add(textSpeed);
    
    textPower = game.add.text(transparenciaPanel.x+15, transparenciaPanel.y+70, "Power: "+contPower);
    textPower.font = 'Comfortaa';
    textPower.fontSize = 20;
    textPower.fill = '#ffffff';
    textPower.fixedToCamera = true;
    panelInfo.add(textPower);
    
    
    //Variable que pilla el teclado.
    cursors = game.input.keyboard.createCursorKeys();

    game.world.bringToTop(grupoPlayers);
    game.world.bringToTop(grupoVelocidades);
    game.world.bringToTop(grupoMuros);
    game.world.bringToTop(grupoFuerza);
    game.world.bringToTop(panelInfo);
    game.world.bringToTop(brujulaPlayers);
    //game.world.bringToTop(transparencia);
    //game.world.bringToTop(n1);
    
    Client.askNewPlayer();
};

Game.update = function(){
    updateCountSpeed++;
    updateCountLocation++;
    delayChoque++;
    delayTp++;
    
    game.physics.arcade.overlap(grupoPlayers, grupoVelocidades, cogerVelocidad, null, this);
    game.physics.arcade.overlap(grupoPlayers, grupoFuerza, cogerFuerza, null, this);
    
    game.physics.arcade.overlap(grupoPlayers, teleportBlueLeft, teleportBlueLeftToRight, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportBlueRight, teleportBlueRightToLeft, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportRedLeft, teleportRedLeftToRight, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportRedRight, teleportRedRightToLeft, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportYellowLeft, teleportYellowLeftToRight, null, this);
    game.physics.arcade.overlap(grupoPlayers, teleportYellowRight, teleportYellowRightToLeft, null, this);

    game.physics.arcade.overlap(player, grupoSea, swim, null, this);
    game.physics.arcade.collide(grupoPlayers, grupoMuros, choqueMuro);
    game.physics.arcade.collide(player, grupoPlayers, choquePlayers);

    if(alive && canMove){
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
    
    if (gameStarted&&updateCountSpeed>2&&alive){
        updateCountSpeed=0;
        Client.sendMySpeed(velX,velY,datosUsuario.idUsuario);
    }
    
    if (gameStarted&&updateCountLocation>6&&alive){
        updateCountLocation=0;
        Client.sendMyLocation(player.x,player.y,datosUsuario.idUsuario);
    }

    //La camara sigue al jugador.
    if(alive && playerCargado){
        game.camera.follow(player);
    }else{
        game.camera.follow(null);
    }
    
    if (drawArrows){
        drawArrows=false;
        for (var key in Game.playerMap) {
            if (Game.playerMap[key].id!=datosUsuario.idUsuario){
                var flecha= game.add.sprite(brujula.x+3, brujula.y , "arrow"+Game.playerMap[key].color);
                flecha.anchor.setTo(0.5,0.5);
                brujulaPlayers.add(flecha);
                Game.indexPlayerMap[key]=flecha;
            }
        }
    }
    
    if (jugadoresCargados){
        for (var key in Game.indexPlayerMap) {
            if (Game.playerMap[key].id!=datosUsuario.idUsuario){
                Game.indexPlayerMap[key].rotation = game.physics.arcade.angleBetween(player,Game.playerMap[key]);
            }
        }
        
        teleportBlueLeft.angle+=3;
        teleportBlueRight.angle+=3;
        teleportRedLeft.angle+=3;
        teleportRedRight.angle+=3;
        teleportYellowLeft.angle+=3;
        teleportYellowRight.angle+=3;
    }
    
    
};

function teleportBlueLeftToRight(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportBlueRight.x;
        body2.y = teleportBlueRight.y;
    }
}
        

function teleportBlueRightToLeft(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportBlueLeft.x;
        body2.y = teleportBlueLeft.y;
    }
}

function teleportRedLeftToRight(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){ 
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportRedRight.x;
        body2.y = teleportRedRight.y;
    }
}

function teleportRedRightToLeft(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportRedLeft.x;
        body2.y = teleportRedLeft.y;
    }
}

function teleportYellowLeftToRight(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportYellowRight.x;
        body2.y = teleportYellowRight.y;
    }
}

function teleportYellowRightToLeft(body1, body2){
    if (body2.id==datosUsuario.idUsuario&&delayTp>50){
        sndTeleport.play();
        delayTp = 0;
        body2.x = teleportYellowLeft.x;
        body2.y = teleportYellowLeft.y;
    }
}

function cogerVelocidad(body1, body2){
    sndSprint.play();
    body2.destroy();
    if (body1.id==datosUsuario.idUsuario){
        contSpeed++;
        textSpeed.setText("Speed: "+contSpeed);
        velocidad += 1;
    } 
}

function cogerFuerza(body1, body2){ 
    if (body1.id==datosUsuario.idUsuario){
        contPower++;
        textPower.setText("Power: "+contPower);
    } 
    sndPotencia.play();
    body2.destroy();
    if (body1.id==datosUsuario.idUsuario) Client.enviarPotencia(body1.id);
}

function choqueMuro(body1, body2){
    sndChoque.play();
    if (body1.id==datosUsuario.idUsuario){
        if(body2.body.touching.up == true || body2.body.touching.down == true) velY = -(velY/1.5);
        if(body2.body.touching.right == true || body2.body.touching.left == true) velX = -(velX/1.5);
    }
    
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

function choquePlayers(body1, body2){
    sndChoque.play();
    //if(body2.body.touching.up == true || body2.body.touching.down == true) velY = -velY;
    //if(body2.body.touching.right == true || body2.body.touching.left == true) velX = -velX;
    if (delayChoque>30){
        //console.log("VelX MIO= "+Game.playerMap[body1.id].body.velocity.x+"\nVelY MIO= "+Game.playerMap[body1.id].body.velocity.y);
        //console.log("VelX SUYO= "+Game.playerMap[body2.id].body.velocity.x+"\nVelY SUYO= "+Game.playerMap[body2.id].body.velocity.y);
        console.log("BODY1: "+body1.id+"\nBODY2: "+body2.id);
        delayChoque=0;
        if (body1.id > body2.id) {
            //variables auxiliares
            var auxVelX=(Game.playerMap[body2.id].body.velocity.x/2)*(((Math.log(body2.potencia)/Math.log(3.15))+3));
            var auxVelY=(Game.playerMap[body2.id].body.velocity.y/2)*(((Math.log(body2.potencia)/Math.log(3.15))+3));
            var tuVelX = ((velX/2)*((Math.log(body1.potencia)/Math.log(3.15))+1));
            var tuVelY = ((velY/2)*((Math.log(body1.potencia)/Math.log(3.15))+1));
            Client.enviarChoque(body2.id,tuVelX,tuVelY);
            velY = auxVelY;
            velX = auxVelX; 
        }
        
        
        //Game.playerMap[body1.id].body.velocity.x = Game.playerMap[body2.id].body.velocity.x;
        //Game.playerMap[body1.id].body.velocity.y = Game.playerMap[body2.id].body.velocity.y;
    }
    
}

function swim(body1, body2){
    var distanciaX = Math.abs((body1.x+25) - (body2.x+50));
    var distanciaY = Math.abs((body1.y+25) - (body2.y+50));
    
    //Si te mueres...
    if(distanciaX<38 && distanciaY<38 && alive){
        alive=false;
        game.add.tween(body1).to( { alpha: 0 }, 30000/(velX+velY), Phaser.Easing.Linear.None, true);
        sndSwim.play();
        if (Object.keys(Game.playerMap).length>1) {
            //avisamos al resto de jugadores de que he muerto
            Client.playerLose();
            var youdied = game.add.sprite(400, 300, 'youdied');
            youdied.anchor.setTo(0.5,0.5);
            youdied.alpha = 0.1;
            youdied.fixedToCamera=true;
            //Empezamos la animacion del titulo "you died"
            game.add.tween(youdied).to( { alpha: 1 }, 2000, "Linear", true);
            game.add.tween(youdied.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
            setTimeout(function(){
                game.add.tween(youdied.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
                setTimeout(function(){
                    game.add.tween(youdied.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
                    setTimeout(function(){
                        game.add.tween(youdied.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
                        setTimeout(function(){
                            game.add.tween(youdied.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
                            setTimeout(function(){
                                //restauramos las variables de configuración del juego
                                playerCargado=false;
                                gameStarted=false;
                                jugadoresCargados=0;
                                datosPartida.name="";
                                datosPartida.idRoom="";
                                datosPartida.gameStarted=false;
                                datosPartida.maxPlayers="";
                                game.state.start("MenuPrincipal");
                                Client.leaveRoom();
                                sndFondo.play();
                            }, 1500);  
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500);
        }
    }
}

Game.updatePlayerSpeed = function(velocidadRecibida){
    Game.playerMap[velocidadRecibida.id].body.velocity.x = velocidadRecibida.x;
    Game.playerMap[velocidadRecibida.id].body.velocity.y = velocidadRecibida.y;
};

Game.updatePlayerLocation = function(locationRecibida){
    if (locationRecibida.id!=datosUsuario.idUsuario){
        Game.playerMap[locationRecibida.id].x = locationRecibida.x;
        Game.playerMap[locationRecibida.id].y = locationRecibida.y;
    }
};

Game.incrementaPotencia = function(id){
    Game.playerMap[id].potencia++;
};

Game.iniciaCuentaAtras = function() {
    transparencia = game.add.sprite(player.x, player.y, 'transparencia');
    transparencia.anchor.setTo(0.5,0.5);
    transparencia.scale.setTo(2,2);
    n1 = game.add.sprite(player.x+25, player.y+25, 'numero1');
    snd01.play();
    n1.scale.setTo(0.2,0.2);
    n1.anchor.setTo(0.5,0.5);
    game.add.tween(n1.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
    setTimeout(function(){
        n1.destroy();
        n2 = game.add.sprite(player.x+25, player.y+25, 'numero2');
        snd02.play();
        n2.scale.setTo(0.2,0.2);
        n2.anchor.setTo(0.5,0.5);
        game.add.tween(n2.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
        setTimeout(function(){
            n2.destroy();
            n3 = game.add.sprite(player.x+25, player.y+25, 'numero3');
            snd03.play();
            n3.scale.setTo(0.2,0.2);
            n3.anchor.setTo(0.5,0.5);
            game.add.tween(n3.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
            setTimeout(function(){
                n3.destroy();
                go = game.add.sprite(player.x+25, player.y+25, 'go');
                sndGO.play();
                go.scale.setTo(1,1);
                go.anchor.setTo(0.5,0.5);
                game.add.tween(go).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
                setTimeout(function(){
                    go.destroy();
                    transparencia.destroy();
                    gameStarted=true;
                    canMove=true;
                    drawArrows=true;
                    //COMIENZA PARTIDA 
                    
                }, 1000);
            }, 1500);
        }, 1500);
    }, 1500);
};

Game.actualizaPostChoque = function(player){
    if (datosUsuario.idUsuario==player.id){
        velX=player.x;
        velY=player.y;
    }
};

Game.addNewPlayer = function(id,x,y,color){
    if (id==datosUsuario.idUsuario){
        player = grupoPlayers.create(x, y, color);
        player.body.collideWorldBounds=true;
        player.color=color;
        player.id=id;
        player.potencia=1;
        //player.body.setCircle(25);
        ++jugadoresCargados;
        Game.playerMap[id] = player;
        textAlive.setText("Alive: "+Object.keys(Game.playerMap).length);
    }else{
        var playerEnemigo = grupoPlayers.create(x, y, color);
        //playerEnemigo.body.setCircle(25);
        playerEnemigo.body.collideWorldBounds=true;
        playerEnemigo.id=id;
        playerEnemigo.color=color;
        playerEnemigo.potencia=1;
        ++jugadoresCargados;
        Game.playerMap[id] = playerEnemigo;
        textAlive.setText("Alive: "+Object.keys(Game.playerMap).length);
    }
    if (datosPartida.playersConnected==jugadoresCargados){
           playerCargado=true;
           Game.iniciaCuentaAtras();
    }
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
    
    if (Game.indexPlayerMap[id]!=undefined){
        Game.indexPlayerMap[id].destroy();
        delete Game.indexPlayerMap[id];
    }
    
    textAlive.setText("Alive: "+Object.keys(Game.playerMap).length);
    
    //Si solo queda un jugador en el array (soy yo)
    if (Object.keys(Game.playerMap).length==1) {
        Client.playerWin();
        sndWin.play();
        var youwin = game.add.sprite(400, 300, 'youwin');
        youwin.anchor.setTo(0.5,0.5);
        youwin.alpha = 0.1;
        youwin.fixedToCamera=true;
        //Empezamos la animacion del titulo "you win"
        game.add.tween(youwin).to( { alpha: 1 }, 2000, "Linear", true);
        game.add.tween(youwin.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
        setTimeout(function(){
            game.add.tween(youwin.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
            setTimeout(function(){
                game.add.tween(youwin.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
                setTimeout(function(){
                    game.add.tween(youwin.scale).to( { x: 1, y: 1 }, 1500, Phaser.Easing.Linear.None, true);
                    setTimeout(function(){
                        game.add.tween(youwin.scale).to( { x: 1.90, y: 1.90 }, 1500, Phaser.Easing.Linear.None, true);
                        setTimeout(function(){
                            //restauramos las variables de configuración del juego
                            playerCargado=false;
                            gameStarted=false;
                            jugadoresCargados=0;
                            datosPartida.name="";
                            datosPartida.idRoom="";
                            datosPartida.gameStarted=false;
                            datosPartida.maxPlayers="";
                            game.state.start("MenuPrincipal");
                            Client.leaveRoom();
                            sndFondo.play();
                        }, 1500);  
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 1500);
        
        
    }
};