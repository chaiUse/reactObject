import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  InboxOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SignatureOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const icon = [
  <InboxOutlined />,
  <TeamOutlined />,
  <ProjectOutlined />,
  <FileTextOutlined />,
  <SignatureOutlined />,
];
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const List = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const router = (lt) => {
    const res = lt.list?.map((item, index) => {
      return {
        key: "/home" + item.path,
        icon: icon[index],
        label: item.name,
        children: item.children?.map((i) => {
          return {
            key: "/home" + i.path,
            label: i.name,
            onClick: () => navigate("/home" + i.path),
          };
        }),
      };
    });
    return res;
  };

  //监听路由
  useEffect(() => {
    console.log(location);
    const pathname = location.pathname;
    setSelectedKeys([pathname]);
  }, [location]);

  return (
   <div style={{height:'100%',overflow:'auto'}}>
     <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      // defaultOpenKeys={openKeys}
      style={{
        width: 240,
      }}
      items={router(props.list)}
    />
   </div>
  );
};

export default List;
