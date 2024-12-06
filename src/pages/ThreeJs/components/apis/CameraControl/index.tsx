import { Divider } from 'antd';

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
  return (
    <div>
      <h3>camera:</h3>

      <Divider />
    </div>
  );
}
