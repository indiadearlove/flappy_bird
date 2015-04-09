var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

  preload: function() {
    game.stage.backgroundColor = '#71c5cf';
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
  },

  create: function() {  
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //sprite bird
    this.bird = this.game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;  
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //pipes
    this.pipes = game.add.group(); 
    this.pipes.enableBody = true; 
    this.pipes.createMultiple(20, 'pipe');
  },

  update: function() {  
    if (this.bird.inWorld == false)
      this.restartGame();
  },

  jump: function() {  
    this.bird.body.velocity.y = -350;
  },

  restartGame: function() {  
    game.state.start('main');
  },

  addOnePipe: function(x, y) {  
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x, y);
    pipe.body.velocity.x = -200; 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},

};

game.state.add('main', mainState);  
game.state.start('main');