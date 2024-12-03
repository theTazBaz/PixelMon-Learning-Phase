
class scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("walls","assets/walls_high_16x32.png");
        this.load.image("floor","assets/floor_16x16.png");
        this.load.image("tiles","assets/tileset.png");
        this.load.tilemapTiledJSON("dungeon", "assets/dungeons01.json");
        this.load.atlas("player","assets/spritesheet.png","assets/sprites.json");
        this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",
            {
                frameWidth: 16,
                frameHeight: 16
            }
          );
    }
    create(){
        this.add.text(20,20,"Loading Game .....");
        this.scene.start("playGame");
    }
}