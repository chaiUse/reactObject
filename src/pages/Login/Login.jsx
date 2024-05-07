// import { navigator } from "react-router-dom";

import React, { useEffect, useState } from "react";
import style from "./login.module.scss";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Button, Form, Input } from "antd";

import { getCapTchaApi, getUPApi } from "../../api/login";

const Login = () => {
  //定义数据
  const [Capimg, setImg] = useState("");

  // const history = useHistory();

  //登录
  const onFinish = (values) => {
    console.log("账号密码验证码", { ...values });
    getUPApi(values).then((res) => {
      localStorage.setItem("token", res.data.token);
      // navigator("/home");
    });
  };

  //页面初始
  useEffect(() => {
    //请求验证码
    getCapTchaApi().then((res) => {
      setImg(res.data.code);
    });
  }, []);

  return (
    <div className={style.login}>
      <div className={style.up}>
        <h2>OnlineExamAdmin</h2>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "用户名不能为空",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "密码不能为空",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "验证码不能为空",
              },
            ]}
          >
            <Row>
              <Col span={12}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="verify"
                  placeholder="验证码"
                />
              </Col>
              <Col span={4}></Col>
              <Col span={8}>
                <div className={style.img}>
                  <img src={Capimg} />
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
