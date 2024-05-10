import { useLocation } from 'react-router-dom';
import style from './rightUp.module.scss'
import { Breadcrumb } from 'antd';

import { permissionLst } from '@/api/chai/chia';
import { useEffect, useState } from 'react';

const RightUp = () => {
  const loscation = useLocation()
  console.log(location);



  const [items, setItems] = useState([{title:'首页'}])
  const [list, setList] = useState()

  const permissionData = async () => {
    const res = await permissionLst()
    console.log('获取权限数据', res.data.list);
    let Aindex = [{title:'首页'}]

    const fn = (arr, parentIndex, bl, num) => {

      const newArr = arr.map((item, index) => {

        if (!bl) {
          num = 1
          console.log('初始化');
        }
        parentIndex[num] =  {
          title: item.name,
          // href: '#/home' + item.path,
        }

        console.log(item, index, parentIndex,num);
        if (location.hash === '#/home' + item.path) {
          console.log(3333, parentIndex, item);
          Aindex = [...parentIndex]
        }
        if (item.children) {
          console.log(parentIndex);
          return {
            title: item.name,
            href: '#/home' + item.path,
            children: fn(item.children, parentIndex, true, ++num)
          }

        } else {
          return {
            title: item.name,
            href: '#/home' + item.path,
          }
        }
      })
      return Aindex
    }
    setItems(fn(res.data.list, [{title:'首页'}], false, 1))

  }
  useEffect(() => {
    console.log(items);
  }, [items])
  useEffect(() => {
    permissionData()
  }, [loscation])

  return (
    <div className={style.up}>
      <Breadcrumb
        items={items}
      />
      <p className={style.tit}>{items[2]?.title}</p>
      {/* {list} */}
    </div>
  )
}

export default RightUp