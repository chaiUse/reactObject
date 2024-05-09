import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';

const RoomTitle = () => {
  const { Option } = Select;
  const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [show,setShow] = useState(true)
  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const getFields = () => {
    const count = expand ? 3 : 2;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i === 0 ? (
            <Form.Item
              name='班级名称'
              label='班级名称'
              rules={[
                {
                  required: true,
                  message: '请输入',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          ) : (
            <Form.Item
              name={i===1?'老师':'科目类别'}
              label={i===1?'老师':'科目类别'}
              rules={[
                {
                  required: true,
                  message: '请选择',
                },
              ]}
            //    initialValue='请选择'
            >
               <Select
               showSearch={i === 1}// 启用搜索功能
            //    filterOption={false} // 允许输入非选项中的值
               placeholder={i===1?"请选择或输入":'请选择'}>
              {i === 1 && <Option value="1">选择1</Option>}
              {i === 1 && <Option value="2">选择2</Option>}
              {i === 1 && <Option value="3">选择3</Option>}
              {/* 第二个 Select 的选项 */}
              {i === 2 && <Option value="A">选项 A</Option>}
              {i === 2 && <Option value="B">选项 B</Option>}
              {i === 2 && <Option value="C">选项 C</Option>}
            </Select>
            </Form.Item>
            
          )}
        </Col>,
      );
    }
    return children;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>{getFields()}
      <div
        style={{
          flex:1,
          display:'flex',
          justifyContent:'flex-end'
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
              setShow(!show)
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0}/>
            {show?'展开':'收起'}
          </a>
        </Space>
      </div>
      </Row>
    </Form>
  );
};
  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};
export default RoomTitle;