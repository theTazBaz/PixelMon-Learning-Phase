class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        const map = this.make.tilemap({ key: 'dungeon' });
        const tileset1 = map.addTilesetImage('dugeon_walls', 'walls');
        const tileset2 = map.addTilesetImage('dungeon_ground', 'floor');

        const groundLayer = map.createLayer('ground', tileset2, 0, 0);
        this.wallLayer = map.createLayer('wall', tileset1, 0, 0); 
        this.wallLayer.setCollisionByProperty({ collides: true });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

        this.player = this.physics.add.sprite(100, 100, "player");
        this.coins = this.physics.add.group();

        this.player.setSize(8, 8);
        this.player.setOffset(12, 12);

        this.anims.create({
            key: "player_stand",
            frames: this.anims.generateFrameNames("player", { prefix: "stand", end: 3, zeroPad: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", { start: 2, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        const coinLocations = [
            { x: 20, y: 100 },
            { x: 200, y: 100 },
            { x: 335, y: 125 },
            { x: 335, y: 185 },
            { x: 300, y: 235 },
            { x: 200, y: 235 },
            { x: 80, y: 190 },
            { x: 80, y: 180 },
            { x: 90, y: 180 },
            { x: 90, y: 190 },
            { x: 80, y: 230 },
            { x: 80, y: 240 },
            { x: 90, y: 230 },
            { x: 90, y: 240 },
            { x: 40, y: 205 },
            { x: 40, y: 215 },
            { x: 50, y: 205 },
            { x: 50, y: 215 },
        ];

        coinLocations.forEach((location) => {
            let coin = this.coins.create(location.x, location.y, "coin");

            coin.setScale(0.5);

            if (Math.random() > 0.5) {
                coin.play("red");
            } else {
                coin.play("gray");
            }

            coin.setCollideWorldBounds(true);
        });

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            font: '24px Arial',
            fill: '#ffffff'
        });

        this.scoreText.setPosition(180, 30);

        this.highestScore = localStorage.getItem('highestScore') || 0;
        this.highestScoreText = this.add.text(16, 16, 'Highest Score: ' + this.highestScore, {
            font: '24px Arial',
            fill: '#ffffff'
        });
        this.highestScoreText.setPosition(120,2)

        this.player.play("player_stand");
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.wallLayer);

        this.physics.add.collider(this.player, this.coins, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        coin.destroy();

        this.score += 10;

        this.scoreText.setText('Score: ' + this.score);

        if (this.score > this.highestScore) {
            this.highestScore = this.score;
            this.highestScoreText.setText('Highest Score: ' + this.highestScore);

            localStorage.setItem('highestScore', this.highestScore);
        }
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
