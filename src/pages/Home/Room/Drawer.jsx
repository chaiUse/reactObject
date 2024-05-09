// import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';


const Drawer = () => {
      const [drawerVisit, setDrawerVisit] = useState(false)
      return (
        <>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setDrawerVisit(true);
              }}
            >
              <PlusOutlined />
              新建班级
            </Button>
          </Space>
          <DrawerForm
            onOpenChange={setDrawerVisit}
            title="新建班级"
            open={drawerVisit}
            onFinish={async () => {
              message.success('提交成功');
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="name"
                label="班级名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
                rules={[{ required: true, message: '输入框不能为空!' }]}
              />
            <ProFormSelect
                rules={[{ required: true, message: '输入框不能为空!' }]}
                showSearch
                options={[
                  {
                    value: '选择a',
                    label: '选择a',
                  },
                  {
                    value: '选择b',
                    label: '选择b',
                  },
                ]}
                width="xs"
                name="老师"
                label="老师"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                rules={[{ required: true, message: '输入框不能为空!' }]}
                options={[
                  {
                    value: '选择1',
                    label: '选择1',
                  },
                  {
                    value: '选择2',
                    label: '选择2',
                  },
                ]}
                width="xs"
                name="班级进度"
                label="班级进度"
              />
            </ProForm.Group>
          </DrawerForm>
        </>
      );
    };

export default Drawer