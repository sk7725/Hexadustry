const shadowcolor=new Color(0,0,0,0.71);
const thoriumwall = extendContent(Wall, "thoriumwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.y)%2)*Vars.tilesize/2, tile.drawy());
  }
});
