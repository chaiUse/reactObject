// import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  InboxOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SignatureOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect } from "react";

const icon = [
  <InboxOutlined />,
  <TeamOutlined />,
  <ProjectOutlined />,
  <FileTextOutlined />,
  <SignatureOutlined />,
];

const List = (props) => {
  const navigate = useNavigate();
  const router = (lt) => {
    const res = lt.list?.map((item, index) => {
      return {
        key: item.path,
        icon: icon[index],
        label: item.name,
        children: item.children.map((i) => {
          return {
            key: i.path,
            label: i.name,
            onClick: () => navigate(i.path),
          };
        }),
      };
    });
    console.log(res);
    return res;
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/userManage", "/userManage/personal"]}
      style={{
        width: 240,
      }}
      items={router(props.list)}
    />
  );
};

export default List;
