var PreloadCarga = {};



PreloadCarga.preload = function() {
    //this.game.scale.pageAlignHorizontally = true;
    //this.game.scale.pageAlignVertically = true;
    //this.game.scale.refresh();
    game.load.image('fondoMenu', 'assets/menu/fondo.png');
    game.load.image('loading', 'assets/menu/loading.png');
};

PreloadCarga.create = function(){
    game.state.start("PantallaCarga");    
};
