class InfectedScene extends Phaser.Scene{
    constructor(){
        super({key: "InfectedScene"})
    }

    preload(){
        this.load.image("livePlayer", "assets/aliveSprite.png");
        this.load.image("infected", "assets/infectedSprite.png");
        this.load.image('backgroundGame', "assets/Untitled-1.png");
        this.load.image("barrier", "assets/barrier.png")
    }

    create(){

    }

    update(){

    }
}