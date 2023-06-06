import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import THREEx from 'threex.terrain'; // Make sure to install threex.terrain package

const ThreeScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, mesh, onRenderFcts, lastTimeMsec;

    const init = () => {
      // Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Append to HTML
      containerRef.current.appendChild(renderer.domElement);

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.z = 15;
      camera.position.y = 2;

      // Fog
      scene.fog = new THREE.Fog(0x000, 0, 45);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x202020);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight('white', 5);
      directionalLight1.position.set(0.5, 0.0, 2);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight('white', 0.75 * 2);
      directionalLight2.position.set(-0.5, -0.5, -2);
      scene.add(directionalLight2);

      // Height Map and Geometry
      const heightMap = THREEx.Terrain.allocateHeightMap(256, 256);
      THREEx.Terrain.simplexHeightMap(heightMap);
      const geometry = THREEx.Terrain.heightMapToPlaneGeometry(heightMap);
      THREEx.Terrain.heightMapToVertexColor(heightMap, geometry);

      // Material and Mesh
      const material = new THREE.MeshBasicMaterial({
        wireframe: true,
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      mesh.lookAt(new THREE.Vector3(0, 1, 0));
      mesh.scale.y = 3.5;
      mesh.scale.x = 3;
      mesh.scale.z = 0.2;
      mesh.scale.multiplyScalar(10);

      // Render Functions
      onRenderFcts = [];
      onRenderFcts.push(function (delta, now) {
        mesh.rotation.z += 0.2 * delta;
      });
      onRenderFcts.push(function () {
        renderer.render(scene, camera);
      });

      // Animation
      lastTimeMsec = null;
      requestAnimationFrame(animate);
    };

    const animate = (nowMsec) => {
      requestAnimationFrame(animate);
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      onRenderFcts.forEach(function (onRenderFct) {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    };

    init();

    // Clean up the scene on unmount
    return () => {
      renderer.dispose();
      scene.remove(mesh);
      scene.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
