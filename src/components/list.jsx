import React from "react";

import { useState } from "react";

import {
  InboxOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SignatureOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    key: "1",
    icon: <InboxOutlined />,
    label: "系统管理",
    children: [
      {
        key: "11",
        label: "Option 1",
      },
      {
        key: "12",
        label: "Option 2",
      },
      {
        key: "13",
        label: "Option 3",
      },
      {
        key: "14",
        label: "Option 4",
      },
    ],
  },
  {
    key: "2",
    icon: <TeamOutlined />,
    label: "班级管理",
    children: [
      {
        key: "21",
        label: "Option 1",
      },
      {
        key: "22",
        label: "Option 2",
      },
    ],
  },
  {
    key: "3",
    icon: <ProjectOutlined />,
    label: "试题管理",
    children: [
      {
        key: "31",
        label: "Option 1",
      },
      {
        key: "32",
        label: "Option 2",
      },
      {
        key: "33",
        label: "Option 3",
      },
      {
        key: "34",
        label: "Option 4",
      },
    ],
  },
  {
    key: "4",
    icon: <FileTextOutlined />,
    label: "试卷管理",
    children: [
      {
        key: "41",
        label: "Option 1",
      },
      {
        key: "42",
        label: "Option 2",
      },
      {
        key: "43",
        label: "Option 4",
      },
      {
        key: "44",
        label: "Option 4",
      },
    ],
  },
  {
    key: "5",
    icon: <SignatureOutlined />,
    label: "考试管理",
    children: [
      {
        key: "51",
        label: "Option 1",
      },
      {
        key: "52",
        label: "Option 2",
      },
      {
        key: "53",
        label: "Option 5",
      },
      {
        key: "54",
        label: "Option 4",
      },
    ],
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const List = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["1", "11"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const ClickItem = ({ key, domEvent }) => {
    console.log(key, domEvent);
  };
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onTitleClick={ClickItem}
      style={{
        width: 240,
      }}
      items={items}
    />
  );
};

export default List;
