var HowToPlay = {};

HowToPlay.init = function(){
    game.stage.disableVisibilityChange = true;
};

HowToPlay.preload = function(){ 

};

HowToPlay.create = function() {
    game.add.sprite(0,0, 'fondoMenu');
    
    var titulo = game.add.sprite(400,130, 'howToPlay');
    titulo.anchor.setTo(0.5,0.5);
    
    var player1 = game.add.sprite(95, 305, 'playerBlue');
    var player2 = game.add.sprite(165, 255, 'playerGreen');
    var player3 = game.add.sprite(235, 305, 'playerRed');

    var textPlayer = game.add.text(43, 193, "Every player is a ball");
    textPlayer.font = 'Comfortaa';
    textPlayer.fontSize = 30;
    textPlayer.fill = '#ffffff';

    var hit = game.add.sprite(480,240, 'hit')
    hit.scale.setTo(0.37, 0.37);

    var textHit = game.add.text(500, 193, "Hit 'em all!");
    textHit.font = 'Comfortaa';
    textHit.fontSize = 30;
    textHit.fill = '#ffffff';

    var arrows = game.add.sprite(75, 430, 'arrows');
    arrows.scale.setTo(0.7, 0.7);

    var textArrows = game.add.text(43, 380, "Move it with arrows");
    textArrows.font = 'Comfortaa';
    textArrows.fontSize = 30;
    textArrows.fill = '#ffffff';

    var end = game.add.sprite(480,430, 'end')
    end.scale.setTo(0.37, 0.37);

    var textSwim = game.add.text(500, 380, "Don't swim!");
    textSwim.font = 'Comfortaa';
    textSwim.fontSize = 30;
    textSwim.fill = '#ffffff';
    
    Client.agregarBotonesTop();
};

HowToPlay.update = function(){

};

