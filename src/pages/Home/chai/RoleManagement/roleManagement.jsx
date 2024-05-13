// import React from 'react'
import style from './RoleManagement.module.scss'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import AdvancedFormat from 'dayjs/plugin/advancedFormat' 

import { queryRoleApi, createRole, delRole, permissionLst, editRolePermissions } from '@/api/chai/chia';

import { PlusCircleOutlined } from '@ant-design/icons';

import { Popconfirm, Drawer, Button, Table, Pagination, Modal, Form, Input, Select, Space, message, Tree, Flex } from "antd";
const RoleManagement = () => {
  dayjs.extend(AdvancedFormat)
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
      res => {
        console.log('添加成功', res);
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
    setlist(res.data)
    res.data.list.forEach((a, b) => {
      a.key = b + 1 + ''
    })
    setDataSource(() => {
      // console.log('修改数据', res.data.list);
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
      render : (text, record, index)=>{
        return( 
        <div>
          {dayjs(text).format('YYYY/MM/DD hh:mm:ss')}
        </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        console.log('操作数据', text, record);
        if (record.name !== '') {

          return (<div  className={style.flex}>
            <div className={style.button}>
              <Button type="primary" onClick={
                () => {
                  setOpenDrawer(true);
                  onCheck(record.permission)
                  setSelectedKeys(record.permission)
                  setExpandedKeys(record)
                }
              }>
                分配角色
              </Button>
            </div>
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
                      if (res.code === 200) {
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
              <div className={style.button}>
                <Button>删除</Button>
              </div>
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
  // 角色初始权限
  const [roleInitialPermissions, setRoleInitialPermissions] = useState()
  const onClose = () => {
    setOpenDrawer(false);
  };
  // 编辑角色权限
  const editorsRole = async (obj) => {
    const res = await editRolePermissions(obj)
    console.log(res);

    if (res.code === 200) {

      getDate(page, pageSize)
      messageApi.open({
        type: 'success',
        content: '修改权限成功',
      });
    }
  }
  //#endregion

  //#region 权限数据 树形控件数据
  // 权限数据
  const [treeData, setTreeData] = useState([])

  const permissionData = async () => {
    const res = await permissionLst()
    console.log('获取权限数据', res.data.list);
    const fn = (arr) => {
      const newArr = arr.map(item => {
        if (item.children) {
          return {
            title: item.name,
            key: item._id,
            children: fn(item.children)
          }

        } else {
          return {
            title: item.name,
            key: item._id,

          }
        }
      })
      return newArr
    }
    setTreeData(fn(res.data.list))

  }
  //树形控件数据
  //编辑数据
  const [expandedKeys, setExpandedKeys] = useState();
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  //#endregion


  console.log('dayjs:',dayjs(1715254620607).format('YYYY/MM/DD hh:mm:ss'));
  console.log('dayjs:',dayjs(1715254620607));
  useEffect(() => {
    getDate()
    permissionData()
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
      <Drawer
        title="角色权限编辑"
        onClose={onClose}
        open={openDrawer}
        footer={
          <div>
            <Flex
              vertical
              gap="small"
              style={{
                width: '100%',
              }}
            >
              <div className={style.button}>
                <Button size='large' type="primary" shape="round" onClick={() => {
                  editorsRole(
                    {
                      id: expandedKeys._id,
                      name: expandedKeys.name,
                      permission: checkedKeys

                    }
                  )
                }} >
                  确定更改权限
                </Button>
              </div>
            </Flex>

          </div>}
      >
        <Tree
          checkable//复选框
          // defaultSelectedKeys={['0-0-0', '0-0-1']}//默认选中的树节点
          defaultCheckedKeys={roleInitialPermissions}//默认选中复选框的树节点
          defaultExpandAll={true}//默认展开所有树节点
          // onSelect={onSelect}//	点击树节点触发
          onCheck={onCheck}//点击复选框触发
          treeData={treeData}//数据

          onExpand={onExpand}//	展开/收起节点时触发
          // expandedKeys={expandedKeys}//受控）展开指定的树节点
          autoExpandParent={autoExpandParent}//是否自动展开父节点
          checkedKeys={checkedKeys}//（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
          selectedKeys={selectedKeys}//（受控）设置选中的树节点，多选需设置 multiple 为 true
          selectable={false}
        />
      </Drawer>
    </div>
  )
}

export default RoleManagement