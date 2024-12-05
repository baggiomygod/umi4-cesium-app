import { useEffect } from 'react';
import * as THREE from 'three';
import styles from './index.less';

const initThree = () => {
  //场景
  let scene = new THREE.Scene();

  // 相机：
  // fov:眼球张开的角度，0°时相当于闭眼。
  // aspect:可视区域横纵比。
  // near:眼睛能看到的最近垂直距离。
  // far：眼睛能看到的最远垂直距离
  let camera = new THREE.PerspectiveCamera(75, 2, 0.5, 1000);
  camera.position.z = 5;

  // 渲染器
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(1000, 800);
  let dom: any = document.getElementById('three-demo1-scene');
  dom.appendChild(renderer.domElement);

  // 几何体
  let geometry = new THREE.BoxGeometry(2, 2, 2);

  // 材质
  let material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
  });

  // 物体
  let cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
};
export default function Page() {
  useEffect(() => {
    initThree();
  }, []);
  return (
    <div>
      <h1 className={styles.title}>ThreeJs Cube demo1</h1>
      <div id="three-demo1-scene"></div>
    </div>
  );
}
