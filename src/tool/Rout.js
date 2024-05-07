import { useNavigate } from "react-router-dom";

import {
  InboxOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SignatureOutlined,
} from "@ant-design/icons";

const navigate = useNavigate();
export const router = (lt) => {
  const res = lt.map((item) => {
    return {
      key: item.path,
      icon: <InboxOutlined />,
      label: item.name,
      children: item.children.map((i) => {
        return {
          key: i.path,
          label: i.name,
          onTitleClick: () => navigate(i.path),
        };
      }),
    };
  });
  console.log(res);
  return res;
};
