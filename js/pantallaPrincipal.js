var PantallaPrincipal = {};
var bolaDerecha;
var bolaIzquierda;
var fuego=false;
var explosion;
var botonLogin;
var password=null;
var username=null;
var idUsuario=null;
var nombreUsuario=null;
var datosUsuario = new Object();
var inputGrupo;

PantallaPrincipal.init = function(){
    game.stage.disableVisibilityChange = true;
};

WebFontConfig = {
    google: {
      families: ['Comfortaa']
    }
};

PantallaPrincipal.preload = function() {
    if (localStorage.getItem("sound")==1||localStorage.getItem("sound")==undefined){
        game.sound.mute=false;
    }else if (localStorage.getItem("sound")==0){  
        game.sound.mute=true;
    }
    game.stage.disableVisibilityChange = true;
    game.add.plugin(PhaserInput.Plugin);
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //this.scale.setScreenSize(true);
};

PantallaPrincipal.create = function(){
    var fragmentSrc = [
        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "// Yuldashev Mahmud Effect took from shaderToy mahmud9935@gmail.com",

        "float snoise(vec3 uv, float res)",
        "{",
            "const vec3 s = vec3(1e0, 1e2, 1e3);",

            "uv *= res;",

            "vec3 uv0 = floor(mod(uv, res))*s;",
            "vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;",

            "vec3 f = fract(uv); f = f*f*(3.0-2.0*f);",

            "vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,",
            "uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);",

            "vec4 r = fract(sin(v*1e-1)*1e3);",
            "float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);",

            "r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);",
            "float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);",

            "return mix(r0, r1, f.z)*2.-1.;",
            "}",

            "void main( void ) {",

                "vec2 p = -.5 + gl_FragCoord.xy / resolution.xy;",
                "p.x *= resolution.x/resolution.y;",

                "float color = 3.0 - (3.*length(2.*p));",

                "vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);",

                "for(int i = 1; i <= 7; i++)",
                "{",
                    "float power = pow(2.0, float(i));",
                    "color += (1.5 / power) * snoise(coord + vec3(0.,-time*.05, time*.01), power*16.);",
                "}",

                "gl_FragColor = vec4( color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , 1.0);",

            "}"
        ];

        filter = new Phaser.Filter(game, null, fragmentSrc);
        filter.setResolution(800, 600);

        sprite = game.add.sprite();
        sprite.visible=false;
        sprite.width = 800;
        sprite.height = 600;

        sprite.filters = [ filter ];

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.9;
        
        bolaDerecha = game.add.sprite(750, 50, 'bDerecha');
        bolaDerecha.scale.setTo(0.5, 0.5);
        game.physics.p2.enable(bolaDerecha, false);
        bolaDerecha.body.setCircle(55);
        
        bolaIzquierda = game.add.sprite(50, 550, 'bIzquierda');
        bolaIzquierda.smoothed = false;
        bolaIzquierda.scale.setTo(0.5, 0.5);
        game.physics.p2.enable(bolaIzquierda, false);
        bolaIzquierda.body.setCircle(55);
        
        bolaIzquierda.body.createBodyCallback(bolaDerecha, choqueBolas, this);
        game.physics.p2.setImpactEvents(true);
        
        bolaIzquierda.body.force.x=13600;
        bolaIzquierda.body.force.y-=10400;
        
        bolaDerecha.body.force.x-=13600;
        bolaDerecha.body.force.y=10400;
};

PantallaPrincipal.update = function(){
    if (fuego) filter.update();
};

function botonPlay(){
    Client.efectoBoton(botonLogin);
    var grupoLoading = Client.loading(inputGrupo);
    $.ajax({
        url: IP_SERVER+'/login',
        type: "POST",
        data: {user : username.getText(), passw : password.getText()},
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            if (data.total==1){
                nombreUsuario=username.getText();
                datosUsuario.idUsuario=data.idPlayer;console.log("NICK: "+data.nickname);
                datosUsuario.nickname=data.nickname;
                datosUsuario.color=data.color;
                Client.login(datosUsuario.idUsuario,datosUsuario.color);
                Client.popup("LOGIN","Login correctly, welcome "+username.getText()+"!",inputGrupo,"MenuPrincipal");
                
            }else{
                Client.popup("LOGIN","Login incorrect, please try again.",inputGrupo,null);
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

function choqueBolas(derecha,izquierda){
    bolasAlteatorias();
    sndExplosion.play();
    sndExplosion.onStop.add(iniciarMusica, this);
    bolaDerecha.destroy();
    bolaIzquierda.destroy();
    
    sprite.visible=true;
    fuego=true;
    
    var striballname = game.add.sprite(100, -50, 'strikeballName');
    var tween = game.add.tween(striballname).to( { y: 40 }, 3000, Phaser.Easing.Bounce.Out, true);
    
    var v2name = game.add.sprite(100, 650, 'v2Name');
    var tween = game.add.tween(v2name).to( { y: 130, x:340 }, 3000, "Sine.easeInOut", true);
    game.add.tween(v2name).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true);
    
    inputGrupo = game.add.group();
    username = game.add.inputField(330, 290, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Username',
        type: PhaserInput.InputType.text
    });
    //username.blockInput = false;
    username.startFocus();
    
    password = game.add.inputField(330, 335, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Password',
        type: PhaserInput.InputType.password
    });
    //password.blockInput = false;
    inputGrupo.alpha = 0;
    botonLogin= game.add.button(410, 415, 'botonVerde', botonPlay, this, 2, 1, 0);
    botonLogin.scale.setTo(0.3, 0.3);
    botonLogin.anchor.setTo(0.5,0.5);
    
    game.add.tween(inputGrupo).to( { alpha: 1 }, 3500, "Linear", true);
    
    textoLogin = game.add.text(botonLogin.x, botonLogin.y, "LOG IN");
    //text.anchor.setTo(0.5);

    textoLogin.font = 'Comfortaa';
    textoLogin.fontSize = 21;
    textoLogin.fill = '#ffffff';
    textoLogin.anchor.setTo(0.5,0.5);
    //BOTON TEMPORAL PARA ACCEDER DIRECTO AL JUEGO SIN PASAR POR MENU
    botonRegistro= game.add.button(410, 475, 'botonVerde', function(){
        Client.efectoBoton(botonRegistro);
        game.state.start("Register");
    }, this, 2, 1, 0);
    botonRegistro.scale.setTo(0.3, 0.3);
    botonRegistro.anchor.setTo(0.5,0.5);
    
    textoRegistro = game.add.text(botonRegistro.x, botonRegistro.y, "REGISTER");
    textoRegistro.font = 'Comfortaa';
    textoRegistro.fontSize = 21;
    textoRegistro.fill = '#ffffff';
    textoRegistro.anchor.setTo(0.5,0.5);
    
    inputGrupo.add(password);
    inputGrupo.add(username);
    inputGrupo.add(botonLogin);
    inputGrupo.add(botonRegistro);
}

function bolasAlteatorias(){
    for (var i = 0; i < 50; i++) {
        var n= Math.floor(Math.random() * 9) + 1 ;
        var xBola=(Math.floor(Math.random() * 800) + 1);
        var yBola=(Math.floor(Math.random() * 600) + 1);
        var bolaMini= game.add.sprite(xBola, yBola, ('bola'+n));
        game.physics.p2.enable(bolaMini, false);
        var x= Math.floor(Math.random() * 130000) + 80000 ;
        var y= Math.floor(Math.random() * 130000) + 80000 ;
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

function iniciarMusica(){
    sndFondo.play();
    sndFondo.loopFull();
}