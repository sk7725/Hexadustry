const shadowcolor=new Color(0,0,0,0.71);
const tilesize=Vars.tilesize;
const hexdooropen=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fin() * 2);
});
const hexdoorclose=newEffect(10, e => {
    Lines.stroke(e.fout() * 1.6);
    Lines.poly(e.x, e.y,6, tilesize / 2 + e.fout() * 2,90);
});

const doorwall = extendContent(Door, "doorwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name+((tile.ent().open)?"-open":"")), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  onHexDoorToggle(player,tile,open){
    var entity=tile.ent();
    if(entity != null){
      entity.open = open;

      //pathfinder.updateTile(tile);
      if(!entity.open){
          Effects.effect(hexdooropen, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy(),0,90);
      }else{
          Effects.effect(hexdoorclose, tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy(),0,90);
      }
      Sounds.door.at(tile);
    }
  },
  tapped(tile,player){
    try{
      var entity = tile.ent();
      if((Units.anyEntities(tile) && entity.open) || !tile.entity.timer.get(0, 30)){
        return;
      }
      this.onHexDoorToggle(null, tile, !entity.open);
    }
    catch(err){
      print(err);
    }
  }
});
