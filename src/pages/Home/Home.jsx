// import React from 'react's
import style from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import List from "../../components/list";
import { useEffect, useState } from "react";
import RightUp from "../../components/rightUp/rightUp";
// import One from '../../components/one'

import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { getUserInfoApi } from "../../api/user";

const Home = () => {
  const [flage, setFlage] = useState(false);

  //用户信息
  const [userInfo, setUser] = useState({});

  useEffect(() => {
    getUserInfoApi().then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);
  console.log();
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          个人信息
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          退出登录
        </a>
      ),
    },
  ];

  return (
    <div onClick={() => setFlage(false)} className={style.home}>
      <div
        className={`${flage ? style.listShow : style.list}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <List />
      </div>

      <div className={style.up}>
        <div>
          图标
          <div
            onClick={(e) => {
              e.stopPropagation();
              setFlage(!flage);
            }}
            className={style.showIco}
          >
            666
          </div>
        </div>

        <div>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <Avatar size="large" icon={<UserOutlined />} />
            <span>123</span>
          </Dropdown>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.left}>
          <List />
        </div>
        <div className={style.right}>
          <RightUp />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
