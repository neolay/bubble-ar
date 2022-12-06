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
    }
}

export default {
    modules: [
        {
            name: "BubbleBox",
            actorBehaviors: [BubbleBoxActor],
        },
    ]
}

