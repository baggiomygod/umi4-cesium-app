import { PageContainer } from '@ant-design/pro-components';
import { Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { useEffect } from 'react';
import styles from './index.less';

const CesiumDemo1: React.FC = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const viewer = new Viewer('cesium-conatiner1');
  }, []);
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div id="cesium-conatiner1"></div>
      </div>
    </PageContainer>
  );
};

export default CesiumDemo1;
