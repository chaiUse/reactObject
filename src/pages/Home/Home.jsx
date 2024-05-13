// import React from 'react'
import style from "./Home.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import List from "../../components/list";
import { useEffect, useState } from "react";
import RightUp from "../../components/rightUp/rightUp";

import { Avatar, Dropdown } from "antd";

import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";

import { getUserInfoApi, getListApi } from "../../api/user/user";

const Home = () => {
  const navigator = useNavigate();

  const [flage, setFlage] = useState(false);

  //用户信息
  const [userInfo, setUser] = useState({});
  //左侧列表
  const [list, setList] = useState([]);
  //进行获取列表和用户信息
  const getlist = async () => {
    const ls = await getUserInfoApi();
    const lt = await getListApi();
    setUser(ls.data);
    setList(lt.data);
  };

  useEffect(() => {
    getlist();
  }, []);

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
        <p
          onClick={() => {
            localStorage.removeItem("token");
            navigator("/");
          }}
        >
          退出登录
        </p>
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
        <List list={list} />
      </div>

      <div className={style.up}>
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setFlage(!flage);
            }}
            className={style.showIco}
          >
            <UnorderedListOutlined style={{fontSize:'30px',background:'rgba(184, 121, 155,1)'}}/>
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
            <div>
              <Avatar size="large" icon={<UserOutlined />} />
              {userInfo?.username}
            </div>
          </Dropdown>
        </div>
      </div>
      <div className={style.box}>
        <div className={style.left}>
          <List list={list} />
        </div>
        <div className={style.right}>
          <RightUp />
          <div className={style.conten}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
