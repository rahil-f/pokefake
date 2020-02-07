const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);
var speed = 300;

function preload() {
    //Chargement image
    this.load.image("mario-tiles", "assets/mario.png");
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image("tiles", "assets/maps/zizi.png");
    this.load.tilemapTiledJSON('map', 'assets/maps/tuxemon-town.json');
}

function create() {
    //setup + affichag
    /* const level = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
        [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
        [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
        [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
    ];

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage("mario-tiles");
    const layer = map.createStaticLayer(0, tiles, 0, 0); */

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    this.player = this.physics.add.sprite(352, 1200, 'player', 1);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    worldLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, worldLayer);
    aboveLayer.setDepth(10);
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'dowm',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 1 }],
        frameRate: 20
    });
}

function update() {
    //Logique du jeu
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -speed;
        this.player.anims.play("left", true)
    } else if (this.cursors.right.isDown) {
        this.player.anims.play("right", true)
        this.player.body.velocity.x = speed;
    } else if (this.cursors.up.isDown) {
        this.player.anims.play("up", true)
        this.player.body.velocity.y = -speed;
    } else if (this.cursors.down.isDown) {
        this.player.anims.play("down", true)
        this.player.body.velocity.y = speed;
    } else {
        this.player.anims.play("turn", true)
    }
    /* 
        if (this.player.inWorld == false) {
            this.restart();
        } */
}