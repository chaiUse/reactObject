import { useEffect, useState } from 'react';
import { Form, Input,Select, Popconfirm, Table, Typography } from 'antd';
import {stuSearchApi,stuEditApi,stuDelApi} from '../../../../api/classroom/classroom'
// import { useContext } from 'react';
// import { DataContext } from '../data/DataContext';


const StuTable = () => {
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
             <Option value='男' >男</Option>
             <Option value='女' >女</Option>
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
            name = {dataIndex}
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
  // const { data, setData } = useContext(DataContext)
  const [data, setData] = useState([]);// 班级列表的状态
  const [editingKey, setEditingKey] = useState('');//编辑状态
  // const [ teacherList, setTeacherList ] = useState([])//老师选项
  const [ classList, setClassList ] = useState([])//班级选项

  const g = async()=>{
    const res = await stuSearchApi()
    res.data.list.map((item,index)=>{
      item.num = index+1,
      item.key = index
    })
    setData(res.data.list)
    // console.log(11111,res.data.list)
    // // 老师选项
    // setTeacherList([...new Set(res.data.list.map(item => item.teacher))])
    // // 科目类别选项
    setClassList([...new Set(res.data.list.map(item => item.className))])
  }
  useEffect(()=>{
    g()
  },[])

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      num:'',
      username: '',
      sex: '',
      age: '',
      className:'',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async(key) => {
    try {
      const row = await form.validateFields();
      // const newData = [...data];
      const index = data.findIndex((item) => key === item.key);
      // console.log(2222233333,row.username,data[index]._id,row.sex,row.age,row.className)
      const resEdit = await stuEditApi(row.username,data[index]._id,row.sex,Number(row.age),row.className)
      if(resEdit.code === 200){
        // if (index > -1) {
        //   const item = newData[index];
        //   newData.splice(index, 1, {
        //     ...item,
        //     ...row,
        //   });
        //   setData(newData);
        g()
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
    const resDel = await stuDelApi(data[index]._id)
    console.log( '111222',resDel)
    g()
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
      title: '姓名',
      dataIndex: 'username',
      width: '15%',
      editable: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: '15%',
      editable: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '班级',
      dataIndex: 'className',
      width: '20%',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
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
        inputType: col.dataIndex === 'sex' ? 'number' : col.dataIndex === 'className'? 'select':'text',
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

export default StuTable

