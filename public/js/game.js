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
    scene: {
        preload: preload,
        create: create,
        update: update
    } 
};

var game = new Phaser.Game(config)

var key_down
var WSpost
var playername = ""
var AliveSpeed = 150
var DeadSpeed = 170
var debug = false
/////////////////////////////////////////////////////////////////////
function preload() {
    this.load.image("livePlayer", "assets/NormalSprite.png");
    this.load.image("infected", "assets/ZombieSprite.png");
    this.load.image('backgroundGame', "assets/Untitled-1.png");
    this.load.image("barrier", "assets/barrier.png")
}
/////////////////////////////////////////////////////////////////////
function create() {
  var self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();
  this.otherHumans = this.physics.add.group();
  this.otherZombies = this.physics.add.group();
  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });

  this.add.sprite(500, 500, "backgroundGame")
  this.walls = this.physics.add.staticGroup();

    var level = [
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "x                        x                        x",
        "x                        x                        x",
        "x                        x                        x",
        "x                        x                        x",
        "x                        x                        x",
        "x                        x                        x",
        "x                        x                        x",
        "xxxxxxx            xxxxxxxxxxxxxxxxxxxxxxxxx      x",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "xxxxxxxxxx",
        "xxxxx",
        "xx                                      xxxxxxxxxxx",
        "                                              xxxxx",
        "                                                  x",
        "                      xxxxxxxx",
        "                      xxxxxxxx",
        "                         xxxxx",
        "",
        "",
        "            xxxxxx                     xxxxxxxxxxx ",
        "   xxx",
        "",
        "",
        "",
        "     xxxxxxxxxxxx",
        "     xxxxxxx",
        "     xxx" 
    ]

    for(var i = 0; i < level.length; i+=1 ){
        for(var j = 0; j < level[i].length; j += 1){
            if(level[i][j] == "x"){
                this.walls.create(10+20*j, 10+20*i, "barrier");
            }
        }
    }

    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket.on('UpdatePlayer', function (playerInfo) {
        self.otherHumans.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.x = playerInfo.x
                otherPlayer.y = playerInfo.y
                var oldinfo = otherPlayer.team
                otherPlayer.team = playerInfo.team
            }
            if (otherPlayer.team == 'zombie' && oldinfo == 'human') {
                addOtherPlayers(self, otherPlayer)
                otherPlayer.destroy()
                otherHumans.remove(otherPlayer)
            }
          });
        self.otherZombies.getChildren().forEach(function (otherZomb) {
            if (playerInfo.playerId === otherZomb.playerId) {
                otherZomb.x = playerInfo.x
                otherZomb.y = playerInfo.y
                otherZomb.team = playerInfo.team
            }
        });
      });
/*
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        console.log("x: " + Math.abs(otherPlayer.x - this.player.x) + ", y: " + Math.abs(otherPlayer.y - this.player.y))
    if(otherPlayer.team == 'zombie') {
        if(Math.abs(otherPlayer.x - this.player.x) < 5 && Math.abs(otherPlayer.y - this.player.y) < 5) {
            this.player.destroy()
            this.player = this.physics.add.sprite(xpos, ypos, "infected")
            this.player.setCollideWorldBounds(true)
            this.player.team = 'zombie'
        }
    }
    });*/
}

function update() {
    
    this.physics.collide(this.player, this.walls, function(){
        //alert("You've collided a wall")
    }, null, this)

    if (this.player) {
        if (this.key_A.isDown){
            this.player.body.velocity.x = -AliveSpeed
        }else if (this.key_D.isDown){
            this.player.body.velocity.x = AliveSpeed;
        }else {
            this.player.body.velocity.x = 0
        }
        if (this.key_W.isDown){
            this.player.body.velocity.y = -AliveSpeed
        }else if (this.key_S.isDown){
            this.player.body.velocity.y = AliveSpeed;
        }else {
            this.player.body.velocity.y = 0
        }

        
        this.physics.overlap(this.player, this.otherZombies, function(){
            var xpos = this.player.x;
            var ypos = this.player.y;
            this.player.destroy()
            this.player = this.physics.add.sprite(xpos, ypos, "infected")
            this.player.setCollideWorldBounds(true)
            this.player.team = 'zombie'
        },null, this)

        /*
        //Needs to be fixed.
        if (this.player.team == 'human') {
            console.log('I am human, checking for zombie bites.')
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (otherPlayer.team == 'zombie') {
                    console.log('Zombie just approached me, did they bite?')
                    this.physics.overlap(this.player, otherPlayers, function(){
                        console.log('Im bit. RIP')
                        //this.player.destroy()
                        this.player = this.physics.add.sprite(xpos, ypos, "infected")
                        this.player.setCollideWorldBounds(true)
                        //this.player.team = 'zombie'
                    },null, this)
                }
            });
        }*/
        //////////

        var xpos = this.player.x;
        var ypos = this.player.y;
        var tagged = this.player.team

        if (this.player.previouslocation && (tagged !== this.player.previouslocation.team || xpos !== this.player.previouslocation.x || ypos !== this.player.previouslocation.y)) {
            this.socket.emit('PlayerUpdated', {team: tagged, x: xpos, y: ypos})
        }
        
        this.player.previouslocation = {
            team: tagged,
            x: xpos,
            y: ypos
        }

    }
}
/////////////////////////////////////////////////////////////////////
function addPlayer(self, playerInfo) {
  if (playerInfo.team == 'human') {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, "livePlayer").setOrigin(0.5, 0.5).setDisplaySize(60, 60);
  } else {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, "infected").setOrigin(0.5, 0.5).setDisplaySize(60, 60);
  }
  self.player.setCollideWorldBounds(true);
  self.player.body.bounce.x = 0.5
  self.player.body.bounce.y = 0.5
}

function addOtherPlayers(self, playerInfo) {
    var otherPlayer = null
    if (playerInfo.team == 'human') {
        otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, "livePlayer").setOrigin(0.5, 0.5).setDisplaySize(60, 60);
        otherPlayer.playerId = playerInfo.playerId;
        self.otherHumans.add(otherPlayer);
    } else {
        otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, "infected").setOrigin(0.5, 0.5).setDisplaySize(60, 60);
        otherPlayer.playerId = playerInfo.playerId;
        self.otherZombies.add(otherPlayer);
    }
}
/////////////////////////////////////////////////////////////////////
