import { useNavigate } from "react-router-dom";

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

const List = (props) => {
  const navigate = useNavigate();
  const router = (lt) => {
    const res = lt.list?.map((item, index) => {
      return {
        key: "/home" + item.path,
        icon: icon[index],
        label: item.name,
        children: item.children.map((i) => {
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

  return (
   <div>
     <Menu
      mode="inline"
      defaultSelectedKeys={["/userManage", "/userManage/personal"]}
      style={{
        width: 240,
      }}
      items={router(props.list)}
    />
   </div>
  );
};

export default List;
