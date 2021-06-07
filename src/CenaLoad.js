import { Scene } from 'phaser';

export default class CenaLoad extends Phaser.Scene {
    constructor() {
        super('CenaLoad');
    }

    loadImages() {
        this.load.image('TitleBG2','src/assets/images/TitleBG2.jpg');
        this.load.image('Logo','src/assets/images/Logo1.png');
        this.load.image('Play','src/assets/images/play_button.png');
        this.load.image('tiles1', 'src/assets/images/RPG Nature Tileset.png');
        this.load.image('tiles2', 'src/assets/images/objects/ItemPack_Outline_Black.png');
    }

    loadAudio() {
        this.load.audio('Intro', 'src/assets/audios/Intro.mp3');
        this.load.audio('Hit', 'src/assets/audios/Hit.mp3');
        this.load.audio('Effect', 'src/assets/audios/IncreaseDamage.mp3');
        // this.load.audio('Scenes', 'src/assets/audios/Scenes.mp3');
    }
    
    loadSprites(frameConfig) {
        this.load.spritesheet('King', 'src/assets/images/king.png', frameConfig);
    }

    loadTilemapTiledJSON() {
        this.load.tilemapTiledJSON('map', 'src/assets/images/map.json');
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Carregando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 80,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', (file) => {
            assetText.setText('Carregando asset: ' + file.key);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        //carrega som, spritesheets e imagens
        this.loadAudio();
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });
        this.loadImages();
        this.loadTilemapTiledJSON();
    }

    create() 
    {
        this.scene.start('CenaMenu');
    }
}