var express = require('express');
var mysql = require('mysql');
var app = express();
var wait=require('wait.for');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
const IP_SERVER='http://192.168.19.202:8081';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Conexion con la base de datos
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Strikeball"
});

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', IP_SERVER);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post("/login", function(req, res) {
    con.query("SELECT count(*) AS total, idPlayer, nickname, color FROM player where user='"+req.body.user+"' and passw='"+req.body.passw+"'",function(err, rows, fields){
        var obj = new Object();
        obj.total = rows[0].total;
        obj.idPlayer = rows[0].idPlayer;
        obj.nickname = rows[0].nickname;
        obj.color = rows[0].color;
        res.json(obj);
    });
});

app.post("/roomIsFull", function(req, res) {
    con.query("SELECT count(*) AS total FROM lobbyroom where idRoom='"+req.body.idRoom+"'",function(err, rows, fields){
        res.json(rows[0].total);
    });
});

app.get("/getSalas", function(req, res) {
    con.query("SELECT COUNT(l.idPlayer) AS actual, r.idRoom, r.nameRoom, r.maxPlayers FROM lobbyroom l, room r where l.idRoom=r.idRoom group by r.idRoom",function(err, rows, fields){
        var devuelve = [];
        for (var i in rows) {
            var obj = new Object();
            obj.actual = rows[i].actual;
            obj.idRoom = rows[i].idRoom;
            obj.nameRoom=rows[i].nameRoom;
            obj.maxPlayers=rows[i].maxPlayers;
            devuelve.push(obj);
        }
        res.json(devuelve);
    });
});

app.get("/getRankingWin", function(req, res) {
    con.query("SELECT p.nickname, r.jugadas, r.victorias, r.derrotas, p.color from player p, ranking r where p.idPlayer=r.idPlayer order by r.victorias DESC",function(err, rows, fields){
        var devuelve = [];
        for (var i in rows) {
            var obj = new Object();
            obj.nickname = rows[i].nickname;
            obj.jugadas = rows[i].jugadas;
            obj.victorias=rows[i].victorias;
            obj.derrotas=rows[i].derrotas;
            obj.color=rows[i].color;
            devuelve.push(obj);
        }
        res.json(devuelve);
    });
});

app.get("/getRankingRatio", function(req, res) {
    con.query("SELECT p.nickname, r.jugadas, (r.victorias/r.jugadas*100) as winratio, p.color from player p, ranking r where p.idPlayer=r.idPlayer order by winratio DESC",function(err, rows, fields){
        var devuelve = [];
        for (var i in rows) {
            var obj = new Object();
            obj.nickname = rows[i].nickname;
            obj.jugadas = rows[i].jugadas;
            obj.color = rows[i].color;
            obj.winratio = rows[i].winratio;
            devuelve.push(obj);
        }
        res.json(devuelve);
    });
});

app.post("/newRoom", function(req, res) {
    var idSalaCreada=0;
    con.query("INSERT INTO `room` (`idRoom`, `nameRoom`, `maxPlayers`, `map`) VALUES (NULL,'"+req.body.name+"', '"+req.body.maxPlayers+"', 'cesped');",function(err,result){
        if (err) throw err;
        idSalaCreada=result.insertId;
        console.log("Se ha creado la partida "+req.body.name+" correctamente")
    });
    
    setTimeout(function(){ con.query("INSERT INTO `lobbyroom` (`idLobbyRoom`, `idRoom`, `idPlayer`) VALUES (NULL, '"+idSalaCreada+"', '"+req.body.idUsuario+"');",function(err, rows, fields){
        if (err) throw err;
        console.log("El usuario entra a la sala "+req.body.name);
    }); }, 500);
    
    
    setTimeout(function(){ res.json(idSalaCreada); }, 500);
});

app.post("/unirmeASala", function(req, res) {
    con.query("INSERT INTO `lobbyroom` (`idLobbyRoom`, `idRoom`, `idPlayer`) VALUES (NULL, '"+req.body.idRoom+"', '"+req.body.idPlayer+"');",function(err,result){
        if (err) throw err;
    });
    res.json("OK");
});

app.post("/playerDisconnected", function(req, res) {
    con.query("DELETE FROM lobbyroom where idPlayer="+req.body.idUsuario+";",function(err,result){
        if (err) throw err;
        console.log("El jugador con ID "+req.body.idUsuario+ "se ha desconectado de la sala")
    });
    res.json("OK");
});

app.post("/getPlayersLobby", function(req, res) {
    con.query("SELECT p.nickname AS nickname, p.color AS color from player p inner join lobbyroom lr on p.idPlayer = lr.idPlayer inner join room r on r.idRoom = lr.idRoom where r.nameRoom = '"+req.body.nameRoom+"' ORDER BY lr.idLobbyRoom;",function(err, rows, fields){
        var devuelve = [];
        for (var i in rows) {
            var obj = new Object();
            obj.nickname = rows[i].nickname;
            obj.color=rows[i].color;
            devuelve.push(obj);
        }
        res.json(devuelve);
    });
});

app.post("/checkNickname", function(req, res) {
    con.query("SELECT count(*) AS total FROM player where nickname = '"+req.body.nickname+"'",function(err, rows, fields){
        res.json(rows[0].total);
    });
});    

app.post("/createAccount", function(req, res) {
    con.query("INSERT INTO `player` (`idPlayer`, `user`, `passw`, `nickname`, `color`) VALUES (NULL, '"+req.body.username+"', '"+req.body.password+"', '"+req.body.nickname+"', 'blue')",function(err, result){
        if (err) throw err;
        console.log("Se ha creado el usuario "+req.body.username+" correctamente");
        res.json(req.body.username);
    });
});

