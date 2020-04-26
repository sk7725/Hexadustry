
const copperwall = extendContent(Block, "copperwall", {
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name), tile.drawx()+(Math.floor(tile.x)%2)*Vars.tilesize/2, tile.drawy());
  }
});
