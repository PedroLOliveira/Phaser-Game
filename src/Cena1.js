import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Item from "./Item.js";
import Door from "./Door.js";

export default class Cena1 extends Phaser.Scene {
    constructor() {
        super('Cena1');
    }

    preload() {
        Player.preload(this, 'king');
        Enemy.preload(this, 'thief');
        Enemy.preload(this, 'elite_knight');
        Item.preload(this, 'pocao');
        Item.preload(this, 'lever');
        Door.preload(this, 'stone');
        this.load.image('blood', './src/assets/images/blood.png');
    }

    collisionStarter() {
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyA.label.replace(/[0-9]/g, '') === 'enemySensor')) {
                console.log('inimigo atraído');
                this.UI.interactEnemy(this, bodyA, bodyB, 'agro', 1);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'itemCollider') || (bodyB.label === 'playerCollider' && bodyA.label.replace(/[0-9]/g, '') === 'itemCollider')) {
                this.UI.interactItem(this, bodyA, bodyB);
            }
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider') || (bodyB.label === 'playerSensor' && bodyA.label.replace(/[0-9]/g, '') === 'enemyCollider')) {
                console.log('inimigo dentro do alcance');
                this.UI.interactEnemy(this, bodyA, bodyB, 'attackable', 1);
            }
            if ((bodyA.label === 'playerCollider' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider') || (bodyB.label === 'playerCollider' && bodyA.label.replace(/[0-9]/g, '') === 'enemyCollider')) {
                if (!this.player.isAttacking)
                    this.UI.interactEnemy(this, bodyA, bodyB, 'getHit');
            }
        }, this);

        this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemySensor') || (bodyB.label === 'playerSensor' && bodyA.label.replace(/[0-9]/g, '') === 'enemySensor')) {
                console.log('atração encerrada');
                this.UI.interactEnemy(this, bodyA, bodyB, 'agro', 0);
            }
            if ((bodyA.label === 'playerSensor' && bodyB.label.replace(/[0-9]/g, '') === 'enemyCollider') || (bodyB.label === 'playerSensor' && bodyA.label.replace(/[0-9]/g, '') === 'enemyCollider')) {
                console.log('inimigo fora de alcance');
                this.UI.interactEnemy(this, bodyA, bodyB, 'attackable', 0);
            }
        }, this);
    }

    create() {
        this.UI = this.scene.get('CenaUI');
        this.map = this.make.tilemap({ key: 'map' });

        const tileset1 = this.map.addTilesetImage('RPG Nature Tileset', 'tiles1', 32, 32, 0, 0);
        this.layer1 = this.map.createLayer('Mapa 1 - Camada de Tiles 1', tileset1, 0, 0);
        this.layer2 = this.map.createLayer('Mapa 1 - Camada de Tiles 2', tileset1, 0, 0);
        this.layer1.setCollisionByProperty({ collides: true });
        this.layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.layer1);
        this.matter.world.convertTilemapLayer(this.layer2);

        this.player = new Player({ scene: this, x: 55, y: 40, texture: 'king', frame: 'king_r_idle_1', hp: this.UI.hp, damage: this.UI.damage });

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(2);

        this.enemies = [
            new Enemy({ scene: this, x: 155, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy1', hp: 3, damage: 1 }),
            new Enemy({ scene: this, x: 450, y: 60, texture: 'thief', frame: 'thief_idle_1', label: 'enemy2', hp: 3, damage: 1 }),
            new Enemy({ scene: this, x: 350, y: 200, texture: 'thief', frame: 'thief_idle_1', label: 'enemy3', hp: 3, damage: 1 }),
            new Enemy({ scene: this, x: 65, y: 400, texture: 'thief', frame: 'thief_idle_1', label: 'enemy4', hp: 3, damage: 1 }),
            new Enemy({ scene: this, x: 500, y: 400, texture: 'elite_knight', frame: 'largeeliteknight_idle_1', label: 'enemy5', hp: 6, damage: 1 })
        ];

        this.items = [
            new Item({ scene: this, x: 125, y: 470, texture: 'pocao', frame: 'pocao_idle_1', label: 'item1' }),
            new Item({ scene: this, x: 272, y: 138, texture: 'pocao', frame: 'pocao_idle_1', label: 'item2' }),
            new Item({ scene: this, x: 288, y: 270, texture: 'pocao', frame: 'pocao_idle_1', label: 'item3' }),
            new Item({ scene: this, x: 400, y: 365, texture: 'lever', frame: 'lever_idle_1', label: 'item4' })
        ];

        this.doors = [
            new Door({ scene: this, x: 215, y: 500, texture: 'stone', frame: 'stone_idle_1', label: 'door1' }),
            new Door({ scene: this, x: 243, y: 500, texture: 'stone', frame: 'stone_idle_1', label: 'door2' }),
            new Door({ scene: this, x: 271, y: 500, texture: 'stone', frame: 'stone_idle_1', label: 'door3' }),
            new Door({ scene: this, x: 299, y: 500, texture: 'stone', frame: 'stone_idle_1', label: 'door4' }),
            new Door({ scene: this, x: 327, y: 500, texture: 'stone', frame: 'stone_idle_1', label: 'door5' })
        ];

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.O,
            catch: Phaser.Input.Keyboard.KeyCodes.I
        });

        this.collisionStarter();

        this.cameras.main.on('camerafadeoutcomplete', function () {
            // if sleep to the hero is removed, includes a glitch that makes you jump to the next level if you die and catch a potion in sequence
            if (this.player.hp <= 0) {
                this.events.emit('died');
                this.scene.start('Cena1');
            }
            else this.scene.start('Cena2');
        }, this);

        var particles = this.add.particles('blood');

        this.emitter = particles.createEmitter({
            speed: 20,
            scale: { start: 1, end: 1 },
            blendMode: 'ADD'
        });

        this.emitter.stop();
    }

    update() {
        this.player.update();
        if (this.player.getCenter().y > 512) this.cameras.main.fade(500, 0, 0, 0);
        this.enemies.map(function(enemy, i) {
            enemy.update();
        });
    }
}