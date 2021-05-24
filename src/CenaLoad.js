
export default class CenaLoad extends Phaser.Scene {
    constructor() {
        super('CenaLoad');
    }

    loadImages() {
        this.load.image('TitleBG2','../assets/images/TitleBG2.png');
        this.load.image('Logo','../assets/images/Logo.png');
        this.load.image('Play','../assets/images/play_button.png');
        this.load.image('Options','../assets/images/options_button.png');
    }

    loadAudio() {
        this.load.audio('Intro', '../assets/audios/Intro.mp3');
        //this.load.audio('Scenes', '../assets/audios/Scenes.mp3');
    }
    
    loadSprites(frameConfig) {
        this.load.spritesheet('King', '../assets/images/king.png', frameConfig);
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

        // for (let i = 0; i < 500; i++) {
        //     this.load.image('logo'+i, '../assets/images/Logo.png');
        // }
    }

    create() 
    {
        this.scene.start('CenaMenu');
    }
}