class LightPawn {
    setup() {
        console.log("LightPawn");
        /*
          let trm = this.service("ThreeRenderManager");
          let scene =  trm.scene;
          let camera = trm.camera;
        */
        let group = this.shape;
        let THREE = Microverse.THREE;

        this.removeLights();
        this.lights = [];

        const ambient = new THREE.AmbientLight( 0xffffff, .9 );
        group.add(ambient);
        this.lights.push(ambient);

        const sun = new THREE.DirectionalLight( 0xffffff, 1 );
        sun.position.set(1, 150, 4);
        sun.castShadow = true;
        sun.shadow.blurSamples = 25;
        sun.shadow.camera.left = 25;
        sun.shadow.camera.right = -25;
        sun.shadow.camera.top = 25;
        sun.shadow.camera.bottom = -25;
        sun.shadow.mapSize.width = 2048; // default
        sun.shadow.mapSize.height = 2048; // default
        group.add(sun);
        this.lights.push(sun);

        const sunTarget = new THREE.Object3D();
        sunTarget.position.set(1, 0, 8);
        group.add(sunTarget);
        this.lights.push(sunTarget);
        sun.target = sunTarget;

        this.constructBackground(this.actor._cardData);

        let moduleName = this._behavior.module.externalName;
        this.addUpdateRequest([`${moduleName}$LightPawn`, "update"]);

        this.listen("updateShape", "updateShape");
    }

    removeLights() {
        if (this.lights) {
            [...this.lights].forEach((light) => {
                if (light.dispose) {
                    light.dispose();
                }
                this.shape.remove(light);
            });
        }
        delete this.lights;

        if (this.csm) {
	    for ( let i = 0; i < this.csm.lights.length; i ++ ) {
	        this.csm.parent.remove( this.csm.lights[ i ].target );
	    }
            this.csm.remove();
            this.csm.dispose();
            delete this.csm;
        }
    }

    teardown() {
        console.log("teardown lights");
        this.removeLights();
        let scene = this.service("ThreeRenderManager").scene;
        scene.background?.dispose();
        scene.environment?.dispose();
        scene.background = null;
        scene.environment = null;

    }

    updateShape(options) {
        this.constructBackground(options);
    }

    constructBackground(options) {
        let assetManager = this.service("AssetManager").assetManager;
        let dataType = options.dataType;
        if (!options.dataLocation) {return;}
        return this.getBuffer(options.dataLocation).then((buffer) => {
            return assetManager.load(buffer, dataType, Microverse.THREE, options).then((texture) => {
                let TRM = this.service("ThreeRenderManager");
                let renderer = TRM.renderer;
                let scene = TRM.scene;
                let pmremGenerator = new Microverse.THREE.PMREMGenerator(renderer);
                pmremGenerator.compileEquirectangularShader();

                let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
                let exrBackground = exrCubeRenderTarget.texture;

                let bg = scene.background;
                let e = scene.environment;
                scene.background = exrBackground;
                scene.environment = exrBackground;
                if(e !== bg) if(bg) bg.dispose();
                if(e) e.dispose();
                texture.dispose();
            }).then(() => {
                if (this.actor._cardData.loadSynchronously) {
                    this.publish(
                        this.sessionId, "synchronousCardLoaded", {id: this.actor.id});
                }
            });
        });
    }

    update(_time) {
        if(this.csm) this.csm.update();
    }
}

export default {
    modules: [
        {
            name: "Light",
            pawnBehaviors: [LightPawn]
        }
    ]
}

/* globals Microverse */
