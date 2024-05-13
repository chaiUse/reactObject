import { useState } from "react";

import style from "../personal/personal.module.scss";

function userinfo(props) {
  console.log(props);
  return (
    <div className={style.userinfo}>
      <p>用户名称:{props.info.username}</p>
      <p>用户性别:{props.info.sex ? "" : props.info.sex}</p>
      <p>用户年龄:{props.info.age ? "" : props.info.age}</p>
      {/* <p>用户邮箱地址:{props.emit}</p> */}
    </div>
  );
}

export default userinfo;
