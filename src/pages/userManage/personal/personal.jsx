import { useEffect, useState } from "react";
import style from "./personal.module.scss";

import { UpprofileApi, getUserInfoApi } from "../../../api/user/user";

import Avtior from "./avtior";
import Userinfo from "./userinfo";

function personal() {
  const [info, setinfo] = useState({});
  const getuser = async () => {
    const res = await getUserInfoApi();
    console.log(res);
    setinfo(res.data);
  };

  useEffect(() => {
    getuser();
  }, []);
  return (
    <div className={style.personal}>
      <Avtior />
      <Userinfo info={info} />
    </div>
  );
}

export default personal;
