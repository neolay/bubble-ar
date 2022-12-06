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
            translation: [x, 0, z],
            name: "bubble",
            type: "object",
            layers: ["pointer"],
            parent: this,
            behaviorModules: ["Bubble"],
        });
        this.future(2000).step();
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

export default {
    modules: [
        {
            name: "BubbleBox",
            actorBehaviors: [BubbleBoxActor],
        },
        {
            name: "Bubble",
            pawnBehaviors: [BubblePawn],
        },
    ]
}

