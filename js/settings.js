var Settings = {};
var buttonsGrupoSettings;
var colorSelected;

Settings.init = function(){
    game.stage.disableVisibilityChange = true;
};


Settings.preload = function(){ 
    
};

Settings.create = function() {
    var colorSelected = "";
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;
    
    game.add.sprite(0,0, 'fondoMenu');
    bolasAlteatoriasMenu();

    var titulo = game.add.sprite(400,120, 'settings');
    titulo.anchor.setTo(0.5,0.5);
    
    var fondoSettings = game.add.sprite(410,375, 'registerFondo');
    fondoSettings.anchor.setTo(0.5,0.5);
    fondoSettings.scale.setTo(0.68, 0.76);
    
    var selector = game.add.sprite(800,800, 'selectionColor');
    selector.anchor.setTo(0.5,0.5);
    selector.scale.setTo(0.08, 0.08);
    
    buttonsGrupoSettings = game.add.group();
    
    var blue= game.add.button(280, 310, 'blue', function(){
        colorSelected = "blue";
        sndSoundButton.play();
        selector.x = blue.x;
        selector.y = blue.y;
    }, this, 2, 1, 0);
    blue.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(blue);
    
    var textBlue = game.add.text(blue.x, blue.y-45, "Blue");
    textBlue.font = 'Comfortaa';
    textBlue.fontSize = 20;
    textBlue.fill = '#ffffff';
    textBlue.anchor.setTo(0.5,0.5);
    
    var green = game.add.button(400, 310, 'green', function(){
        colorSelected = "green";
        sndSoundButton.play();
        selector.x = green.x;
        selector.y = green.y;
    }, this, 2, 1, 0);
    green.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(green);
    
    var textGreen = game.add.text(green.x, green.y-45, "Green");
    textGreen.font = 'Comfortaa';
    textGreen.fontSize = 20;
    textGreen.fill = '#ffffff';
    textGreen.anchor.setTo(0.5,0.5);
    
    var red = game.add.button(520, 310, 'red', function(){
        colorSelected = "red";
        sndSoundButton.play();
        selector.x = red.x;
        selector.y = red.y;
    }, this, 2, 1, 0);
    red.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(red);
    
    var textRed = game.add.text(red.x, red.y-45, "Red");
    textRed.font = 'Comfortaa';
    textRed.fontSize = 20;
    textRed.fill = '#ffffff';
    textRed.anchor.setTo(0.5,0.5);
    
    var kirby= game.add.button(280, 400, 'kirby', function(){
        colorSelected = "kirby";
        sndSoundButton.play();
        selector.x = kirby.x;
        selector.y = kirby.y;
    }, this, 2, 1, 0);
    kirby.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(kirby);
    
    var textKirby = game.add.text(kirby.x, kirby.y-45, "Kirby");
    textKirby.font = 'Comfortaa';
    textKirby.fontSize = 20;
    textKirby.fill = '#ffffff';
    textKirby.anchor.setTo(0.5,0.5);
    
    var jhon = game.add.button(400, 400, 'jhon', function(){
        colorSelected = "jhon";
        sndSoundButton.play();
        selector.x = jhon.x;
        selector.y = jhon.y;
    }, this, 2, 1, 0);
    jhon.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(jhon);
    
    var textJhon = game.add.text(jhon.x, jhon.y-45, "Jhon Cena");
    textJhon.font = 'Comfortaa';
    textJhon.fontSize = 20;
    textJhon.fill = '#ffffff';
    textJhon.anchor.setTo(0.5,0.5);
    
    var pokeball = game.add.button(520, 400, 'pokeball', function(){
        colorSelected = "pokeball";
        sndSoundButton.play();
        selector.x = pokeball.x;
        selector.y = pokeball.y;
    }, this, 2, 1, 0);
    pokeball.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(pokeball);
    
    var textPokeball = game.add.text(pokeball.x, pokeball.y-45, "Pokeball");
    textPokeball.font = 'Comfortaa';
    textPokeball.fontSize = 20;
    textPokeball.fill = '#ffffff';
    textPokeball.anchor.setTo(0.5,0.5);
    
    var botonDone = game.add.button(400, 470, 'botonAzul', function(){
        sndSoundButton.play();
        if(colorSelected!=""){
            var grupoLoading = Client.loading(inputGrupo);
            $.ajax({
                url: IP_SERVER+'/updateColor',
                type: "POST",
                data: {
                        idPlayer : datosUsuario.idUsuario,
                        colorSelected : colorSelected
                      },
                success: function(data) {
                    grupoLoading.removeAll();
                    datosUsuario.color = colorSelected;
                    game.state.start("MenuPrincipal");
                },
                error: function() {
                    console.log("No se ha podido obtener la información");
                }
            });
        }else{
            game.state.start("MenuPrincipal");
        }
    }, this, 2, 1, 0);
    botonDone.scale.setTo(0.3, 0.3);
    botonDone.anchor.setTo(0.5,0.5);
    buttonsGrupoSettings.add(botonDone);
    
    var textoDone = game.add.text(botonDone.x, botonDone.y, "DONE");
    textoDone.font = 'Comfortaa';
    textoDone.fontSize = 21;
    textoDone.fill = '#ffffff';
    textoDone.anchor.setTo(0.5,0.5);
    
    switch(datosUsuario.color){
        case "blue":
            selector.x = blue.x;
            selector.y = blue.y;
            break;
        case "green": 
            selector.x = green.x;
            selector.y = green.y;
            break;
        case "red": 
            selector.x = red.x;
            selector.y = red.y;
            break;
        case "kirby": 
            selector.x = kirby.x;
            selector.y = kirby.y;
            break;
        case "jhon": 
            selector.x = jhon.x;
            selector.y = jhon.y;
            break;
        case "pokeball": 
            selector.x = pokeball.x;
            selector.y = pokeball.y;
            break;
    }
    
    
    
    
};

Settings.update = function(){

};