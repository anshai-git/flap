import * as THREE from 'three';

// GLOBAL DATA
const G = {};

class Bird {
    constructor() {
        this.geometry = new THREE.CircleGeometry(0.25, 128);
        this.material = new THREE.MeshBasicMaterial({ color: 0x000040 });
        this.object   = new THREE.Mesh(this.geometry, this.material);
        
        this.y_velocity         = 0.03;
        this.jump_velocity      = 0;
        this.object.position.x  = -3.5;

        G.scene.add(this.object);
    }

    update() {
        this.object.position.y -= (this.y_velocity - this.jump_velocity);
        if(this.jump_velocity) {
            this.jump_velocity -= this.jump_velocity/50; }
        if(this.jump_velocity < 0.01) this.jump_velocity = 0;
    }

    jump() {
        this.jump_velocity = 0.1;
    }
}

G.scene             = new THREE.Scene();
G.scene.background  = new THREE.Color('rgb(255, 255, 255)');
G.camera            = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
G.camera.position.z = 5;
G.renderer          = new THREE.WebGLRenderer();
G.bird              = new Bird();
G.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(G.renderer.domElement);

document.addEventListener("keydown", (event) => {
    switch(event.code) {
        case "Space": {
            G.bird.jump();
        } break;
    }
});

function animate() {
	requestAnimationFrame( animate );
    update();
    render();
}

function update() {
    G.bird.update();
}

function render() {
	G.renderer.render(G.scene, G.camera);
}

function main() {
    animate();
}

main();
