import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme, List } from 'antd';
const { Option } = Select;
const AdvancedSearchForm = (props) => {

  //修改主题
  const { token } = theme.useToken();
  //表单
  const [form] = Form.useForm();
  //一个控制展开开关
  const [expand, setExpand] = useState(false);
  //一组数据
  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const getFields = (data) => {
    console.log('ss', data);
    if (!data) return
    // 展示十个还是六个
    const count = expand ? 10 : 6;

    const children = [];

    return children;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [data, setDat] = useState(null)
  useEffect(() => {
    setDat(props.data)
  }, [props])
  if (!data) {
    console.log(8888, !data);
    return <div></div>
  } else {
    console.log(99999, !data);

    return (


      <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>
          {/* {getFields(props.data)} */}
          <Col span={8}>
            <Form.Item
              name='试卷名称'
              label='试卷名称'
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="请输入要查询的试卷名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='创建人'
              label='创建人'
              initialValue={data[0].creator}
            >
              <Select>

                <Option >

                </Option>
                {data?.map((item, index) => {
                  return (
                    <Option value={index}>
                      {item.creator}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='查询科目'
              label='查询科目'
              rules={[
                {
                  required: true,
                  message: '请选择科目!',
                },
              ]}
              initialValue={data[0].classify}
            >
              <Select>
                <Option >

                </Option>
                {data?.map((item, index) => {
                  return (
                    <Option value={index}>
                      {item.classify}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>


        </Row>

        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
            <a
              style={{
                fontSize: 12,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} /> Collapse
            </a>
          </Space>
        </div>
      </Form>

    );
  }
};

export default AdvancedSearchForm;