
import  { useState,useEffect } from 'react';
import instance from '../../../../../api/api'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
const { Option } = Select;


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


function First({ next }) {
 
 
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const data = {
          name: values.nickname,
          classify: values.class,
          examId:  "64425a108784673370bb54aa",
          group: values.subjects,
          examiner: values.invigilation,
          startTime: "2222",
          endTime: "33333333"
        }
    console.log(data);
    console.log(values);
    next(data);
    
  };
  const [First, setFirst] = useState([]); // 初始化 list 状态
  // const [data, setdata] = useState([]); // 初始化 list 状态
  const fetchTestPapers = async () => {
    try {
      const res = await instance.get("/classify/list?page=1&pagesize=2");
      
      setFirst(res?.data.list); // 更新状态
      console.log(First);
    } catch (error) {
      console.error("Failed to fetch test papers: 请求失败 ", error);
    }
    
  };
 useEffect(()=>{
  fetchTestPapers()
 },[])
 useEffect(()=>{
  First
  // console.log(First);
 },[First])
  

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


  return (
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    
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
          message: '请输入你的考试名!',
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
      name="subjects"
      label="科目分类"
      rules={[
        {
          required: true,
          message: '请选择你的考试科目!',
        },
      ]}
    >
      <Select placeholder="请选择你的考试科目">
      {First.map((subject, index) => (
        <Option key={index} value={subject.name}>
          {subject.name}
        </Option>
      ))}
      </Select>
    </Form.Item>

    <Form.Item
      name="invigilation"
      label="监考人"
      rules={[
        {
          required: true,
          message: '请选择你的监考人!',
        },
      ]}
    >
      <Select placeholder="请选择你的监考人">
      {First.map((subject, index) => (
        <Option key={index} value={subject.creator
        }>
          {subject.creator
}
        </Option>
      ))}
      </Select>
    </Form.Item>


    <Form.Item
      name="class"
      label="考试班级"
      rules={[
        {
          required: true,
          message: '请选择你的考试班级!',
        },
      ]}
    >
      <Select placeholder="请选择你的考试班级">
      {First.map((subject, index) => (
        <Option key={index} value={subject.value
        }>
          {subject.value
}
        </Option>
      ))}
      </Select>
    </Form.Item>


    <Form.Item label="验证码" extra="我们必须确保你是人类.">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="captcha"
            noStyle
            rules={[
              {
                required: true,
                message: '请输入您的验证码!',
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
            value ? Promise.resolve() : Promise.reject(new Error('请确认同意协议')),
        },
      ]}
      {...tailFormItemLayout}
    >
      <Checkbox>
        请阅读<a href="">同意协议</a>
      </Checkbox>
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        确认创建考试
      </Button>
    </Form.Item>
  </Form>
  )

}

export default First