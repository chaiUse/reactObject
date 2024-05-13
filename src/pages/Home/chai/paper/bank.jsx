
import { useEffect, useState, useRef } from 'react';


import { queryLstExaminationPapers, inquireAboutDetailsExaminationPaper, delExaminationPaper } from '../../../../api/chai/chia'

import { Table, Flex, Button, Drawer, message } from "antd";

import dayjs from 'dayjs'
import PreviewExaminationPaper from './PreviewExaminationPaper/PreviewExaminationPaper';
import useCompToPDF from '../../../../components/PDF/PDF';
import App from './ss';


const Bank = (page, pagesize) => {
  const [loading,setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  //调用
  const ref = useRef(null);
  const exportPDF = useCompToPDF({ fileName: '报告' });
  console.log('exportPDF', exportPDF);


  //#region 试卷列表数据
  // 表格数据
  const [dataSource, setDataSource] = useState()
  // 完整数据
  const [data, setData] = useState()
  // 调接口 拿数据
  let getData = async (page, pagesize) => {
    const res = await queryLstExaminationPapers()
    console.log('res', res);
    setData(res.data)
    setDataSource(res.data.list)
  }
  // 表头
  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '科目类型',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '总分',
      dataIndex: '_v',
      key: '_v',
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
      render: (text, record, index) => {
        return (
          <div>
            {dayjs(text).format('YYYY/MM/DD hh:mm:ss')}
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => {

        return (
          <Flex gap='small'>
            <Button type='primary'> 编辑 </Button>
            <Button type='primary' danger onClick={async () => {
              delExaminationPaper(text).then((res) => {

                messageApi.open({
                  type: 'success',
                  content: '删除用户成功',
                });
                getData()
              })
            }}> 删除 </Button>
            <Button type='' onClick={() => { showDrawer(text) }}> 预览试卷 </Button>
          </Flex>
        )
      }
    },
  ];
  //#endregion

  //#region 抽屉 预览试卷 PreviewExaminationPaper

  const [open, setOpen] = useState(false);
  const [paperId, setPaperId] = useState()
  const showDrawer = async (paperId) => {
    setPaperId(paperId)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //#endregion


  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className="query">
        <Flex gap='small'>
          <Button type='primary'>创建试卷</Button>
          <Button type='primary'>导出execl</Button>
        </Flex>
          <App  data={dataSource}/>

      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={
          <Flex justify='space-between' align='center'>
            <div>试卷预览</div>
            <Flex gap='small'>

              <Button onClick={() => {
                setLoading(true)
                console.log(ref, exportPDF, 9999);
                exportPDF(ref.current).then(res=>{
                  // console.log(656565,res);
                  setLoading(!res)
                })
              }} loading={loading}>导出PDF</Button>
              <Button type='primary' onClick={onClose}>OK</Button>
            </Flex>
          </Flex>
        }
        onClose={onClose}
        open={open}
        width='700'>
        <PreviewExaminationPaper id={paperId} ref={ref} />
      </Drawer>

      {/* 全局提示 */}
      {contextHolder}
    </div>
  )
}

export default Bank