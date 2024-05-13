import React from 'react';
// import {addSecondApi} from '../../../../../api/user/user'
import { Space, Table, Tag } from 'antd';





const columns = [
  // ... 列定义保持不变 ...
  {
    title: '考试班级',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '科目分类',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '试卷创建人',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '试卷创建时间',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  
];



const Second = (props) => {
  // 假设父组件传递了一个名为 `customTitle` 的 prop
  
  const stepValues = props.stepValues;
  console.log(stepValues);
 
  
 
  const currentDateTime = new Date(); // 创建一个Date对象，它将包含当前时间
 
  const data = [
    // ... 数据数组保持不变 ...
    {
      key: '1',
      name: stepValues. classify,
      age: stepValues.group,
      address: stepValues.name,
      tags: [`${currentDateTime.toLocaleString()}`],
      
    },
  ];

  return (
    <div>
      <h1>已创建成功</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Second;