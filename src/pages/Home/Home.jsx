// import React from 'react's
import style from './Home.module.scss'
import { Outlet } from 'react-router-dom'
import List from '../../components/list'
import { useState } from 'react'
// import One from '../../components/one'
const Home = () => {
  const [flage, setFlage] = useState(false)
  return (
    <>
      <div onClick={() => setFlage(true)} 
        className={style.home}
      >
      <div className={`${flage ? style.list : style.listShow}`} onClick={(e)=>{e.stopPropagation()}}>
        <List />
      </div>

      <div className={style.up}>
        <div>
          图标

          <div onClick={(e) =>{
            e.stopPropagation()
            setFlage(!flage)}
          } 
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
          <Outlet />
        </div>
      </div>

      </div>
    </>
  )
}

export default Home