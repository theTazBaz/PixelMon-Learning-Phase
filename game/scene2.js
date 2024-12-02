class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    
    create() {
        const map = this.make.tilemap({ key: 'dungeon' });
        const tileset1 = map.addTilesetImage('dugeon_walls', 'walls');
        const tileset2 = map.addTilesetImage('dungeon_ground', 'floor');

        const groundLayer = map.createLayer('ground', tileset2, 0, 0);
        const wallLayer = map.createLayer('wall', tileset1, 0, 0);
        wallLayer.setCollisionByProperty({ collides: true });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

        this.player = this.physics.add.sprite(100, 100, "player");

        
        this.player.setSize(8, 8);  
        this.player.setOffset(12, 12);   

        this.anims.create({
            key: "player_stand",
            frames: this.anims.generateFrameNames("player", {
                prefix: "stand",
                end: 3,
                zeroPad: 4
            }),
            repeat: -1
        });
        
        this.anims.create({
            key: "player_run",
            frames: this.anims.generateFrameNames("player", {
                prefix: "run",
                end: 1,
                zeroPad: 4
            }),
            repeat: -1
        });
        
        this.anims.create({
            key: "player_jump",
            frames: this.anims.generateFrameNames("player", {
                prefix: "jump",
                end: 2,
                zeroPad: 4
            }),
            repeat: -1
        });

        this.player.play("player_stand");

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, wallLayer);
    }
    
    update() {
        const speed = 100;
        
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.play("player_stand", true);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.flipX = true;
            this.player.play("player_run", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.flipX = false;
            this.player.play("player_run", true);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.play("player_jump", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.play("player_run", true);
        } else {
            this.player.setVelocityY(0);
        }
    }
}
