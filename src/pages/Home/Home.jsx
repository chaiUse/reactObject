// import React from 'react'
import style from './Home.module.scss'
import { Outlet } from 'react-router-dom'

// import One from '../../components/one'
const Home = () => {
  return (
    <>
    <div className={style.up}>
      <div>图标</div>
      <div>用户头像</div>
    </div>
    <div className={style.box}>
      <div className={style.left}>
        {/* 渲染列表，添加跳转路由 */}
      </div>
      <div className={style.right}>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Home