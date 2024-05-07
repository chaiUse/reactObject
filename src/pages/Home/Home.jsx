// import React from 'react's
import style from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import List from "../../components/list";
import { useEffect, useState } from "react";
import RightUp from "../../components/rightUp/rightUp";
// import One from '../../components/one'

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { getUserInfoApi } from "../../api/user";

const Home = () => {
  const [flage, setFlage] = useState(false);

  //用户信息
  const [userInfo, setUser] = useState(null);

  useEffect(() => {
    getUserInfoApi().then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div onClick={() => setFlage(false)} className={style.home}>
      <div
        className={`${flage ?  style.listShow :style.list }`}
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
    </div>
  );
};

export default Home;
