class SplashScreenPawn {
    setup() {
        this.loadSplashScreen();
        this.addEventListener("pointerDown", "trigger");
    }

    loadSplashScreen() {
        const size = 8.5;
        new THREE.TextureLoader().load(
            this.actor._cardData.textureLocation,
            splashTexture => {
                const w = splashTexture.image.width;
                const h = splashTexture.image.height;
                this.fadeIn = new THREE.Mesh(new THREE.PlaneGeometry(size, size * h / w),
                    new THREE.MeshBasicMaterial({
                        color: 0xFFFFFF, fog: false, transparent: true, opacity: 1.0, map: splashTexture,
                        depthTest: false, depthWrite: false, side: THREE.DoubleSide, toneMapped: false
                    }));
                this.fadeIn.position.z = -2;
                this.fadeIn.renderOrder = 1000;
                this.shape.add(this.fadeIn);
            }
        );
    }

    trigger() {
        this.fadeAway(1);
    }

    fadeAway(alpha) {
        alpha -= 0.05;
        if (alpha > 0) {
            this.fadeIn.material.opacity = alpha;
            this.future(50).fadeAway(alpha);
            return;
        }
        this.disposeFadeIn();
    }

    disposeFadeIn() {
        if (this.fadeIn) {
            this.fadeIn.removeFromParent();
            this.fadeIn.geometry.dispose();
            this.fadeIn.material.dispose();
            this.fadeIn = undefined;
            const render = this.service("ThreeRenderManager");
            if (render) render.dirtyAllLayers();
        }
        this.removeEventListener("pointerDown", "trigger");
    }
}

export default {
    modules: [
        {
            name: "SplashScreen",
            pawnBehaviors: [SplashScreenPawn],
        }
    ]
}
