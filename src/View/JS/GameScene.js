class GameScene extends Phaser.Scene{
    constructor(){
        super({key: "GameScene"});
    };

    preload(){
        this.load.image("livePlayer", "assets/aliveSprite.png");
        this.load.image("infected", "assets/infectedSprite.png");
        this.load.image('background', "assets/Untitled-1.png");


    }

    create(){
        this.physics.startSystem(Phaser.Physics.ARCADE)

        
    }

}