// import React from 'react'
import style from './RoleManagement.module.scss'

import { queryRoleApi } from '../../../../api/chai/chia';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Pagination } from "antd";
import { useEffect, useState } from 'react';
const RoleManagement = () => {

  const [dataSource, setDataSource] = useState([])
  const [list, setlist] = useState({})
  let [blankRows, setblankRows] = useState([])

  const getDate = async (page, pageSize) => {
    const res = await queryRoleApi(page, pageSize)
    console.log(res.data);
    setlist(res.data)
    res.data.list.forEach((a, b) => {
      a.key = b + 1 + ''
    })
    setDataSource(() => {
      console.log('修改数据', res.data.list);
      return res.data.list
    })
  }
  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色关键字',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        if (record.name!=='') {
          return (<div>
            <Button type="primary" >
              分配角色
            </Button>
            <Button type="primary" danger={true}>
              删除
            </Button>
          </div>)
      } else { return (<div></div>) }
      }

    },
  ];
  useEffect(() => {
    // 计算需要补充的空白行数量
    const blankRowCount = (list.pagesize - (dataSource.length % list.pagesize)) == 5 ? 0 : list.pagesize - (dataSource.length % list.pagesize);
    console.log('缺少数据', blankRowCount, list.pagesize, dataSource);
    // 构造空白行数据
    setblankRows(
      Array.from(
        { length: blankRowCount },
        (_, index) => (
          {
            key: dataSource.length + index + 'kong',
            name: '',
            value: '',
            creator: '',
            createTime: '',
            action: ''
          }
        )
      )
    )
    console.log(dataSource.concat(blankRows));
  }, [dataSource])
  useEffect(() => {
    getDate()
  }, [])
  return (
    <div className={style.box}>
      <div className={style.button}>
        <Button type="primary" shape="round" onClick={(a,b)=>{console.log(a,b);}} icon={<PlusCircleOutlined />}>
          新增角色
        </Button>
        <button>新增角色</button>
      </div>
      {/* {JSON.stringify(dataSource.concat(blankRows))} */}
      <div className={style.list}>
        <Table dataSource={dataSource.concat(blankRows)} columns={columns}
          pagination={{
            total: list.total,
            pageSize: 5,
            showLessItems: true,
            defaultPageSize: list.pagesize,
            
            scroll: {
              scrollToFirstRowOnChange: true,
              y: 30,
              x:10
            },
            onChange: (page, pageSize) => {
              getDate(page, pageSize)
            }
          }}
        />
        {/* <Pagination defaultCurrent={1} total={list.total} pageSize={list.pagesize}/> */}
      </div>
    </div>
  )
}

export default RoleManagement