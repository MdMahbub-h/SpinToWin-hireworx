export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        this.load.setPath("assets");
        this.load.image("logo", "loading.png");
        this.load.image("circleLight", "circleLight.png");
        this.load.image("front", "front.png");
        this.load.image("pointer", "pointer.png");
        this.load.image("start", "start.png");
        this.load.image("startPressed", "startPressed.png");
        this.load.image("wheel", "wheel.png");
        this.load.image("rightChips", "rightChips.png");
        this.load.image("leftChips", "leftChips.png");
        this.load.image("paperThrown", "paperThrown.png");
        this.load.image("iconBright", "iconBright.png");
        this.load.image("gameBg", "background.png");
        this.load.image("bottomLightDim", "bottomLightDim.png");
        this.load.image("bottomLightBright", "bottomLightBright.png");
        this.load.image("coins", "coins.png");
        this.load.image("resultBg", "resultBg.png");
        this.load.image("spinAgainBtn", "spinAgainBtn.png");
        this.load.image("shineBg", "shineBg.png");
        this.load.image("bottomLogo", "bottomLogo.png");

        // this.load.video("bgVideo", "bgVideo.mp4", "loadeddata", true, true);

        this.load.audio("spinSound1", "spin.mp3");
        this.load.audio("spinSound2", "spin-sound.mp3");
        this.load.audio("congrats", "congrats.mp3");
        this.load.audio("loseSound", "lose-sound.mp3");
    }

    create() {
        const config = {
            image: "logo",
            width: 31,
            height: 25,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
            charsPerRow: 10,
            spacing: { x: 1, y: 1 },
        };
        this.cache.bitmapFont.add(
            "logo",
            Phaser.GameObjects.RetroFont.Parse(this, config)
        );

        this.scene.start("SplashScene");
    }
}
