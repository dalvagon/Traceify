import { GLTF } from 'node_modules/@types/three/examples/jsm/loaders/GLTFLoader.d';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private clientWidth!: number;
  private clientHeight!: number;
  private model!: GLTF;
  private mouseX = 0;
  private mouseY = 0;

  constructor(private ngZone: NgZone) { }

  /**
   * On init, set the dimensions of the canvas and create the scene then animate it
   */
  ngOnInit(): void {
    if (this.canvasRef) {
      this.clientHeight = this.canvasRef.nativeElement.clientHeight;

      this.setDimensions();
      this.createScene();
      this.animate();
    }
  }

  /**
   * Set the dimensions of the canvas
   */
  setDimensions() {
    const parent = this.canvasRef.nativeElement.parentElement;

    if (parent) {
      this.clientWidth = parent.clientWidth;
    }
  }

  /**
   * Create the renderer and the scene and add the model to it
   */
  createScene() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.clientWidth, this.clientHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      1,
      this.clientWidth / this.clientHeight,
      1,
      1000
    );
    this.camera.position.z = 300;
    this.scene.add(this.camera);

    this.light = new THREE.AmbientLight(new THREE.Color('#2F4858'), 0.9);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const loader = new GLTFLoader();
    loader.load('assets/scene.gltf', (gltf) => {
      this.model = gltf;
      this.scene.add(gltf.scene);
    });
  }

  /**
   * Animate the scene and resize the canvas when the window is resized
   */
  animate() {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener(
        'resize',
        () => {
          this.resize();
        },
        false
      );

      window.addEventListener('mousemove', (event) => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
      });
    });
  }

  /**
   * Render the scene and update the model position and rotation based on the mouse position
   * Run the render function again on the next frame
   */
  render() {
    requestAnimationFrame(() => this.render());

    if (this.model) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratationX = ((this.mouseX / width) * 2 - 1) * 0.7;
      const ratationY = ((this.mouseY / height) * 2 - 1) * 0.7;
      this.model.scene.rotation.y = -ratationX;
      this.model.scene.rotation.x = -ratationY;
      this.model.scene.rotation.z = -(ratationX + ratationY) / 2;
      this.model.scene.position.y = (ratationX + ratationY) / 2 - 0.5;

      // const ratationX = 0.3;
      // const ratationY = 0.01;
      // this.model.scene.rotation.y += -ratationX;
      // // this.model.scene.rotation.z += -ratationY;
      // this.model.scene.position.y = (ratationX + ratationY) / 2 - 0.5;
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resize the canvas when the window is resized
   */
  resize() {
    this.setDimensions();
    this.camera.aspect = this.clientWidth / this.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.clientWidth, this.clientHeight);
  }

  /**
   * Open the ethereum website in a new tab
   */
  goToEthereumWebsite() {
    window.open('https://ethereum.org/', '_blank');
  }
}
