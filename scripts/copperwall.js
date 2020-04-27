const shadowcolor=new Color(0,0,0,0.71);
const copperwall = extendContent(Wall, "copperwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  getRequestRegion(req, list){
    try{
      var geticon=this.icon(Cicon.full);
      var y=Math.floor(geticon.getY()/Vars.tilesize);
      print("Y: "+y);
      if(y%2==1){
        return geticon.scroll(0.5,0);
      }
      else{
        return geticon;
      }
    }
    catch(err){
      print(err);
    }
  }
});
