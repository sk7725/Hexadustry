const shadowcolor=new Color(0,0,0,0.71);
const copperwall = extendContent(Wall, "copperwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  },
  getRequestRegion(req, list){
    print("req start");
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
      print("E: "+err);
    }
  },
  drawRequestRegion(req, list){
    var reg = this.getRequestRegion(req, list);
    Draw.rect(reg, req.drawx(), req.drawy(),
    reg.getWidth() * req.animScale * Draw.scl,
    reg.getHeight() * req.animScale * Draw.scl,
    !this.rotate ? 0 : req.rotation * 90);

    if(req.hasConfig){
      this.drawRequestConfig(req, list);
    }
  }
});
