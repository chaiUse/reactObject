// import React from 'react'
import {roomCreateApi,roomSearchApi} from '../../../api/classroom/classroom'
import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import {  useRef,useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../Room/data/DataContext';


const Drawer = (props) => {
      const [drawerVisit, setDrawerVisit] = useState(false)
      const { data, setData } = useContext(DataContext)
      const restFormRef = useRef();

      const teaOption =  props.teacherList1.map(item => ({
        value: item,
        label: item,
      }))
      const classOption =  props.classList1.map(item => ({
        value: item,
        label: item,
      }))

      const handleSubmit = async (values) => {
        console.log(333,values)
        try {
          // 使用 axios 或其他 HTTP 客户端库将表单值发送到后端
          const response = await roomCreateApi(values)
          console.log(555,response)
          if (response.code===200) {
            // 提交成功的处理逻辑
            message.success('提交成功');
            setDrawerVisit(false); // 关闭抽屉
            // form.resetFields(); // 重置表单
            restFormRef.current?.resetFields()
            console.log(1111111111)
            // 更新数据
            const res = await roomSearchApi()
            res.data.list.map((item,index)=>{
              item.num = index+1,
              item.key = index
            })
            setData(res.data.list)
          } else {
            message.error('提交失败');
          }
        } catch (error) {
          // 网络请求失败的处理逻辑
          message.error('网络异常，请稍后再试');
          console.error('提交失败:', error);
        }
      };


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
            formRef={restFormRef}
            onOpenChange={setDrawerVisit}
            title="新建班级"
            open={drawerVisit}
            onFinish={handleSubmit}
            // destroyOnClose={false}
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
                options={teaOption}
                width="xs"
                name="teacher"
                label="老师"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                rules={[{ required: true, message: '输入框不能为空!' }]}
                options={classOption}
                width="xs"
                name="classify"
                label="班级进度"
              />
            </ProForm.Group>
          </DrawerForm>
        </>
      );
    };

export default Drawer