class Tablero{ 
    
    constructor(){
        //Variables
        this.arrayTablero = new Array(30);
        this.muros = new Array();
        for(var i = 0; i<30; i++){
            this.arrayTablero[i] = new Array(30);
        }
        
        for(var i = 0; i<30; i++){
            for(var j = 0; j<30; j++){
                if(i<2 || j<2 || i>27 || j>27){
                    this.arrayTablero[i][j] = 'water';
                }else if(i == 2 && j == 2){
                    this.arrayTablero[i][j] = 'terrainTopLeft';
                }else if(i == 2 && j == 27){
                    this.arrayTablero[i][j] = 'terrainBotLeft';
                }else if(i == 27 && j == 2){
                    this.arrayTablero[i][j] = 'terrainTopRight';
                }else if(i == 27 && j == 27){
                    this.arrayTablero[i][j] = 'terrainBotRight';
                }
                else if(i<3){
                    this.arrayTablero[i][j] = 'terrainLeft';
                }else if(i>26){
                    this.arrayTablero[i][j] = 'terrainRight';
                }else if(j<3){
                    this.arrayTablero[i][j] = 'terrainTop';
                }else if(j>26){
                    this.arrayTablero[i][j] = 'terrainBot';
                }else{
                    this.arrayTablero[i][j] = 'terrain';
                }
            }
        }
        
        this.crearMuros();
        this.colocarVelocidades(20);
        this.colocarFuerza(20);
        this.colocarTeleport("Blue");
        this.colocarTeleport("Red");
        this.colocarTeleport("Yellow");
    }
    
    getTablero(){
        return this.arrayTablero;
    }
    
    crearMuros(){
        var casillasRestantes = (28 * 28) / 100 * 10;
        var casillasOcupadas = 0;
        
        while (casillasRestantes > casillasOcupadas) {
            var r=0;
            switch (casillasRestantes - casillasOcupadas) {
                case 1:
                    r = 1;
                    break;
                case 2:
                    r = Math.floor((Math.random() * 2) + 1);
                    break;
                case 3:
                    r = Math.floor((Math.random() * 3) + 1);
                    break;
                case 4:
                    r = Math.floor((Math.random() * 4) + 1);
                    break;
                default:
                    r = Math.floor((Math.random() * 5) + 1);
                    break;
            }
            
            this.muros.push(new Muro(Math.round(Math.random()), r));

            casillasOcupadas += r;
        }
        
        this.colocarMuros();
    }
    
    colocarMuros(){
        
        for(var muro in this.muros){
            
            var colocado = false;
            while(!colocado){
                //Horizontal
                if(this.muros[muro].orientacion == 0){
                    var posX = Math.floor((Math.random()*(29-this.muros[muro].longitud))+0); 
                    var posY = Math.floor((Math.random()*29)+0);
                    var comprobarLongitud = 0;
                    for(var i = 0; i<this.muros[muro].longitud;i++){
                        if(this.arrayTablero[posX+i][posY] == "terrain")
                            comprobarLongitud++;
                    }
                    if(comprobarLongitud == this.muros[muro].longitud){
                        for(var i = 0; i<this.muros[muro].longitud;i++){
                            this.arrayTablero[posX+i][posY] = "wallHorizontal";
                        }
                        colocado = true;
                    }
                }else{
                    var comprobarLongitud = 0;
                    var posX = Math.floor((Math.random()*29)+0); 
                    var posY = Math.floor((Math.random()*(29-this.muros[muro].longitud))+0);
                    for(var i = 0; i<this.muros[muro].longitud;i++){
                        if(this.arrayTablero[posX][posY+i] == "terrain")
                            comprobarLongitud++;
                    }
                    if(comprobarLongitud == this.muros[muro].longitud){
                        for(var i = 0; i<this.muros[muro].longitud;i++){
                            this.arrayTablero[posX][posY+i] = "wallVertical";
                        }
                        colocado = true;
                    }
                }
            }    
        }
    }
    
    colocarVelocidades(cantidad){
        var i=0;
        while(i<cantidad){
            var posX = Math.floor(Math.random()*29);
            var posY = Math.floor(Math.random()*29);
            if(this.arrayTablero[posX][posY] == "terrain"){
                this.arrayTablero[posX][posY] = "speedItem";
                i++;
            }
        }
    }
    
    colocarFuerza(cantidad){
        var i=0;
        while(i<cantidad){
            var posX = Math.floor(Math.random()*29);
            var posY = Math.floor(Math.random()*29);
            if(this.arrayTablero[posX][posY] == "terrain"){
                this.arrayTablero[posX][posY] = "powerItem";
                i++;
            }
        }
    }
    
    colocarTeleport(nombre){
        var colocado = false;
        while(!colocado){
            var posX = Math.floor(Math.random()*15);
            var posY = Math.floor(Math.random()*29);
            if(this.arrayTablero[posX][posY] == "terrain"){
                this.arrayTablero[posX][posY] = "teleport"+nombre+"Left";
                colocado = true;
            }
        }
        colocado = false;
        while(!colocado){
            var posX = Math.floor((Math.random() * 14) + 15);
            var posY = Math.floor(Math.random()*29);
            if(this.arrayTablero[posX][posY] == "terrain"){
                this.arrayTablero[posX][posY] = "teleport"+nombre+"Right";
                colocado = true;
            }
        }
    }
}


