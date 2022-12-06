class BubbleBoxActor {
    setup() {
        this.createCard({
            translation: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            layers: ["pointer"],
            name: "smiling face with hearts",
            dataLocation: "3uM3aMVolEoiVLs3wV9bSK9XJDU5yDIZ0wQAVBQv3X4AHQEBBQZPWloTHBkQBlsABlsWBxoEABABWxwaWgBaMhEjFwwZPAY0HiQWNy0RRjINFAMMAiA-IiwsR1ocGlsWBxoEABABWxgcFgcaAxAHBhBaADMlBxdCMTkzM007ARQdEkMEPScXMBwgFhESHC0jD0MEPDsaEhpEITQtRVoRFAEUWgdFDQdNHBscJRo_LCwGQQ8RRC0bOUYgOxEgGC8eFkUtDxYYQ0IMPUUXDAI",
            dataScale: [0.2, 0.2, 0.2],
            fileName: "/smiling_face_with_hearts.glb",
            modelType: "glb",
            shadow: true,
            singleSided: true,
            type: "3d",
            parent: this,
            behaviorModules: ["Emoji"],
        });
        this.step();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    step() {
        const x = Math.sin(this.now()) * this.getRandomInt(4);
        const z = Math.cos(this.now()) * this.getRandomInt(3);
        this.createCard({
            translation: [x, -2, z],
            name: "bubble",
            type: "object",
            layers: ["pointer"],
            parent: this,
            behaviorModules: ["Bubble"],
        });
        this.future(2000).step();
    }
}

class BubbleActor {
    setup() {
        this.step()
        this.addEventListener("pointerDown", "toggle");
    }

    step() {
        if (this._translation[1] > 2) {
            this.destroy();
            return;
        }
        const t = this._translation;
        const nextPosition = [t[0], t[1] + 0.015, t[2]];
        this.translateTo(nextPosition);
        this.future(20).step();
    }

    toggle() {
        this.publish("goTo", "goTo", this._translation);
    }
}

class BubblePawn {
    setup() {
        const bubbleGeometry = new THREE.SphereGeometry(0.4, 32, 16);
        const bubbleMaterial = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            transmission: 0.95,
            thickness: 0.2,
        });
        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        this.shape.add(bubble);
    }
}

class EmojiActor {
    setup() {
        this.subscribe("goTo", "goTo", this.goTo);
        this.running = false;
    }

    goTo(position) {
        this.translateTo(position);
        if (this.running === false) {
            this.running = true;
            this.step();
        }
    }

    step() {
        if (this._translation[1] > 2) {
            this.translateTo([0, 0, 0]);
            this.running = false;
            return;
        }
        const t = this._translation;
        const nextPosition = [t[0], t[1] + 0.015, t[2]];
        this.translateTo(nextPosition);
        this.future(20).step();
    }
}

export default {
    modules: [
        {
            name: "BubbleBox",
            actorBehaviors: [BubbleBoxActor],
        },
        {
            name: "Bubble",
            actorBehaviors: [BubbleActor],
            pawnBehaviors: [BubblePawn],
        },
        {
            name: "Emoji",
            actorBehaviors: [EmojiActor],
        },
    ]
}

