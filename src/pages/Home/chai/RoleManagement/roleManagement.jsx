// import React from 'react'
import style from './RoleManagement.module.scss'

import { queryRoleApi } from '../../../../api/chai/chia';
import {PlusCircleOutlined} from  '@ant-design/icons';
import { Button } from "antd";
import { useEffect } from 'react';
const RoleManagement = () => {
  const getDate=async()=>{
    const res =await queryRoleApi()
    console.log(res);
  }
  useEffect(()=>{
    getDate()
  },[])
  return (
    <div className={style.box}>
      <div className={style.button}>
        <Button type="primary" shape="round" icon={<PlusCircleOutlined />}> 
          新增角色
        </Button>
      </div>
      <div className={style.list}>

      </div>
    </div>
  )
}

export default RoleManagement