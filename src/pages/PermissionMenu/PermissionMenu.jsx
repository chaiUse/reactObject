import { useEffect, useState } from 'react'
import style from './permissonMenu.module.scss'
import {createPre,findPre,updatePre,deletePre} from "../../api/permissionMenu/permissionMenu"
import { Button,message,Pagination } from 'antd';
import {
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
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // 计算当前页需要显示的数据
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = dataSource.slice(startIndex, endIndex);

    // 当页码变化时的处理函数
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    //拖拽排序结束的回调函数
    const handleDragSortEnd = (beforeIndex,afterIndex,newDataSource) => {
        console.log('排序后的数据', newDataSource);
        setDataSource(newDataSource);
        console.log(newDataSource);
        message.success('修改列表排序成功');
      };
    //获取菜单信息
    const getMenu = async() =>{
        const men = await findPre();
        console.log(men.data);
        const formattedList = men.data.list.map(item => ({
            ...item,
            page:'页面',
            level:1,
            children:item.children?.map(items => ({
                ...items,
                page:'页面',
                level:2,

            }))
        }))
        setDataSource(formattedList)
    }
    //生成唯一的_id
    // 生成唯一的 _id
    const generateId = () => {
        const timestamp = (new Date()).getTime().toString(16); // 当前时间戳的16进制表示
        const randomStr = Math.random().toString(16).slice(2, 8); // 6位随机数的16进制表示
        return timestamp + randomStr;
    };
    //创建菜单
    const create = async(name,_id,path,disabled) => {
        console.log();
        // const _id = generateId()
        const res = await createPre(name,_id,path,disabled)
        console.log(res);
    }
    //删除菜单
    const dele = async(_id) => {
        const ref = await deletePre(_id)
        console.log(ref);
    }
    //编辑菜单
    const editor = async(_id,name) => {
        const red = await updatePre(_id,name)
        console.log(8888,red);
    }
    useEffect(() => {
        getMenu(),
        create(),
        dele(),
        editor()
    },[])
    console.log(dataSource);
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
            width: '20%',
            key:'name',
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
            key:'path',
            formItemProps: () => {
                return {
                  rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '权限类型',
            dataIndex: 'page',
            key:'page',
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
            key:'createTime',
            valueType:'date',
            editable:false
        },
        {
            title: '操作',
            dataIndex: 'controls',
            key:'controls',
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
                  dele(record._id)
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
      //提交新建表单
      
    return(
        <div className={style.box}>
            <div className={style.menu}>
                
                <DragSortTable
                      rowKey="_id"
                      headerTitle="菜单列表"
                      loading={false}
                      scroll={{x:960}}
                      // value={dataSource}
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
                                values.createTime = moment().format('YYYY-MM-DD')
                                const exisTingIndex = dataSource.findIndex(item => item.name === values.name)
                                if(exisTingIndex !== -1){
                                  const _id = dataSource[exisTingIndex]._id
                                  values._id = _id
                                  console.log(values.name);
                                  console.log(values.name1);
                                  console.log(dataSource[exisTingIndex]);
                                  dataSource[exisTingIndex].children.push({
                                    ...values,
                                    name:values.name1
                                  })
                                }else {
                                  const _id = generateId()
                                  values._id = _id
                                  setDataSource(pre => [
                                    ...pre,
                                    {
                                      ...values,
                                      name:values.name1,
                                      children:[]
                                    }
                                  ])
                                }
                            try{
                                await create(values._id,values.name1,values.path,values.disabled);
                                message.success('提交成功');
                                console.log(values);
                                return true
                            } catch(error) {
                                console.error('发送请求失败',error);
                                message.error('提交失败，请重试')
                                return false
                            }
                            
                          }}
                            >
                            <div className={style.body}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <ProFormSelect
                                style={{width:'200px'}}
                                name="name"
                                label="选择菜单等级"
                                showSearch
                                debounceTime={300}
                                request={async ({ keyWords }) => {
                                  // await waitTime(100);
                                  // const processedData = dataSource.map(item => ({
                                  //     value:item.value,
                                  //     label:item.name
                                  // }))
                                  // processedData.unshift({
                                  //     value:keyWords,
                                  //     label:'创建新的一级菜单'
                                  // })
                                  // return processedData
                                  await waitTime(100);
                                  // 如果存在 keyWords，说明是搜索操作，则返回一个包含搜索结果的数组
                                  if (keyWords) {
                                      return dataSource
                                          .filter(item => item.name.includes(keyWords)) // 使用 includes 进行模糊匹配
                                          .map(item => ({
                                              value: item.name,
                                              label: item.name
                                          }));
                                  } else {
                                      // 如果不存在 keyWords，说明是初始加载，则直接返回所有数据的数组
                                      const processedData = dataSource.map(item => ({
                                          value: item.name,
                                          label: item.name
                                      }));
                                      // 在数组开头插入一个选项，用于创建新的一级菜单
                                      processedData.unshift({
                                          value: keyWords,
                                          label: '新建一级菜单'
                                      });
                                      return processedData;
                                  }
                                }}
                                placeholder="请选择"
                                rules={[{ required: true, message: '腾达giegie说该项为必填项' }]}
                                />
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <ProForm.Group style={{display:'flex',flexDirection:'column'}}>
                                    <ProFormText
                                        style={{width:'200px',display:'flex',flexDirection:'column'}}
                                        name="name1"
                                        label="菜单名称"
                                        tooltip="最长为 24 位"
                                        placeholder="请输入名称"
                                        rules={[{ required: true, message: '请输入签约客户名称' }]}
                                    />
                                </ProForm.Group>
                                <ProFormSelect
                                    style={{display:'flex',flexDirection:'column'}}
                                    name="disabled"
                                    label="状态"
                                    valueEnum={{
                                    false: '禁用',
                                    true: '可用',
                                    }}
                                    placeholder="请选择"
                                    rules={[{ required: true, message: '腾达giegie说该项为必填项' }]}
                                />
                                <ProFormSelect
                                    style={{display:'flex',flexDirection:'column'}}
                                    name="page"
                                    label="权限类型"
                                    valueEnum={{
                                    页面: '页面',
                                    按钮: '按钮',
                                    }}
                                    placeholder="请选择"
                                    rules={[{ required: true, message: '腾达giegie说该项为必填项'}]}
                                />
                            </div>
                            <div>
                            <ProForm.Group >
                                    <ProFormText
                                        style={{display:'flex',flexDirection:'column'}}
                                        name="path"
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
                        onDelete: async () => {
                            await dele(editableKeys)
                          },
                        onChange:setEditableRowKeys
                      }}
                      key={dataSource._id}
                      recordCreatorProps={false} 
                      search={false}
                      pagination={false}
                      dataSource={currentData}
                      dragSortKey="name"
                      dragSortHandlerRender={dragHandleRender}
                      onDragSortEnd={handleDragSortEnd}
                >   
                
                </DragSortTable>
                <Pagination 
                defaultCurrent={1}
                total={dataSource.length} 
                style={{float:'right'}}
                defaultPageSize={10}
                pageSizeOptions={[10,20,50,100]}
                onChange={onPageChange}
                /> 
            </div>
            
        </div>
    )
}
export default PermissionMenu
