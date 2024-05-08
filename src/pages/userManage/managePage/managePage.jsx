import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, message } from "antd";

import style from "./manage.module.scss";

import Table from "../../../components/table/table";

import { getUserListApi, delUserApi } from "../../../api/user/user";
import { useEffect } from "react";

function managePage() {
  const [list, setlist] = useState([]);
  const [maxpage, setmax] = useState(0);
  const [loding, setLoding] = useState(true);

  const getlist = (page = "1", pagesize = "10") => {
    getUserListApi(page, pagesize).then((res) => {
      setlist(res.data.list);
      setmax(res.data.total);
      setLoding(false);
    });
  };
  useEffect(() => {
    getlist();
  }, []);
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
          <Button type="primary" autoInsertSpace={false}>
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
      <h2>用户管理</h2>
      <Table list={list} nlist={nlist} max={maxpage} loding={loding} />
    </div>
  );
}

export default managePage;
