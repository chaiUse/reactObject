// import React from 'react'
import { Button, Form, Input, Select, Space, } from "antd";
import { useEffect } from "react";
import { getCreateTestPapApi } from "../../../../api/testBases/testbaseApi";

const TestNew = () => {
  // getCreateTestPapApi
  const createTestPap = async()=>{
    const res = await getCreateTestPapApi()
    console.log(res);
  }
  useEffect(()=>{
    createTestPap()
  },[]);

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  return (
    <div className="testNew" style={{height:'100%', overflow:'auto', padding: '0 20px'}}>
      <div className="btns">
        <button>手动添加</button>
        <button>批量导入</button>
      </div>
      <div className="testTitle">
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <div style={{display:'flex'}}>
          <>
            <p>题型</p>
            <Form.Item
              name="testI"
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Select
                placeholder="选择题型"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="male">单选题</Option>
                <Option value="female">多选题</Option>
                <Option value="maled">判断题</Option>
                <Option value="other">填空题</Option>
              </Select>
            </Form.Item>
          </>
          <>
            <p>分类</p>
            <Form.Item
              name="classI"
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Select
                placeholder="选择科目"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="class">科目</Option>
              </Select>
            </Form.Item>
          </>
          </div>
          <Form.Item
            label= "题目" 
            name= "题目"
            rules={[
              {
                required: true,
                message: "题目不能为空"
              },
            ]}
          >
            <Input.TextArea placeholder="请输入题目"/>
          </Form.Item>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <div style={{display:'flex', justifyContent:"space-around"}}>
            <Form.Item name= 'A'
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Input style={{width: 300}} placeholder="请输入" />
            </Form.Item>
            <Form.Item name= 'B'
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Input style={{width: 300}} placeholder="请输入" />
            </Form.Item>
            </div>
            <div style={{display:'flex', justifyContent:"space-around"}}>
            <Form.Item name= 'C'
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Input style={{width: 300}} placeholder="请输入" />
            </Form.Item>
            <Form.Item name= 'D'
              rules={[
                {
                  required: true,
                  message: "选项内容不能为空"
                },
              ]}
            >
              <Input style={{width: 300}} placeholder="请输入" />
            </Form.Item>
            </div>
          </div>
          <Form.Item name='textArea' label="解析">
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={200} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default TestNew