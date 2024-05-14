
import React, { useEffect, useState } from 'react';
import style from "./testPaper.module.scss";
import instance from '../../../api/api'
import { posTrevomApi, posTupApi } from '../../../api/testpaper/testpaper'
import dayjs from 'dayjs';
import { Table, Button, Drawer, Modal, Space, Select ,  Form, Input ,DatePicker } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const testPaper = () => {
  const [list, setList] = useState([]); // 初始化 list 状态
  const [ccc, setccc] = useState(null)
  useEffect(() => {


    fetchTestPapers(); // 调用异步函数
    console.log('调用fetchTestPapers');


  }, [])
  const fetchTestPapers = async () => {
    try {
      const res = await instance.get("/examination/list");

      setList(res.data.list); // 更新状态
      // console.log('更新数据',res);

    } catch (error) {
      console.error("Failed to fetch test papers: 请求失败 ", error);
    }
  };

 
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: '考试名称',
      dataIndex: 'name',
    },
    {
      title: '科目分类',
      dataIndex: 'chinese',
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: '创建者',
      dataIndex: 'math',
      // sorter: {
      //   compare: (a, b) => a.math - b.math,
      //   multiple: 2,
      // },
    },
    {
      title: '创建时间',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 4,
      // },
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 5,
      // },
    },
    {
      title: '考试班级',
      dataIndex: '考试班级',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 6,
      // },
    },
    {
      title: '开始时间',
      dataIndex: 'formstartTime',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 7,
      },
    },
    {
      title: '结束时间',
      dataIndex: 'formendTime',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 8,
      },
    },
    {
      title: '设置',
      dataIndex: 'style',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 9,
      // },
      render: (a, b) => {
        // console.log(b.questionsList[0]);
        return <div>
          <Button type="primary"

            onClick={() => {
              showDrawer()
              console.log('b', b.questionsList);
              setccc(b.questionsList)

            }}>
            查看考试内容
          </Button>
        </div>
      }
    },

    {
      title: '删除',
      dataIndex: 'rem',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 10,
      // },
      render: (a, b) => {

        return <div><Removes record={b} /></div>
      }
    },
    {
      title: '修改',
      dataIndex: 'up',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 10,
      // },
      render: (a, b) => {
        // console.log('这个B',b);
        return <div><Updata record={b} /></div>
      }
    },
  ];

  // 渲染数据
  const data = list.map((item, index) => {
    const formcreateTime = formatTimestamp(item.createTime);
    const formendTime = formatTimestamp(item.endTime);
    const formstartTime = formatTimestamp(item.startTime);
    // 使用三元运算符根据 item.status 设置状态
    const status = item.status ? '已结束' : '正在开始';
    return {
      ...item,
      key: index.toString(),
      name: item.name, // 确保从item中获取name
      chinese: item.classify, // 从item中获取chinese分数
      math: item.creator,       // 从item中获取math分数
      english: formcreateTime, // 从item中获取english分数
      formendTime,
      formstartTime,
      status,
      examiner: item.examiner,

    };
  });


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  //日期转换
  function formatTimestamp(timestamp) {
    // 将时间戳转换为日期对象
    const date = new Date(timestamp);

    // 获取年、月、日、时、分、秒，并格式化为两位数
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    // 拼接成 "年-月-日 时：分：秒" 格式
    const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDateTime;
  }

  //  修改数据
  const Updata = ({ record }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();
    const handleConfirm = () => {
      form.validateFields()
        .then((values) => {
          // console.log('values.createTime before parsing:创建时间', values.createTime);
           // 假设values.createTime是一个日期时间字符串 
          const createTimeString = values.createTime;
          // 使用Date.parse()将日期时间字符串转换为时间戳
          const createTimeTimestamp = Date.parse(createTimeString);

          // console.log(values.createTime); // 显示原始的日期时间字符串
          // console.log('转换后的时间戳:', createTimeTimestamp);
          // console.log(values.createTime)
          // console.log('点接口修改前', record);
          // console.log('点接口修改后的值', values);
          posTupApi({ ...values, createTime: createTimeTimestamp })
          fetchTestPapers()
          // 更新成功后，可以手动关闭模态框
          form.resetFields();
      
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    };
  
    const handleCancel = () => {
      form.resetFields();
      
    };
    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    
    
    const dateFormat = 'YYYY-MM-DD';
    return (
      <>
        <Button type="primary" onClick={() => modal.confirm({ 
          title: '修改考试内容',
          icon: <ExclamationCircleOutlined />,
          content: (
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="修改考试名字"
                rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="classify"
                label="修改科目"
                rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record.classify}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="examiner"
                label="修改监考人"
                rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record.examiner}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="creator"
                label="修改创建人"
                rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record.creator}
              >
                <Input />
              </Form.Item>
              
              <Form.Item name="createTime" label="修改创建时间" >
                <DatePicker showTime needConfirm="年/月/日 时:分"  defaultValue={dayjs(record.createTime)} />
                
              </Form.Item>
              {/* <Form.Item
                name="createTime"
                label="修改创建时间"
                rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record.createTime}
              >
               <TimePicker />
              </Form.Item> */}
              <Form.Item
                name="_id"
                label="当前考试项id"
                // rules={[{ required: true, message: '请输入要修改的内容' }]}
                initialValue={record._id}
              >
                <span>{record._id}</span>
              </Form.Item>
              {/* 这里可以添加更多的表单项 */}
            </Form>
          ),
          okText: '更新',
          cancelText: '取消',
          onOk: handleConfirm,
          onCancel: handleCancel,
        })}
        >
          修改数据
        </Button>
        {contextHolder}
      </>
    );
  };

  //删除框
  const Removes = ({ record }) => {
    const [modal, contextHolder] = Modal.useModal();
    const confirm = (item) => {
      modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          posTrevomApi(item._id)
          fetchTestPapers()
          // 在这里处理确认事件，例如调用 API 删除数据
          // console.log('点接口删除',item._id);
        },
      });
    };
    // 删除按钮的点击事件处理器
    const handleDeleteClick = () => {
      confirm(record); // 调用 confirm 函数并传递当前项 record
    };
    return (
      <>
        <Space>
          <Button onClick={handleDeleteClick}>删除</Button>
        </Space>
        {contextHolder}
      </>
    );
  };
  const { Option } = Select;
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  useEffect(() => {
    // 初始化 list 数组
    const opts = [];
    for (let i = 10; i < 36; i++) {
      opts.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
      });
    }
    setList(opts); // 确保使用正确的状态setter
  }, []); // 空依赖数组确保仅在组件挂载时运行

  // 处理输入变化的函数
  const handleChange = async (value) => { // 标记为async，因为内部使用了await
    console.log('value', value);
    const values = Array.isArray(value) ? value : [value]; // 确保 values 是数组

    // 清空过滤条件，重新获取所有选项
    if (values.length === 0 || value === '') {
      return fetchTestPapers()
    } else {
      // 过滤出包含输入值的选项
      const updatedFilteredOptions = list.filter(item =>
        values.some(val =>
          val && typeof val === 'string' && // 确保 val 是字符串
          (item.name.toLowerCase().includes(val.toLowerCase()))
        )
      );

      // 更新过滤后的状态
      // setFilteredOptions(updatedFilteredOptions);
      setList(updatedFilteredOptions)
      // 打印过滤后的选项
      // console.log('filteredOptions',filteredOptions );
      // console.log('updatedFilteredOptions',updatedFilteredOptions );
    }


  };
  return (
    <div className={style.box}>
      <Select
        mode="tags"
        style={{ width: '100%' }}
        onChange={handleChange} // 注意这里应该是 handleChange 而不是 handleChange()
        tokenSeparators={[',']}
      >
        {filteredOptions.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
      <h3 className={style.name}>考试管理/创建考试</h3>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Drawer title="考试题目" onClose={onClose} open={open} >
        {JSON.stringify(ccc)}
      </Drawer>

    </div>
  )

}
export default testPaper