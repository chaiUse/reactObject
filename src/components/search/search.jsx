//传入一个数组，每一项为title为lable ， key 为name ,type 为控件的类型类型
//传入一个 getuplist函数 以回调通知父组件搜索结果
//暂时不支持除输入框以外的 手动添加

import { useState } from "react";

import style from "./search.module.scss";

import { Button, Form, Input, Space, Row, Col, Select } from "antd";

import { getUserListApi } from "../../api/user/user";
import { DownOutlined } from "@ant-design/icons";

function Search(props) {
  const [expand, setExpand] = useState(false);

  const [form] = Form.useForm();

  //传入数组展示搜索
  const getFields = (arr) => {
    const count = expand ? arr.lenght : 2;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {arr && arr[i]?.type == "input" ? (
            <Form.Item name={`${arr[i]?.key}`} label={`${arr[i]?.title}`}>
              <Input placeholder={`请输入${arr[i]?.title}`} />
            </Form.Item>
          ) : (
            <Form.Item
              name={`${arr[i]?.key}`}
              label={`${arr[i]?.title}`}
              initialValue="1"
            >
              <Select>
                <Option value="1">111</Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  };
  //点击搜索
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    const { username, id } = values;
    getUserListApi("1", "10", { username, id }).then((res) => {
      console.log(res);
      props.getuplist(res.data);
      form.resetFields();
    });
  };

  //通知父组件搜索结果

  return (
    <div className={style.search}>
      <Form form={form} name="advanced_search" onFinish={onFinish}>
        <Row gutter={24}>{getFields(props.search)}</Row>
        <div
          style={{
            textAlign: "right",
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
                props.search.lenght > 3 && setExpand(!expand);
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} />{" "}
              {expand ? "收起" : "展开"}
            </a>
          </Space>
        </div>
      </Form>
    </div>
  );
}

export default Search;
