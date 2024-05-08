// import React from 'react'
import style from './RoleManagement.module.scss'
import { useEffect, useState } from 'react';

import { queryRoleApi, createRole, delRole } from '../../../../api/chai/chia';

import { PlusCircleOutlined } from '@ant-design/icons';

import { Popconfirm, Drawer, Button, Table, Pagination, Modal, Form, Input, Select, Space ,message} from "antd";
const RoleManagement = () => {
  //#region 全局提示数据
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    console.log(2);
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  //#endregion

  //#region   新增角色 ，弹窗变量以及方法
  // 浮窗开关
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      // onFinish()
      form.submit()
    },);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //#endregion

  //#region  浮窗数据
  // layout tailLayout表单位置信息 位置比
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createNewUser(values).then(
      res=>{
        console.log('添加成功',res);
        messageApi.open({
          type: 'success',
          content: '添加用户成功',
        });
        getDate(page, pageSize)
      }
    )

    console.log(values);

  };
  //#endregion

  //#region 数据变量及获取
  // 删除角色数据
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [dataSource, setDataSource] = useState([])
  const [list, setlist] = useState({})
  const getDate = async (page, pageSize) => {
    const res = await queryRoleApi(page, pageSize)
    console.log('获取数据', res.data);
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
        console.log('操作数据', text, record);
        if (record.name !== '') {

          return (<div>
            <Button type="primary" onClick={showDrawer}>
              分配角色
            </Button>
            <Popconfirm
              placement="top"
              title={textl}
              description={description}
              onConfirm={() => {
                console.log(record._id);
                delRole({ id: record._id })
                  .then(
                    res => {
                      console.log('删除角色反馈', res)
                      if(res.code===200){
                        getDate(page, pageSize)
                        messageApi.open({
                          type: 'success',
                          content: '删除用户成功',
                        });
                      }
                    }
                  )
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>)
        } else { return (<div></div>) }
      }

    },
  ];
  //#endregion

  //#region 创建新用户
  const createNewUser = async (values) => {
    const createRoleData = await createRole(values)
    console.log('创建用户', createRoleData);
  }
  //#endregion

  //#region 气泡弹出，删除角色 bubble
  const textl = '删除角色  ?';
  const description = '确定删除该角色吗?';
  const buttonWidth = 80;
  const onConfirm = () => {
    console.log(1);
  }
  //#endregion

  //#region 编辑角色数据
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
    console.log(openDrawer  );
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  //#endregion



  useEffect(() => {
    getDate()
  }, [])
  return (
    <div className={style.box}>
      <div className={style.button}>
        <Button type="primary" shape="round" onClick={showModal} icon={<PlusCircleOutlined />}>
          新增角色
        </Button>
        <Modal
          title="新增角色"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText='确认'
          cancelText='取消'
          centered
        >
          <p>
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
                minHeight: 150,
                padding: 30,
              }}
            >

              <Form.Item
                name="name"
                label="角色名称"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="value"
                label="角色关键字"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </p>
        </Modal>
      </div>
      {/* {JSON.stringify(dataSource.concat(blankRows))} */}
      <div className={style.list}>
        {/* 分配删除角色在数据里边 */}
        <Table dataSource={dataSource} columns={columns}
          pagination={{
            total: list.total,
            pageSize: 5,
            showLessItems: true,
            defaultPageSize: list.pagesize,

            scroll: {
              scrollToFirstRowOnChange: true,
              y: 30,
              x: 10
            },
            onChange: (page, pageSize) => {
              getDate(page, pageSize)
              setPage(page)
              setPageSize(pageSize)
            }
          }}
        />
      </div>
      {/* 全局提示 */}
      {contextHolder}
      <Drawer title="Basic Drawer" onClose={onClose} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default RoleManagement