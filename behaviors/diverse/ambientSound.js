class AmbientSoundPawn {
    setup() {
        this.file = this.actor._cardData.sound;
        this.loop = this.actor._cardData.loop || false;
        this.volume = this.actor._cardData.volume || 0.25;
        this.splashScreen = this.actor._cardData.splashScreen || false;
        if (this.splashScreen) {
            this.addEventListener("pointerDown", "start");
        } else {
            this.start();
        }
    }

    start() {
        this.audio = new Audio(this.file);
        this.audio.loop = this.loop;
        this.audio.volume = this.volume;
        if (this.audio) {
            this.audio.currentTime = 0;
            this.audio.play();
        }
        if (this.splashScreen) {
            this.removeEventListener("pointerDown", "start");
        }
    }
}

export default {
    modules: [
        {
            name: "AmbientSound",
            pawnBehaviors: [AmbientSoundPawn],
        }
    ]
}
