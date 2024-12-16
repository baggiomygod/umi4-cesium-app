import { Divider, Slider } from 'antd';
import { useState } from 'react';

/**
 *
 * @param param0
 * @returns
 *
 * carmera
 * fov(30~90): 眼球张开的角度，0°时相当于闭眼。
 * aspect(0.5~2): 窗口的宽高比
 * near(0.05-0.3): 眼睛能看到的最近垂直距离。通常0.1可以满足绝大多数场景。(任何离摄像机更近的物体都不会被渲染)
 * far(500~2000)： 眼睛能看到的最远垂直距离,默认值1000
 */

export default function CameraControl({}: any) {
  const [carmeraParams, setCarmeraParams] = useState({
    fov: 75,
    aspect: 2,
    near: 0.1,
    far: 1000,
  });

  const onCarmeraParamsChange = (value: number, key: string) => {
    setCarmeraParams({ ...carmeraParams, [key]: value });
  };
  return (
    <div>
      <h3>camera:</h3>
      carmeraParams: {JSON.stringify(carmeraParams)}
      <Divider />
      <label>fov(30~90): 眼球张开的角度，0°时相当于闭眼。</label>
      <Slider
        max={180}
        min={0}
        step={1}
        defaultValue={75}
        dots={true}
        onChange={(v) => onCarmeraParamsChange(v, 'fov')}
      />
      <label>aspect(0.5~2): 窗口的宽高比</label>
      <Slider
        max={4}
        min={0.25}
        step={0.25}
        defaultValue={2}
        dots={true}
        onChange={(v) => onCarmeraParamsChange(v, 'aspect')}
      />
      <label>
        near(0.05-0.3): 眼睛能看到的最近垂直距离。通常0.1可以满足绝大多数场景。
      </label>
      <Slider
        max={0.2}
        min={0.05}
        step={0.01}
        defaultValue={0.1}
        dots={true}
        onChange={(v) => onCarmeraParamsChange(v, 'near')}
      />
      <label>far(500~2000)： 眼睛能看到的最远垂直距离,默认值1000</label>
      <Slider
        max={2000}
        min={500}
        step={100}
        defaultValue={1000}
        dots={true}
        onChange={(v) => onCarmeraParamsChange(v, 'far')}
      />
      <Divider />
    </div>
  );
}
