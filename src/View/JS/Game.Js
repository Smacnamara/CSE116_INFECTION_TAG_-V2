var config = {
    type: Phaser.AUTO,
    outerWidth: 800,
    outerHeight: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 200}
        },
    },
    scene: [TitleScene]

};

var game = new Phaser.Game(config)

