import { DrawerForm } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

const TestRight = () => {
  //右侧边栏
  const [drawerVisit, setDrawerVisit] = useState(false);
  return (
    <div className='testRight'>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setDrawerVisit(true);
          }}
        >
          试题详情
        </Button>
      </Space>
      <DrawerForm
        onOpenChange={setDrawerVisit}
        title="试卷预览"
        open={drawerVisit}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
      >
      </DrawerForm>
    </div>
  )
}

export default TestRight