app.post("/updateColor", function(req, res) {
    con.query("UPDATE `player` SET `color` = '"+req.body.colorSelected+"' WHERE `player`.`idPlayer` = "+req.body.idPlayer,function(err, result){
        if (err) throw err;
        console.log("Se ha cambiado el color del jugador  "+req.body.idPlayer+" correctamente");
        res.json(req.body.colorSelected);
    });
});


server.listen(8081,function(){ // Escuchando puerto 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayderID = 0; // ID del ultimo jugador conectado

io.on('connection',function(socket){
    socket.inGame=false;
    socket.on('startGame',function(matriz){
        io.sockets.in(socket.roomConectada).emit('sendStartGame',matriz);
        //El Leader borra el contenido de la tabla Lobbyroom porque la partida ya empieza
        con.query("DELETE FROM lobbyroom where idRoom="+socket.idRoom+";",function(err,result){
            if (err) throw err;
        });
    });
    
    socket.on('login',function(idUsuario, color){
        socket.idUsuario=idUsuario;
        socket.color=color;
    });
    
    socket.on('incrementarPartidaJugada',function(idUsuario, color){
        //Cuando el leader me dice que empiece la partida, me actualizo el ranking en la BBDD (incremento partidas jugadas)
        con.query("UPDATE `ranking` SET `jugadas` = jugadas+1 WHERE `ranking`.`idPlayer` = "+socket.idUsuario+";",function(err,result){
                if (err) throw err;
        });
    });
    
    socket.on('newplayer',function(){
        socket.inGame=true;
        socket.player = {
            id: socket.idUsuario,
            x: randomInt(300,2700),
            y: randomInt(300,2700),
            color: socket.color
        };
        io.sockets.in(socket.roomConectada).emit('newplayer',socket.player);
    });
    
    socket.on('actualizarListaRoom',function(){
        socket.broadcast.to(socket.roomConectada).emit('actualizaLobbyRoom');
        socket.roomConectada="";
    });
    
    socket.on('playerJoinRoom',function(roomName,idUsuario,idSalaCreada,color){
        socket.idUsuario=idUsuario;
        socket.join(roomName);
        socket.inGame=false;
        socket.roomConectada=roomName;
        socket.idRoom=idSalaCreada;
        socket.color=color;
        io.sockets.in(roomName).emit('actualizaLobbyRoom');
        
        socket.on('sendMySpeed',function(x,y,id){
            var playerPos = {
                x: x,
                y: y,
                id: id
            };
            io.sockets.in(roomName).emit('updatePlayerSpeed',playerPos);
        });
        
        socket.on('sendMyLocation',function(x,y,id){
            var playerPos = {
                x: x,
                y: y,
                id: id
            };
            io.sockets.in(roomName).emit('updatePlayerLocation',playerPos);
        });
        
        socket.on('actualizaChoque',function(idEnemigo,velX,velY){
            var playerPos = {
                id: idEnemigo,
                x: velX,
                y: velY
            };
            io.sockets.in(roomName).emit('actualizaPostChoque',playerPos);
        });
        
        socket.on('actualizaPotencia',function(idPlayer){
            io.sockets.in(roomName).emit('incrementaPotencia',idPlayer);
        });
        
        socket.on('playerWin',function(){
            //Si el usuario gana actualizamos el ranking
            con.query("UPDATE `ranking` SET `victorias` = victorias+1 WHERE `ranking`.`idPlayer` = "+socket.idUsuario+";",function(err,result){
                if (err) throw err;
            });
            //reiniciamos las variables de configuracion partida
            socket.inGame=false;
            socket.leave(socket.roomConectada);
            socket.roomConectada="";
        });
        
        socket.on('playerLose',function(){
            //Si el usuario gana actualizamos el ranking
            con.query("UPDATE `ranking` SET `derrotas` = derrotas+1 WHERE `ranking`.`idPlayer` = "+socket.idUsuario+";",function(err,result){
                if (err) throw err;
            });
            //reiniciamos las variables de configuracion partida
            socket.broadcast.to(socket.roomConectada).emit('remove',socket.player.id);
            socket.inGame=false;
            socket.leave(socket.roomConectada);
            socket.roomConectada="";
        });
        
        socket.on('leaveUser',function(){
            con.query("DELETE FROM lobbyroom where idPlayer="+socket.idUsuario+";",function(err,result){
                if (err) throw err;
            });
            socket.leave(roomName);
            console.log("USERS "+roomName+ " "+getAllPlayers(roomName))
        });
        
    });
    
    socket.on('disconnect',function(){
        //Si cuando me desconectado estaba en una partida, aviso a los demas para que me borren
        if (socket.inGame) socket.broadcast.to(socket.roomConectada).emit('remove',socket.player.id);
        if (socket.idUsuario!=null){
            con.query("DELETE FROM lobbyroom where idPlayer="+socket.idUsuario+";",function(err,result){
                if (err) throw err;
                console.log("El jugador con ID "+socket.idUsuario+ "se ha desconectado")
            });
        }
        socket.leave(socket.roomConectada);
        io.sockets.in(socket.roomConectada).emit('actualizaLobbyRoom');
        socket.roomConectada="";
    });
});


function getAllPlayers(room){
        var players = [];
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID];
            if ((player)&&(room==player.roomConectada)) players.push(player);
        });
        return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}