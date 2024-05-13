import { useEffect, useState } from 'react';
import style from './testKu.module.scss'
import { Form, Input, Popconfirm, Table, Typography, Select } from 'antd';
import { Link } from 'react-router-dom';
import { getTiKuListApi, getEditTestApi, getDelTestApi, getSearchQuestionApi, getClassifyListApi } from '../../../../api/testBases/testbaseApi';
import TestRight from '../testRight/TestRight';

const TestKu = () => {
  //获取时间函数
  function a() {
    const now = new Date();
    const year = now.getFullYear(); // 获取年份
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 获取月份，并补零
    const day = String(now.getDate()).padStart(2, '0'); // 获取日期，并补零
    const hours = String(now.getHours()).padStart(2, '0'); // 获取小时，并补零
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟，并补零
    const currentTime = `${year}/${month}/${day}/${hours}:${minutes}`;
    return currentTime
  }
  //试题列表
  const [data, setData] = useState([]);
  const getTiKu = async(question) =>{
    const res = await getTiKuListApi(question)
    res.data.list.map(item => {
      item.time = a()
    })
    setData(res.data.list)
    console.log(data);
  }
  //编辑试题
  const getEditTest = async(id, question, type, classify) => {
    const ree = await getEditTestApi(id, question, type, classify)
    // console.log(ree);
  }
  //删除试题
  const getDelTest = async(id) => {
    const red = await getDelTestApi(id)
    // console.log(red);
  }
  //试题类型选择查询
  const getSearchQuestion = async() => {
    const reu = await getSearchQuestionApi()
    let index = []
    index = reu.data.list.map(item => {
      return {
        value: item.value,
        label:item.name
      }
    })
    setOptionss(index);
  }

  //科目类型选择查询
  const getClassifyList = async() => {
    const rec = await getClassifyListApi()
    console.log(rec.data.list)
    let index = []
    index = rec.data.list.map((item, index) => {
      return {
        key:index,
        value: item.name,
        label:item.name
      }
    })
    console.log(index);
    setOptions(index)
  }

  useEffect(() => {
    getTiKu({})
    getEditTest()
    getDelTest()
    getSearchQuestion()
    getClassifyList()
  },[])
  
  //点击删除
  const handleDelete = (_id) => {
    const newData = data.filter((item) => item._id !== _id);
    getDelTest(_id)
    setData(newData);
    setEditingKey('');
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `请输入 ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  //搜索筛选
  const { Search } = Input;
  const onSearch = (question) => {
    getTiKu({question});
  }
  //题型筛选
  const searchChange = (classify) => {
    console.log(classify);
    getTiKu({classify});
  }
  //试题分类筛选
  const searchedChange = (type) => {
    console.log(type);
    getTiKu({type});
  }

  //编辑
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      _id: '',
      question: '',
      type: '',
      classify: '',
      time: '',
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (_id) => {
    try {
      console.log(_id);
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        getEditTest(_id, newData[index].question, newData[index].type, newData[index].classify)
        setEditingKey('');
      } else {
        newData.push(row);
        console.log(newData);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: '试题列表',
      dataIndex: 'question',
      width: '25%',
      editable: true,
      ellipsis: true
    },
    {
      title: '分类',
      dataIndex: 'type',
      width: '15%',
      editable: true,
      render: (text, record) => {
        let typeLabel = '';
        switch (record.type) {
          case '1':
            typeLabel = '单选题';
            break;
          case '2':
            typeLabel = '多选题';
            break;
          case '3':
            typeLabel = '填空题';
            break;
          case '4':
            typeLabel = '判断题';
            break;
          default:
            typeLabel = '未知题型';
        }
        return typeLabel;
      }
    },
    {
      title: '题型',
      dataIndex: 'classify',
      width: '15%',
      editable: true,
    },
      {
      title: '创建时间',
      dataIndex: 'time',
      width: '25%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'left',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确定删除么?" onConfirm={() => handleDelete(record._id)}>
              <a>删除</a>
            </Popconfirm>
            <Popconfirm title="确定取消么?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
          ) : (
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={
                {background:'#1677ff', color:'#ffffff', padding: '4px 8px', borderRadius: '5px'}
              }
            >
              编辑
            </Typography.Link>
            <TestRight />
            </div>
          )
      },
    },
  ];


  //题目类型（数学...）选项列表
  const [options, setOptions] = useState([])
  //试题类型（单选...）选项列表
  const [optionss, setOptionss] = useState([])  

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        // editable: col.editable,
      }),
    };
  });
  return (
    <div className={style.testKu}>
      <button 
        style={{
          width:'100px', height: '30px', background: '#409aff', border: 0 
        }}>
        <Link to='/home/question/create-item' style={{color:'#ffffff'}}>添加试题</Link>
      </button>
      <Form>
      <div className='testSearch' style={{marginTop:'30px', display:'flex', justifyContent:'space-around'}}>
        <Form.Item
          label="试题搜索"
          name="testSearch"
        >
          <Search
            placeholder="请输入题干搜索"
            allowClear
            enterButton="搜索"
            size="middle"
            onSearch={onSearch}
          />
        </Form.Item>  
        <Form.Item
          label="试题分类"
          name="testType"
        >
          <Select 
            placeholder="请选择"
            style={{
              width: 120,
            }}
            onChange={searchedChange}
            options={optionss}
          />
        </Form.Item>
        <Form.Item
          label="题目类型"
          name="titleType"
        >
          <Select 
            placeholder="请选择题型"
            style={{
              width: 120,
            }}
            onChange={searchChange}
            options={options}
          />
        </Form.Item>
      </div>
      </Form>
      <Form form={form} component={false}>
        <Table
          components={{body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          // rowClassName="editable-row"
          rowClassName={() => 'editable-row'}
          pagination={{ onChange: cancel }}
          rowKey="_id"
        />
      </Form>
    </div>
    
  );
};
export default TestKu;