import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Item from "./Item.js";

export default class Cena1 extends Phaser.Scene {
    constructor() {
        super('Cena1');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    preload() {
        Player.preload(this, 'king');
        Enemy.preload(this, 'thief');
        Enemy.preload(this, 'elite_knight');
        Item.preload(this, 'pocao');
        Item.preload(this, 'key');
        this.load.image('tiles1', 'assets/images/RPG Nature Tileset.png');
        this.load.image('tiles2', 'assets/images/objects/ItemPack_Outline_Black.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');
    }

    createPotions() {
        //this.potions = this.add.group();
    }

    collectPocao() {
        //alert('pocao');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });

        const tileset1 = map.addTilesetImage('RPG Nature Tileset', 'tiles1', 32, 32, 0, 0);
        //const tileset2 = map.addTilesetImage('ItemPack_Outline_Black', 'tiles2', 24, 24, 0, 0);
        const layer1 = map.createStaticLayer('Camada de Tiles 1', tileset1, 0, 0);
        const layer2 = map.createStaticLayer('Camada de Tiles 2', tileset1, 0, 0);
        //const layer3 = map.createStaticLayer('Camada de Tiles 3', tileset2, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);

        this.player = new Player({ scene: this, x: 50, y: 50, texture: 'king', frame: 'king_r_idle_1', hp: 3 });
        let enemy1 = new Enemy({ scene: this, x: 155, y: 60, texture: 'thief', frame: 'thief_idle_1', hp: 2 }).create('thief');
        let enemy2 = new Enemy({ scene: this, x: 450, y: 60, texture: 'thief', frame: 'thief_idle_1', hp: 2 }).create('thief');
        let enemy3 = new Enemy({ scene: this, x: 350, y: 200, texture: 'thief', frame: 'thief_idle_1', hp: 2 }).create('thief');
        let enemy4 = new Enemy({ scene: this, x: 500, y: 400, texture: 'elite_knight', frame: 'largeeliteknight_idle_1', hp: 4 }).create('elite_knight');
        let pocao1 = new Item({ scene: this, x: 170, y: 90, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let pocao2 = new Item({ scene: this, x: 250, y: 90, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let pocao3 = new Item({ scene: this, x: 400, y: 90, texture: 'pocao', frame: 'pocao_idle_1' }).create('potion');
        let key1 = new Item({ scene: this, x: 480, y: 390, texture: 'key', frame: 'key_idle_1' });
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.O,
            defense: Phaser.Input.Keyboard.KeyCodes.P,
            catch: Phaser.Input.Keyboard.KeyCodes.I
        });

        //enemy1.update();
        //this.physics.add.overlap(this.player, this.pocao1, collectPocao, null, this);
    }

    update() {
        this.player.update();
        // this.enemy1.update();
        // this.enemy2.update();
        // this.enemy3.update();
        // this.enemy4.update();
        // this.pocao1.update();
        // this.pocao2.update();
        // this.pocao3.update();
        // this.key1.update();
    }
}