import CameraControl from '@/pages/ThreeJs/components/apis/CameraControl';
import { Drawer } from 'antd';
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';

interface ControlDrawerProps {
  ref?: any;
  [name: string]: any;
}
const ConrolFrawer = (
  props: ControlDrawerProps,
  ref: Ref<unknown> | undefined,
) => {
  const drawerRef = useRef(null);

  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    setOpen,
  }));
  return (
    <Drawer open={open} placement="left">
      <CameraControl ref={drawerRef} />
    </Drawer>
  );
};

export default forwardRef(ConrolFrawer);
