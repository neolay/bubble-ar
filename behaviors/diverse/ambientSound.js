class AmbientSoundPawn {
    setup() {
        this.file = this.actor._cardData.sound;
        this.loop = this.actor._cardData.loop || false;
        this.volume = this.actor._cardData.volume || 0.25;
        this.splashScreen = this.actor._cardData.splashScreen || false;
        if (this.splashScreen) {
            this.handler = () => this.start();
            document.addEventListener("click", this.handler);
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
        if (this.handler) {
            document.removeEventListener('click', this.handler);
            delete this.handler;
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
