/* eslint-disable @typescript-eslint/no-unused-vars */
import ControlDrawer from '@/pages/ThreeJs/components/ControlDrawer';
import { Button } from 'antd';
import { createRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import styles from './index.less';
const initThree = (carmera: any) => {
  //场景
  let scene = new THREE.Scene();

  // 相机：
  // fov:眼球张开的角度，0°时相当于闭眼。
  // aspect:可视区域横纵比。
  // near:眼睛能看到的最近垂直距离。
  // far：眼睛能看到的最远垂直距离
  const { fov, aspect, near, far } = carmera;
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
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
  const controlDrawerRef: any = createRef<any>();
  const [carmeraParam, setCarmeraParam] = useState({
    fov: 75,
    aspect: 2,
    near: 0.1,
    far: 1000,
  });

  const openDrawer = () => {
    if (controlDrawerRef.current) {
      controlDrawerRef.current.setOpen(true);
    }
  };
  useEffect(() => {
    initThree(carmeraParam);
  }, [carmeraParam]);
  return (
    <div>
      <h1 className={styles.title}>ThreeJs Cube demo1</h1>
      <Button onClick={openDrawer}>控制</Button>
      <ControlDrawer ref={controlDrawerRef} setCarmeraParam={setCarmeraParam} />
      <div id="three-demo1-scene"></div>
    </div>
  );
}
