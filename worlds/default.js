export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/diverse";
    Constants.UserBehaviorModules = [
        "lights.js", "bubble.js", "spriteSound.js", "ambientSound.js", "splashScreen.js"
    ];

    async function hasXR() {
        try {
            return await navigator.xr.isSessionSupported("immersive-ar");
        } catch (_) {
            return false;
        }
    }

    hasXR().then((isSupported) => {
        if (isSupported) {
            Constants.DefaultCards = [
                {
                    card: {
                        name: "splash screen",
                        translation: [0, 0, -2],
                        layers: ["pointer"],
                        type: "object",
                        behaviorModules: ["SplashScreen", "AmbientSound"],
                        sound: "./assets/sounds/tevo.mp3",
                        textureLocation: "./assets/images/splash.png",
                        loop: true,
                        splashScreen: true,
                    }
                },
                {
                    card: {
                        name: "light",
                        layers: ["light"],
                        type: "lighting",
                        behaviorModules: ["Light"],
                    }
                },
                {
                    card: {
                        name: "bubble box",
                        translation: [0, 0, -2],
                        behaviorModules: ["BubbleBox"],
                        type: "object",
                    }
                },
                {
                    card: {
                        name: "dynalab",
                        translation: [0, 1, -4],
                        // rotation: [0, -Math.PI / 2, 0],
                        scale: [0.7, 0.7, 0.7],
                        type: "2d",
                        textureType: "image",
                        textureLocation: "3BGpBXkpV9coWx6zMWorilvkUn4P856H2wYmCwKITE8wKjY2MjF4bW0kKy4nMWw3MWwhMC0zNyc2bCstbTdtOBc2NRINOAQ3DRFzCSslDxgrd3F7OgQGBXpycG0rLWwhMC0zNyc2bC8rITAtNCcwMSdsLi0hIy4mJzQmJyQjNy42bXMwFTIBACwUCRUYNyUGCB0dexQVLDUgATQFOjFyNilwKytwIHAdOwsTCg9tJiM2I20bCXEVDS8KAXEIDRc6czMrBHouFgcSJhcYKgp6DBcVdTUnNhoHCgRxBwcX",
                        fullBright: true,
                        frameColor: 0xcccccc,
                        color: 0xbbbbbb,
                        cornerRadius: 0.1,
                        depth: 0.05,
                        shadow: true,
                    }
                },
            ];

        } else {
            Constants.DefaultCards = [
                {
                    card: {
                        name: "ambient sound",
                        translation: [0, 0, -2],
                        layers: ["pointer"],
                        type: "object",
                        behaviorModules: ["AmbientSound"],
                        sound: "./assets/sounds/tevo.mp3",
                        loop: true,
                    }
                },
                {
                    card: {
                        name: "world model",
                        type: "3d",
                        dataLocation: "3Kgecsw8EV-t-w5PB6RpOah-n31H0nuFKnIdDt96d7VwIz8_OzhxZGQtIicuOGU-OGUoOSQ6Pi4_ZSIkZD5kDC8dKTInAjgKIBooCRMveAwzKj0yPB4AHBISeWQiJGUoOSQ6Pi4_ZSYiKDkkPS45OC5kCn18PwMaJiURMx0gMicMFHsjLQYoPh4zHSJmDQ0jAjgfOwcmZiAhMjl6JGQvKj8qZCQDfRs9EzIHMw94Ah4mfnIaHCQyAT95LCobDTwPEno4CTxzcgk5OigUOBo",
                        fileName: "/artgallery_042122.glb.zip",
                        modelType: "zip",
                        dataScale: [1, 1, 1],
                        singleSided: true,
                        shadow: true,
                        layers: ["walk"],
                        translation: [0, -1.7, 0],
                        placeholder: true,
                        placeholderSize: [100, 0.01, 100],
                        placeholderColor: 0xcccccc,
                        placeholderOffset: [0, -1.7, 0],
                    }
                },
                {
                    card: {
                        name: "light",
                        layers: ["light"],
                        type: "lighting",
                        behaviorModules: ["Light"],
                        dataLocation: "./assets/sky/shanghai_riverside_2k.exr",
                        dataType: "exr",
                    }
                },
                {
                    card: {
                        name: "bubble box",
                        translation: [0, 0, -2],
                        behaviorModules: ["BubbleBox"],
                        type: "object",
                    }
                },
                {
                    card: {
                        name: "dynalab",
                        translation: [-12.1, 1.5, -10.18],
                        rotation: [0, Math.PI / 2, 0],
                        scale: [3, 3, 3],
                        type: "2d",
                        textureType: "image",
                        textureLocation: "35hx21Njx2Qq88GJL9vtaSGIhcAE1Ty9AlN52EAjdykUXUFBRUYPGhpTXFlQRhtARhtWR1pEQFBBG1xaGkAaT2BBQmV6T3NAemYEflxSeG9cAAYMTXNxcg0FBxpcWhtWR1pEQFBBG1hcVkdaQ1BHRlAbWVpWVFlRUENRUFNUQFlBGnRMQVBScQRYdn0FV1RGUVBBeHYEAwRiVkFbUmFNTQRscEUGRF8AbEBxAloaUVRBVBpgc0VXbGVnZnJGf2dsdmQGY35ScllXcGJqGAJ-Aw0YU1B_XUUHW3d_XANG",
                        fullBright: true,
                        frameColor: 0xcccccc,
                        color: 0xbbbbbb,
                        cornerRadius: 0.05,
                        depth: 0.05,
                        shadow: true,
                    }
                },
            ];
        }
    });
}
