import Phaser from 'phaser';
import CenaLoad from "./CenaLoad.js";
import CenaMenu from "./CenaMenu.js";
import CenaIntro from "./CenaIntro.js";
import Cena1 from "./Cena1.js";
import Cena2 from "./Cena2.js";
import Cena3 from "./Cena3.js";
import CenaUI from "./CenaUI.js";
import CenaFinal from "./CenaFinal.js";

const config = {
    width: 512,
    height: 512,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'RPG',
    scene: [
        CenaLoad,
        CenaMenu,
        CenaIntro,
        Cena1,
        Cena2,
        Cena3,
        CenaUI,
        CenaFinal
    ],
    scale: {
        zoom: 1.2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y:0}
        }
    }
}

new Phaser.Game(config);