    var config ={
        type: Phaser.AUTO,
        width: 400,
        height: 300,
        backgroundColor: 0x00000,
        scene: [scene1,scene2],
        
        scale: {
            zoom:2
        },
        physics: {
            default: 'arcade', 
            arcade: {
                debug: false          
            }
        }
    };
    var game = new Phaser.Game(config);
