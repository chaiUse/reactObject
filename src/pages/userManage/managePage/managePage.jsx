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
  Popconfirm,
  Select,
} from "antd";

import style from "./manage.module.scss";

import Table from "../../../components/table/table";
import Search from "../../../components/search/search";
import {
  getUserListApi,
  delUserApi,
  addUserApi,
  UpdataApi,
} from "../../../api/user/user";
import { queryRoleApi } from "../../../api/chai/chia";
import { useEffect } from "react";

import date from "../../../tool/date";

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

  const [show, setShow] = useState(false);

  const [options, setoptions] = useState([]);
  const [val, setval] = useState([]);
  //请求列表
  const getlist = (page = "1", pagesize = "10") => {
    getUserListApi(page, pagesize).then((res) => {
      setlist(res.data.list);
      setmax(res.data.total);
      //修改loding
      setLoding(false);
    });
  };

  //请求角色列表
  const getRole = () => {
    queryRoleApi("1", "20").then((res) => {
      setoptions(
        res.data.list.map((item) => {
          return {
            value: item.name,
          };
        })
      );
    });
  };
  const pics = (data) => {
    console.log(data);
    setval(data.role);
    setModal(true);
    setShow(false);
    form.setFieldValue("id", data._id);
    setBase({
      ...base,
      title: "分配角色",
    });
    queryRoleApi("1", "100").then((res) => {
      console.log(res.data.list);
    });
  };

  //添加角色
  const handleChange = (value) => {
    console.log(`添加角色 ${value}`);
    setval(value);
  };

  const tab = (type, data = {}) => {
    setShow(true);
    if (type === "edit") {
      setType("edit");
      setBase({
        ...base,
        title: "编辑角色",
      });
      form.setFieldValue("username", data.username);
      form.setFieldValue("password", data.password);
      form.setFieldValue("codepassword", data.password);
      form.setFieldValue("status", data.status);
      form.setFieldValue("id", data._id);
    } else {
      setType("add");
      setBase({
        ...base,
        title: "新建用户",
      });
      form.resetFields();
    }
    setModal(true);
  };
  //点击确定
  const handleOk = () => {
    //分配角色
    if (!show) {
      console.log(form.getFieldValue("id"));
      UpdataApi(form.getFieldValue("id"), { role: val }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          message.open({
            type: "success",
            content: `分配角色${res.msg}`,
          });
        } else {
          message.open({
            type: "error",
            content: `分配角色${res.msg}`,
          });
        }
      });
      getlist();
      setModal(false);
      return;
    }
    if (form.getFieldValue("password") === form.getFieldValue("codepassword")) {
      const data = {
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
        status: form.getFieldValue("status"),
      };
      if (type === "add") {
        //添加
        addUserApi(data).then((res) => {
          console.log(res);
          if (res.code === 200) {
            message.open({
              type: "success",
              content: res.msg,
            });
            getlist();
            setModal(false);
          } else {
            message.open({
              type: "error",
              content: res.msg,
            });
          }
        });
      } else {
        UpdataApi(form.getFieldValue("id"), data).then((res) => {
          if (res.code === 200) {
            message.open({
              type: "success",
              content: res.msg,
            });
            getlist();
            setModal(false);
          } else {
            message.open({
              type: "error",
              content: res.msg,
            });
          }
        });
      }
    } else {
      message.open({
        type: "error",
        content: "密码不一致",
      });
    }
  };

  //取消
  const handleCancel = () => {
    setModal(false);
  };

  //开关
  const onChange = (data) => {
    console.log(data);
    const obj = {
      status: data.status ? 0 : 1,
    };
    UpdataApi(data._id, obj).then((res) => {
      console.log(res);
      if (res.code === 200) {
        message.open({
          type: "success",
          content: res.msg,
        });
        getlist();
      } else {
        message.open({
          type: "error",
          content: res.msg,
        });
      }
    });
  };
  //初始化
  useEffect(() => {
    getlist();
    getRole();
  }, []);

  const confirm = (record) => {
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
          type: "error",
          content: res.msg,
        });
      }
    });
  };
  const cancel = (e) => {};

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
          onChange={() => onChange(record)}
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
      render: (text, record) => date(text),
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div className={style.btn} key={record.username}>
          <Button
            type="primary"
            autoInsertSpace={false}
            onClick={() => pics(record)}
          >
            分配角色
          </Button>
          <Button
            type="primary"
            autoInsertSpace={false}
            onClick={() => tab("edit", record)}
          >
            编辑
          </Button>

          <Popconfirm
            title="操作"
            description={`是否删除${record.username}`}
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger autoInsertSpace={false}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  //搜索配置
  const search = [
    {
      title: "用户名",
      key: "username",
      type: "input",
    },
    {
      title: "id",
      key: "id",
      type: "input",
    },
  ];

  //搜索更新
  const getuplist = (s) => {
    console.log("父组件", s);
  };
  return (
    <div className={style.manage}>
      <h3>搜索用户</h3>
      <Search search={search} getuplist={getuplist} />
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
              display: !show && "none",
            }}
            initialValues={{
              remember: true,
              // username: base.username,
              // password: base.password,
              // codepassword: base.password,
              // status: base.status,
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
              display: show && "none",
            }}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="请分配角色"
              onChange={handleChange}
              options={options}
              value={val}
            />
          </Form>
        </Modal>
      </div>
      <Table list={list} nlist={nlist} max={maxpage} loding={loding} />
    </div>
  );
}

export default managePage;
