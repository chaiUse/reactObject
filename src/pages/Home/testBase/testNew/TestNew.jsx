// import React from 'react'
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";

import * as XLSX from "xlsx";
import { getCreateTestPapApi } from "../../../../api/testBases/testbaseApi";

const TestNew = () => {
  // getCreateTestPapApi
  const createTestPap = async () => {
    const res = await getCreateTestPapApi();
    console.log(res);
  };

  useEffect(() => {
    createTestPap();
  }, []);

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    parseExcel(event.currentTarget.files[0]);
  };

  const parseExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // 假设只有一个工作表
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 提取标题行，即属性信息
      const headers = data.shift();
      console.log(headers);
      // 格式化数据为一维数组
      const formattedData = data.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      console.log(formattedData); // 这里可以对解析出的数据进行处理
    };

    reader.readAsBinaryString(file);
  };

  //添加试题
  const add = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="testNew"
      style={{ height: "100%", overflow: "auto", padding: "0 20px" }}
    >
      <div className="btns" style={{width: '200px', marginBottom: '10px', display:'flex', justifyContent: 'space-between'}}>
        <Button type="primary">手动添加</Button>
        <Button onClick={add} type="primary">批量导入</Button>
      </div>
      <div className="testTitle">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: '10px'}}>
              <p>题型</p>
              <Form.Item
                name="testI"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
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
            </div>
            <div style={{ display: "flex", marginLeft: '20px' }}>
              <p>分类</p>
              <Form.Item
                name="classI"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
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
            </div>
          </div>
          <Form.Item
            label="题目"
            name="title"
            rules={[
              {
                required: true,
                message: "题目不能为空",
              },
            ]}
          >
            <Input.TextArea placeholder="请输入题目" />
          </Form.Item>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Form.Item
                name="A"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
                  },
                ]}
              >
                <Input style={{ width: 300 }} placeholder="请输入" />
              </Form.Item>
              <Form.Item
                name="B"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
                  },
                ]}
              >
                <Input style={{ width: 300 }} placeholder="请输入" />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Form.Item
                name="C"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
                  },
                ]}
              >
                <Input style={{ width: 300 }} placeholder="请输入" />
              </Form.Item>
              <Form.Item
                name="D"
                rules={[
                  {
                    required: true,
                    message: "选项内容不能为空",
                  },
                ]}
              >
                <Input style={{ width: 300 }} placeholder="请输入" />
              </Form.Item>
            </div>
          </div>
          <Form.Item name="textArea" label="解析">
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={200} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default TestNew;
