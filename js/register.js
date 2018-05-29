var Register = {};
var buttonsGrupoRegister;

Register.init = function(){
    game.stage.disableVisibilityChange = true;
};


Register.preload = function(){ 
    
};

Register.create = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;
    
    game.add.sprite(0,0, 'fondoMenu');
    bolasAlteatoriasMenu();

    var titulo = game.add.sprite(400,120, 'register');
    titulo.anchor.setTo(0.5,0.5);
    
    var fondoRegistro = game.add.sprite(400,375, 'registerFondo');
    fondoRegistro.anchor.setTo(0.5,0.5);
    fondoRegistro.scale.setTo(0.68, 0.76);
    
    buttonsGrupoRegister = game.add.group();
    
    var inputName = game.add.inputField(350, 250, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 215,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Username',
        type: PhaserInput.InputType.text
    });
    buttonsGrupoRegister.add(inputName);
    inputName.startFocus();
    
    var textName = game.add.text(inputName.x-150, inputName.y, "Username:");
    textName.font = 'Comfortaa';
    textName.fontSize = 20;
    textName.fill = '#ffffff';
    
    var inputPass = game.add.inputField(350, 300, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 215,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Password',
        type: PhaserInput.InputType.password
    });
    buttonsGrupoRegister.add(inputPass);
    
    var textPass = game.add.text(inputPass.x-150, inputPass.y, "Password:");
    textPass.font = 'Comfortaa';
    textPass.fontSize = 20;
    textPass.fill = '#ffffff';
    
    var inputRepeatPass = game.add.inputField(350, 350, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 215,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Repeat Password',
        type: PhaserInput.InputType.password
    });
    buttonsGrupoRegister.add(inputRepeatPass);
    
    var textRepeatPass = game.add.text(inputRepeatPass.x-150, inputRepeatPass.y, "Repeat Pass:");
    textRepeatPass.font = 'Comfortaa';
    textRepeatPass.fontSize = 20;
    textRepeatPass.fill = '#ffffff';
    
    var inputNickname = game.add.inputField(350, 400, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 215,
        padding: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Nickname',
        type: PhaserInput.InputType.text
    });
    buttonsGrupoRegister.add(inputNickname);
    
    var textNickname = game.add.text(inputNickname.x-150, inputNickname.y, "Nickname:");
    textNickname.font = 'Comfortaa';
    textNickname.fontSize = 20;
    textNickname.fill = '#ffffff';
    
    var botonBack= game.add.button(280, 470, 'botonAzul', function(){
        sndSoundButton.play();
        game.state.start("PantallaPrincipal");
    }, this, 2, 1, 0);
    botonBack.scale.setTo(0.3, 0.3);
    botonBack.anchor.setTo(0.5,0.5);
    buttonsGrupoRegister.add(botonBack);
    
    var textoBack = game.add.text(botonBack.x, botonBack.y, "BACK");
    textoBack.font = 'Comfortaa';
    textoBack.fontSize = 21;
    textoBack.fill = '#ffffff';
    textoBack.anchor.setTo(0.5,0.5);
    
    var botonCreate= game.add.button(480, 470, 'botonAzul', function(){
        sndSoundButton.play();
        if(inputName.getText().length == 0 || inputNickname.getText().length == 0  || inputPass.getText().length == 0 || inputRepeatPass.getText().length == 0){
            Client.popup("Register Error", "Please fill all the fields", buttonsGrupoRegister, null);
        }else if(inputPass.getText() != inputRepeatPass.getText()){
            Client.popup("Register Error", "The passwords do not match", buttonsGrupoRegister, null);
        }else if(inputName.getText().length<5){
            Client.popup("Register Error", "Username must have min 5 letters", buttonsGrupoRegister, null);
        }else if(inputPass.getText().length<5){
            Client.popup("Register Error", "Password must have min 5 letters", buttonsGrupoRegister, null);
        }else if(inputNickname.getText().length<5){
            Client.popup("Register Error", "Nickname must have min 5 letters", buttonsGrupoRegister, null);
        }else{
            var grupoLoading = Client.loading(inputGrupo);
            $.ajax({
                url: IP_SERVER+'/checkNickname',
                type: "POST",
                data: {nickname : inputNickname.getText()},
                success: function(data) {
                    if(data == 0){
                        $.ajax({
                            url: IP_SERVER+'/createAccount',
                            type: "POST",
                            data: {
                                    username : inputName.getText(),
                                    nickname : inputNickname.getText(),
                                    password : inputPass.getText()
                                  },
                            success: function(data) {
                                grupoLoading.removeAll();
                                Client.popup("Register","Account "+data+" created successfully! ",buttonsGrupoRegister,"PantallaPrincipal");
                            },
                            error: function() {
                                console.log("No se ha podido obtener la información");
                            }
                        });

                    }else{
                        grupoLoading.removeAll();
                        Client.popup("Register Error", "Nickname already exists", buttonsGrupoRegister, null);
                    }
                },
                error: function() {
                    console.log("No se ha podido obtener la información");
                }
            });
        }
    }, this, 2, 1, 0);
    botonCreate.scale.setTo(0.3, 0.3);
    botonCreate.anchor.setTo(0.5,0.5);
    buttonsGrupoRegister.add(botonCreate);
    
    var textoCreate = game.add.text(botonCreate.x, botonCreate.y, "CREATE");
    textoCreate.font = 'Comfortaa';
    textoCreate.fontSize = 21;
    textoCreate.fill = '#ffffff';
    textoCreate.anchor.setTo(0.5,0.5);
};

Register.update = function(){

};