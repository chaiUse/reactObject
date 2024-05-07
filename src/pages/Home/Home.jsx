// import React from 'react's
import style from './Home.module.scss'
import { Outlet } from 'react-router-dom'
import List from '../../components/list'
import { useState } from 'react'
import RightUp from '../../components/rightUp/rightUp'
// import One from '../../components/one'
const Home = () => {
  const [flage, setFlage] = useState(false)
  return (
    <>
      <div onClick={() => setFlage(false)} 
        className={style.home}
      >
      <div className={`${flage ?  style.listShow :style.list }`} onClick={(e)=>{e.stopPropagation()}}>
        <List />
      </div>

      <div className={style.up}>
        <div>
          图标

          <div onClick={(e) =>{
            e.stopPropagation()
            setFlage(!flage)}
          
          } 
          className={style.showIco}
          >
            666
          </div>
        </div>
        <div>用户头像</div>
      </div>
      <div className={style.box}>
        <div className={style.left}>
          <List />
        </div>
        <div className={style.right}>
          <RightUp />
          <Outlet />
        </div>
      </div>

      </div>
    </>
  )
}

export default Home