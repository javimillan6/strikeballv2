var Ranking = {};
var contRatio;
var contWin;
//variables del grupo de RankingWin
var grupoRankingWin;
var totalPlayersWin;
var puedoScrollWin;

//variables del grupo de RankingTOP
var grupoRankingRatio;
var totalPlayersRatio;
var puedoScrollRatio;



Ranking.init = function(){
    game.stage.disableVisibilityChange = true;
};


Ranking.preload = function(){ 

};

Ranking.create = function() {
    contRatio = 4;
    contWin = 4;
    totalPlayersWin=0;
    totalPlayersRatio=0;
    puedoScrollWin=true;
    puedoScrollRatio=true;
    
    actualizaRankingWin();
    actualizaRankingRatio();
    game.add.sprite(0,0, 'fondoMenu');
    
    var titulo = game.add.sprite(400,125, 'rankingTitle');
    titulo.anchor.setTo(0.5,0.5);
    
    var titulo = game.add.sprite(216,200, 'topratioplayers');
    titulo.anchor.setTo(0.5,0.5);
    
    var titulo = game.add.sprite(585,200, 'topwinplayers');
    titulo.anchor.setTo(0.5,0.5);
    
    
    var btnbajaWin = game.add.button(336, 261,'baja', function(){
        if ((contWin<totalPlayersWin)&&(puedoScrollWin)){
            Client.efectoBoton(btnbajaWin);
            puedoScrollWin=false;
            game.add.tween(grupoRankingWin).to({ y: (grupoRankingWin.y)-90 }, 400, "Sine.easeInOut", true);
            contWin++;
            setTimeout(function(){ puedoScrollWin=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnbajaWin.scale.setTo(0.20, 0.20);
    
    var btnsubeWin = game.add.button(336, 223,'sube', function(){
        if ((contWin>4)&&(puedoScrollWin)){
            Client.efectoBoton(btnsubeWin);
            puedoScrollWin=false;
            game.add.tween(grupoRankingWin).to({ y: (grupoRankingWin.y)+90 }, 400, "Sine.easeInOut", true);
            contWin--;
            setTimeout(function(){ puedoScrollWin=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnsubeWin.scale.setTo(0.20, 0.20);
    
    var btnbajaRatio = game.add.button(706, 261,'baja', function(){
        if ((contRatio<totalPlayersRatio)&&(puedoScrollRatio)){
            Client.efectoBoton(btnbajaRatio);
            puedoScrollRatio=false;
            game.add.tween(grupoRankingRatio).to({ y: (grupoRankingRatio.y)-90 }, 400, "Sine.easeInOut", true);
            contRatio++;
            setTimeout(function(){ puedoScrollRatio=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnbajaRatio.scale.setTo(0.20, 0.20);
    
    var btnsubeRatio = game.add.button(706, 223,'sube', function(){
        if ((contRatio>4)&&(puedoScrollRatio)){
            Client.efectoBoton(btnsubeRatio);
            puedoScrollRatio=false;
            game.add.tween(grupoRankingRatio).to({ y: (grupoRankingRatio.y)+90 }, 400, "Sine.easeInOut", true);
            contRatio--;
            setTimeout(function(){ puedoScrollRatio=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnsubeRatio.scale.setTo(0.20, 0.20);
    
    Client.agregarBotonesTop();
};

Ranking.update = function(){
    
};

function rankingWins(pos,nickname,jugadas, victorias, derrotas, posX, posY,color){
    var lobbyFondo = game.add.sprite(posX, posY, 'lobbyNamesFondo');
    lobbyFondo.scale.setTo(0.62, 0.63);
    grupoRankingWin.add(lobbyFondo);
    
    var lobbyNames = game.add.sprite(posX-10, posY+10, 'lobbyNames');
    lobbyNames.scale.setTo(0.62, 0.63);
    grupoRankingWin.add(lobbyNames);
    
    var bola = game.add.sprite(posX+43, posY+45, color);
    bola.anchor.setTo(0.5,0.5);
    grupoRankingWin.add(bola);
    
    var posiciontxt = game.add.text(bola.x, bola.y+2, pos);
    posiciontxt.anchor.set(0.5);
    posiciontxt.align = 'center';
    posiciontxt.font = 'Arial Black';
    posiciontxt.fontSize = 25;
    posiciontxt.fontWeight = 'bold';
    posiciontxt.stroke = '#000000';
    posiciontxt.strokeThickness = 6;
    posiciontxt.fill = '#43d637';
    grupoRankingWin.add(posiciontxt);
    
    
    var textName = game.add.text(lobbyFondo.x+86, lobbyFondo.y+43, nickname);
    textName.font = 'Comfortaa';
    textName.fontSize = 18;
    textName.fill = '#ffffff';
    grupoRankingWin.add(textName);
    
    var textWins = game.add.text(lobbyFondo.x+86, lobbyFondo.y+15, "Wins: "+victorias);
    textWins.font = 'Comfortaa';
    textWins.fontSize = 14;
    textWins.fill = '#ffffff';
    grupoRankingWin.add(textWins);
    
    var textLosses = game.add.text(lobbyFondo.x+179, lobbyFondo.y+15, "Losses: "+derrotas);
    textLosses.font = 'Comfortaa';
    textLosses.fontSize = 14;
    textLosses.fill = '#ffffff';
    grupoRankingWin.add(textLosses);
    
};

function rankingRatios(pos,nickname,jugadas, color, winratio, posX, posY){
    var lobbyFondo = game.add.sprite(posX, posY, 'lobbyNamesFondo');
    lobbyFondo.scale.setTo(0.62, 0.63);
    grupoRankingRatio.add(lobbyFondo);
    
    var lobbyNames = game.add.sprite(posX-10, posY+10, 'lobbyNames');
    lobbyNames.scale.setTo(0.62, 0.63);
    grupoRankingRatio.add(lobbyNames);
    
    var bola = game.add.sprite(posX+43, posY+45, color);
    bola.anchor.setTo(0.5,0.5);
    grupoRankingRatio.add(bola);
    
    var posiciontxt = game.add.text(bola.x, bola.y+2, pos);
    posiciontxt.anchor.set(0.5);
    posiciontxt.align = 'center';
    posiciontxt.font = 'Arial Black';
    posiciontxt.fontSize = 25;
    posiciontxt.fontWeight = 'bold';
    posiciontxt.stroke = '#000000';
    posiciontxt.strokeThickness = 6;
    posiciontxt.fill = '#43d637';
    grupoRankingRatio.add(posiciontxt);
    
    
    var textName = game.add.text(lobbyFondo.x+86, lobbyFondo.y+43, nickname);
    textName.font = 'Comfortaa';
    textName.fontSize = 18;
    textName.fill = '#ffffff';
    grupoRankingRatio.add(textName);
    
    if (winratio==null) winratio=0;
    winratio = parseFloat(winratio).toFixed(1);
    var textRatio = game.add.text(lobbyFondo.x+86, lobbyFondo.y+15, "Ratio: "+winratio+"%");
    textRatio.font = 'Comfortaa';
    textRatio.fontSize = 14;
    textRatio.fill = '#ffffff';
    grupoRankingRatio.add(textRatio);
    
    var textplays = game.add.text(lobbyFondo.x+179, lobbyFondo.y+15, "Plays: "+jugadas);
    textplays.font = 'Comfortaa';
    textplays.fontSize = 14;
    textplays.fill = '#ffffff';
    grupoRankingRatio.add(textplays);
    
};

function actualizaRankingWin(){
    var grupoLoading = Client.loading(inputGrupo);
    $.ajax({
        url: IP_SERVER+'/getRankingWin',
        type: "GET",
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            cont = 4;
            puedoScrollWin=true;
            totalPlayersWin=data.length;
            grupoRankingWin= game.add.group();
            var mask = game.add.graphics(0, 100);
            mask.beginFill(0xffffff);
            mask.drawRect(74, 125, 262, 357);
            grupoRankingWin.mask = mask;
            
            for(var partida in data){
              rankingWins(parseInt(partida)+1,data[partida].nickname,data[partida].jugadas,data[partida].victorias,data[partida].derrotas,67,221+(partida*90),data[partida].color);
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

function actualizaRankingRatio(){
    var grupoLoading = Client.loading(inputGrupo);
    $.ajax({
        url: IP_SERVER+'/getRankingRatio',
        type: "GET",
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            cont = 4;
            puedoScrollRatio=true;
            totalPlayersRatio=data.length;
            grupoRankingRatio= game.add.group();
            var mask = game.add.graphics(0, 100);
            mask.beginFill(0xffffff);
            mask.drawRect(444, 125, 262, 357);
            grupoRankingRatio.mask = mask;
            
            for(var partida in data){
              rankingRatios(parseInt(partida)+1,data[partida].nickname,data[partida].jugadas,data[partida].color,data[partida].winratio,437,221+(partida*90));
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}