import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  message,
  Modal,
  Switch,
  Form,
  Input,
  Radio,
} from "antd";

import style from "./manage.module.scss";

import Table from "../../../components/table/table";

import { getUserListApi, delUserApi } from "../../../api/user/user";
import { useEffect } from "react";

function managePage() {
  const [form] = Form.useForm();
  const [list, setlist] = useState([]);
  const [maxpage, setmax] = useState(0);
  const [loding, setLoding] = useState(true);
  const [isModal, setModal] = useState(false);
  const [base, setBase] = useState({
    title: "新建用户",
    username: "",
    password: "",
    codepassword: "",
    status: 2,
  });
  const [type, setType] = useState("");
  //请求列表
  const getlist = (page = "1", pagesize = "10") => {
    getUserListApi(page, pagesize).then((res) => {
      setlist(res.data.list);
      setmax(res.data.total);
      //修改loding
      setLoding(false);
    });
  };

  const tab = (type, data = {}) => {
    if (type === "edit") {
      setType("edit");
      form.setFieldValue("username", data.username);
      form.setFieldValue("password", data.password);
      form.setFieldValue("codepassword", data.password);
      form.setFieldValue("status", data.status);
    } else {
      setType("add");
      // 添加用户时，将表单数据设置为空值或默认值
      form.setFieldValue("username", "");
      form.setFieldValue("password", "");
      form.setFieldValue("codepassword", "");
      form.setFieldValue("status", "");
    }
    setModal(true);
  };
  //点击确定
  const handleOk = () => {
    if (type === "add") {
      //添加
      if (
        form.getFieldValue("password") === form.getFieldValue("codepassword")
      ) {
        const data = {
          username: form.getFieldValue("username"),
          password: form.getFieldValue("password"),
          status: form.getFieldValue("status"),
        };
       
      }
    }else{
      
    }
  };

  //取消
  const handleCancel = () => {
    setModal(false);
  };
  //初始化
  useEffect(() => {
    getlist();
  }, []);
  //列表配置
  const nlist = [
    {
      title: "头像",
      dataIndex: "avator",
      key: "avator",
      render: (text, record) =>
        record.avator ? (
          <Avatar size="large" src={record.avator} />
        ) : (
          <Avatar size="large" icon={<UserOutlined />} />
        ),
    },
    {
      title: "是否禁用",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={text}
        />
      ),
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "最近登录",
      dataIndex: "lastOnlineTime",
      key: "lastOnlineTime",
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "操作",
      dataIndex: "creator",
      key: "11",
      render: (text, record) => (
        <div>
          <Button type="primary" autoInsertSpace={false}>
            分配角色
          </Button>
          <Button
            type="primary"
            autoInsertSpace={false}
            onClick={() => tab("edit", record)}
          >
            编辑
          </Button>
          <Button
            type="primary"
            danger
            autoInsertSpace={false}
            onClick={() => {
              delUserApi(record._id).then((res) => {
                console.log(res);
                if (res.code === 200) {
                  message.open({
                    type: "success",
                    content: res.msg,
                  });
                  getlist();
                } else {
                  message.open({
                    type: "success",
                    content: res.msg,
                  });
                }
              });
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={style.manage}>
      <div>
        <Button type="primary" onClick={() => tab("add")}>
          +添加用户
        </Button>
        <Modal
          title={base.title}
          open={isModal}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={true}
          cancelText="取消"
          okText="确定"
        >
          <Form
            form={form}
            labelAlign="left"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
              username: base.username,
              password: base.password,
              codepassword: base.password,
              status: base.status,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: "输入账号",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "输入密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="codepassword"
              rules={[
                {
                  required: true,
                  message: "确认密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="状态"
              name="status"
              rules={[
                {
                  required: true,
                  message: "确认状态",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={0}> 禁用 </Radio>
                <Radio value={1}> 启用 </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table list={list} nlist={nlist} max={maxpage} loding={loding} />
    </div>
  );
}

export default managePage;
