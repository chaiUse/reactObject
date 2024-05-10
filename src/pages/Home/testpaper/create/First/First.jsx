import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
const { Option } = Select;

const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
function First() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    initialValues={{
      residence: ['zhejiang', 'hangzhou', 'xihu'],
      prefix: '86',
    }}
    style={{
      maxWidth: 600,
    }}
    scrollToFirstError
  >
    

   

   
    <Form.Item
      name="nickname"
      label="考试名称"
      tooltip="输入考试名称"
      rules={[
        {
          required: true,
          message: 'Please input your nickname!',
          whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

   

    <Form.Item
      name="phone"
      label="手机号码"
      rules={[
        {
          required: true,
          message: '输入电话号码!',
        },
      ]}
    >
      <Input
        addonBefore={prefixSelector}
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    

  

    

    <Form.Item
      name="gender"
      label="科目分类"
      rules={[
        {
          required: true,
          message: 'Please select gender!',
        },
      ]}
    >
      <Select placeholder="select your gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="gender"
      label="监考人"
      rules={[
        {
          required: true,
          message: 'Please select gender!',
        },
      ]}
    >
      <Select placeholder="select your gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>


    <Form.Item
      name="gender"
      label="考试班级"
      rules={[
        {
          required: true,
          message: 'Please select gender!',
        },
      ]}
    >
      <Select placeholder="select your gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>


    <Form.Item label="验证码" extra="We must make sure that your are a human.">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="captcha"
            noStyle
            rules={[
              {
                required: true,
                message: 'Please input the captcha you got!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button>验证码</Button>
        </Col>
      </Row>
    </Form.Item>

    <Form.Item
      name="agreement"
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
        },
      ]}
      {...tailFormItemLayout}
    >
      <Checkbox>
        I have read the <a href="">agreement</a>
      </Checkbox>
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form>
  )

}

export default First