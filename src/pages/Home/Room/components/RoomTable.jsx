import { useEffect, useState } from 'react';
import { Form, Input,Select, Popconfirm, Table, Typography } from 'antd';
import {roomSearchApi,roomEditApi,roomDelApi} from '../../../../api/classroom/classroom'
import React, { useContext } from 'react';
import { DataContext } from '../data/DataContext';


const RoomTable = () => {
  const { Option } = Select;
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
    const inputNode = inputType === 'number' ? <Select
        showSearch// 启用搜索功能
        placeholder="请选择或输入">
          {teacherList.map(item=>(
             <Option value={item} key={item}>{item}</Option>
          ))}
      </Select> :inputType === 'select' ? 
       <Select
       placeholder="请选择或输入">
        {classList.map(item=>(
             <Option value={item} key={item}>{item}</Option>
          ))}
     </Select>
      : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                messteacher: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();
  const { data, setData } = useContext(DataContext)
  // const [data, setData] = useState([]);// 班级列表的状态
  const [editingKey, setEditingKey] = useState('');//编辑状态
  const [ teacherList, setTeacherList ] = useState([])//老师选项
  const [ classList, setClassList ] = useState([])//科目类别选项

  const b = async()=>{
    const res = await roomSearchApi()
    console.log(res.data.list)
    res.data.list.map((item,index)=>{
      item.num = index+1,
      item.key = index
    })
    setData(res.data.list)
    console.log('bbb',res.data.list)
    // 老师选项
    setTeacherList([...new Set(res.data.list.map(item => item.teacher))])
    // 科目类别选项
    setClassList([...new Set(res.data.list.map(item => item.classify))])
  }
  useEffect(()=>{
    b()
  },[])

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      num:'',
      name: '',
      teacher: '',
      classify: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      // const newData = [...data];
      const index = data.findIndex((item) => key === item.key);
      const resEdit = await roomEditApi(row.name,data[index]._id,row.teacher,row.classify)
      if(resEdit.code === 200){
        // if (index > -1) {
        //   const item = newData[index];
        //   newData.splice(index, 1, {
        //     ...item,
        //     ...row,
        //   });
        //   setData(newData);
        b()
        setEditingKey('');
  
        // } else {
        //   newData.push(row);
        //   setData(newData);
        //   setEditingKey('');
        // }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = async(key) => {
    if (editingKey === key) {
      // 如果是，重置 editingKey
      setEditingKey('');
    }
    // const newData = data.filter((item) => item.key !== key);
    const index = data.findIndex((item) => key === item.key);
    const resDel = await roomDelApi(data[index]._id)
    console.log( '111222',resDel)
    b()
    // setData(newData);
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'num',
      width: '5%',
      editable: false,
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '老师',
      dataIndex: 'teacher',
      width: '15%',
      editable: true,
    },
    {
      title: '科目类别',
      dataIndex: 'classify',
      width: '20%',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '20',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确定要取消编辑吗?" onConfirm={cancel} okText="是的，取消" cancelText="不，继续编辑">
              <a style={{marginRight: 8}}>取消</a>
            </Popconfirm> 
            <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.key)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'teacher' ? 'number' : col.dataIndex === 'classify'? 'select':'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default RoomTable;