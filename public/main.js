var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, scenery, plants, dude, cursors, ground, money;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Desert', 'desert');

  background = map.createLayer('Background');
  scenery = map.createLayer('Scenery');
  plants = map.createLayer('Plants');
  ground = map.createLayer('Ground');
  plants.resizeWorld();

  map.setCollision([1, 2, 3, 9, 10, 11, 17, 18, 19], true, 'Ground');

  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  // args = Layer to pull, gid of object, name of sprite asset, frame on spritesheet, ???, ???, name of group
  map.createFromObjects('Money', 49, 'coin', 0, true, false, money);

  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(50, 250, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.collideWorldBounds = true;
  // dude.body.gravity.x = 3000;
  game.camera.follow(dude);

  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  game.physics.arcade.collide(dude, ground);

  dude.body.velocity.x = dude.body.velocity.y = 0;
  if(cursors.left.isDown){
    dude.body.velocity.x = -150;
    dude.animations.play('left');
  }
  else if(cursors.right.isDown){
    dude.body.velocity.x = 150;
    dude.animations.play('right');
  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }
  if(cursors.up.isDown){
    dude.body.velocity.y = -150;
  }
  if(cursors.down.isDown){
    dude.body.velocity.y = 150;
  }
}
