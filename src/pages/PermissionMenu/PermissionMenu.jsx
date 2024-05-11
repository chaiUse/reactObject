import { useEffect, useState } from 'react'
import style from './permissonMenu.module.scss'
import { getListApi } from '../../api/user/user'
import { Button,message } from 'antd';
import {
  EditableProTable,
  ProForm,
  ProFormSelect,
  ProFormText,
  DrawerForm,
  DragSortTable
} from '@ant-design/pro-components';
import { PlusOutlined,MenuOutlined } from '@ant-design/icons';
import moment from 'moment';
const PermissionMenu = () => {
    const waitTime = (time = 100) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, time);
        });
      };
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    //拖拽排序结束的回调函数
    const handleDragSortEnd = (beforeIndex,afterIndex,newDataSource) => {
        console.log('排序后的数据', newDataSource);
        setDataSource(newDataSource);
        console.log(newDataSource);
        message.success('修改列表排序成功');
      };
    //获取菜单信息
    const getMenu = async() =>{
        const men = await getListApi();
        console.log(men.data);
        const formattedList = men.data.list.map(item => ({
            ...item,
            page:'页面',
            children:item.children?.map(items => ({
                ...items,
                page:'页面'
            }))
        }))
        setDataSource(formattedList)
    }
    useEffect(() => {
        getMenu()
    },[])
    console.log(dataSource);
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
            width: '20%',
            editable: true,
            formItemProps: () => {
                return {
                  rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '菜单路径',
            dataIndex: 'path',
            width: '20%',
            editable: true,
            formItemProps: () => {
                return {
                  rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '权限类型',
            dataIndex: 'page',
            editable: true,
            formItemProps: () => {
                return {
                  rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType:'date',
            editable:false
        },
        {
            title: '操作',
            dataIndex: 'controls',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                  key="editable"
                  onClick={() => {
                    action?.startEditable?.(record._id);
                  }}
                >
                  编辑 
                </a>,
                <a
                key="delete"
                onClick={() => {
                  setDataSource(dataSource.filter((item) => item._id !== record._id));
                }}
                >
                    删除
                </a>,
            ],
        },

    ]
    const dragHandleRender = (rowData, idx) => (
        <>
          <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
          &nbsp;{idx + 1} - {rowData.name}
        </>
      );
    return(
        <div className={style.box}>
            <div className={style.menu}>
                
                <DragSortTable
                      rowKey="_id"
                      headerTitle="菜单列表"
                      loading={false}
                      scroll={{x:960}}
                      value={dataSource}
                      toolBarRender={() => {
                        return [
                          <>
                            <DrawerForm
                            title="新建表单"
                            resize={{
                            onResize() {
                                console.log('resize!');
                            },
                            maxWidth: window.innerWidth * 0.8,
                            minWidth: 800,
                            }}
                            trigger={
                                <Button type="primary">
                                  <PlusOutlined />
                                  新建表单
                                </Button>
                              }
                              autoFocusFirstInput
                              drawerProps={{
                                destroyOnClose: true,
                              }}
                              submitTimeout={2000}
                              onFinish={async (values) => {
                                values.path = values.name1
                                values.page = values.select3
                                values.createTime = moment().format('YYYY-MM-DD')
                                setDataSource([...dataSource,values])
                                message.success('提交成功');
                                // 不返回不会关闭弹框
                                return true;
                              }}
                            >
                                 <div className={style.body}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <ProFormSelect
                                style={{width:'200px'}}
                                name="select2"
                                label="选择菜单等级"
                                showSearch
                                debounceTime={300}
                                request={async ({ keyWords }) => {
                                await waitTime(100);
                                const processedData = dataSource.map(item => ({
                                    value:item.value,
                                    label:item.name
                                }))
                                processedData.unshift({
                                    value:keyWords,
                                    label:'创建新的一级菜单'
                                })
                                return processedData
                                }}
                                placeholder="请选择"
                                rules={[{ required: true, message: '腾达giegie说该项为必填项' }]}
                                />
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <ProForm.Group style={{display:'flex',flexDirection:'column'}}>
                                    <ProFormText
                                        style={{width:'200px',display:'flex',flexDirection:'column'}}
                                        name="name"
                                        label="菜单名称"
                                        tooltip="最长为 24 位"
                                        placeholder="请输入名称"
                                        rules={[{ required: true, message: '请输入签约客户名称' }]}
                                    />
                                </ProForm.Group>
                                <ProFormSelect
                                    style={{display:'flex',flexDirection:'column'}}
                                    name="select"
                                    label="状态"
                                    valueEnum={{
                                    no: '禁用',
                                    ok: '可用',
                                    }}
                                    placeholder="请选择"
                                    rules={[{ required: true, message: '腾达giegie说该项为必填项' }]}
                                />
                                <ProFormSelect
                                    style={{display:'flex',flexDirection:'column'}}
                                    name="select3"
                                    label="权限类型"
                                    valueEnum={{
                                    page: '页面',
                                    button: '按钮',
                                    }}
                                    placeholder="请选择"
                                    rules={[{ required: true, message: '腾达giegie说该项为必填项'}]}
                                />
                            </div>
                            <div>
                            <ProForm.Group >
                                    <ProFormText
                                        style={{display:'flex',flexDirection:'column'}}
                                        name="name1"
                                        label="路径"
                                        tooltip="最长为 18 位"
                                        placeholder="请输入正确的路径"
                                        rules={[{ required: true, message: '请输入路径' }]}
                                    />
                                </ProForm.Group>
                            </div>
                        </div>
                            </DrawerForm>
                          </>
                        ];
                      }}
                      columns={columns}
                      onChange={setDataSource}
                      editable={{
                        type:'multiple',
                        editableKeys,
                        onSave:async(rowKey,data,row) => {
                            console.log(rowKey,data,row);
                            await waitTime(2000)
                        },
                        onChange:setEditableRowKeys
                      }}
                      recordCreatorProps={false} 
                      search={false}
                      pagination={false}
                      dataSource={dataSource}
                      dragSortKey="path"
                      dragSortHandlerRender={dragHandleRender}
                      onDragSortEnd={handleDragSortEnd}
                >   
                </DragSortTable>
                      
            </div>
        </div>
    )
}
export default PermissionMenu
