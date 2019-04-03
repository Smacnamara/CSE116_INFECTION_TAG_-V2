var config = {
    type: Phaser.AUTO,
    outerWidth: 800,
    outerHeight: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0}
        },
    },
    scene: [TitleScene, GameScene, YeetScene]

};

var game = new Phaser.Game(config)

