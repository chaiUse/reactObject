// import React from 'react's
import style from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import List from "../../components/list";
import { useEffect, useState } from "react";
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
    <>
      <div onClick={() => setFlage(true)} className={style.home}>
        <div
          className={`${flage ? style.list : style.listShow}`}
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
            >
              666
            </div>
          </div>
          <div>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </div>
        <div className={style.box}>
          <div className={style.left}>
            <List />
          </div>
          <div className={style.right}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
