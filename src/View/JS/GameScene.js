class GameScene extends Phaser.Scene{
    constructor(){
        super({key: "GameScene"});
    };

    

    preload(){
        this.load.image("livePlayer", "assets/aliveSprite.png");
        this.load.image("infected", "assets/infectedSprite.png");
        this.load.image('backgroundGame', "assets/Untitled-1.png");
        this.load.image("barrier", "assets/barrier.png")


    };

    create(){
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.add.sprite(500, 500, "backgroundGame")
        this.walls = this.physics.add.staticGroup();
        this.player = this.add.sprite(150, 400, "livePlayer")

        var level = [
            "xxxxxxxxxxxxxxxxxxxxxxxxxx",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "x                        x",
            "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        ]

        for(var i = 0; i < level.length; i+=1 ){
            for(var j = 0; j < level[i].length; j += 1){
                if(level[i][j] == "x"){
                    this.walls.create(30+20*j, 30+20*i, "barrier");
                }
            }
        }
    }

    update() {
        this.physics.collide(this.player, this.walls)
    }

    

}