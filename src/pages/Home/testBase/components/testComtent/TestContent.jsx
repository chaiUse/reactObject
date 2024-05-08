// import style from './testContent.module.scss'
import { useEffect, useState } from 'react';
import { getTestListApi } from '../../../../../api/testBase/testbaseApi';
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
  
  useEffect(()=>{
    getTestList()
  },[])
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '描述',
      dataIndex: 'value',
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
    <>
    <EditableProTable
      rowKey="_id"
      headerTitle="可编辑表格"
      maxLength={5}
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
          key="render"
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
          await waitTime(2000);
        },
        onChange: setEditableRowKeys,
      }}
    />
  </>
  );
};

export default TestContent