import style from './testContent.module.scss'
import { useEffect, useState } from 'react';
import { getTestListApi, getCreateTestApi, getDeleteTestApi, getCreateClassApi } from '../../../../api/testBases/testbaseApi';
import { EditableProTable, ProFormRadio } from '@ant-design/pro-components';

const TestContent = () => {
  const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [position, setPosition] = useState('bottom');
   //调用科目列表接口
  const getTestList = async() => {
    const ret = await getTestListApi()
    setDataSource(ret.data.list);
  }
  //调用创建科目接口
  const getCreateClass = async(name, value)=>{
    const ref = await getCreateClassApi(name, value)
    console.log(ref);
  }
  //调用编辑科目接口
  const getCreateTest = async(id, name, value)=>{
    const rec = await getCreateTestApi(id, name, value)
    console.log(rec);
  }
  //调用删除科目接口
  const getDeleteTest = async(id)=>{
    const red = await getDeleteTestApi(id)
    console.log(red);
  }
  
  useEffect(()=>{
    getTestList()
    getCreateTest()
    getDeleteTest()
    getCreateClass()
  },[])
  const columns = [
    {
      title: '学科名称',
      dataIndex: 'name',
      width: '15%',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '学科内容',
      dataIndex: 'value',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          编辑
        </a>
      ],
    },
  ];

  return (
    <div className={style.testContent} >
      <EditableProTable
        rowKey="_id"
        headerTitle="学科创建表"
        maxLength={300}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: position ,
          // 每次新增的时候需要Key
          record: () => ({ _id: (Math.random() * 1000000).toFixed(0) }),
        }}
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key ="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            if(data._id.length < 8){
              getCreateClass(data.name, data.value)
            }else{
              getCreateTest(data._id, data.name, data.value)
            await waitTime(1000);
            }
          },
          onDelete: async () => {
            await getDeleteTest(editableKeys)
          },
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default TestContent