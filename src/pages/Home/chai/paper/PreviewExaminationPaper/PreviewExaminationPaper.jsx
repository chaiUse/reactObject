

import { useEffect, useState, useLayoutEffect, forwardRef } from 'react';
import { inquireAboutDetailsExaminationPaper } from '@/api/chai/chia'
import { List, Card, Flex } from "antd";
import PaperList from './liet';

const PreviewExaminationPaper = forwardRef((props, ref) => {
  console.log(props.id);
  const singleTopic = ['A. ', 'B. ', 'C. ', 'D. ']
  const [data, setData] = useState()
  const getData = async (id) => {

    const res = await inquireAboutDetailsExaminationPaper(id)
    console.log('res', res);
    setData(res.data)
  }

  const titArr = (arr, type) => {
    if (!Array.isArray(arr)) return ''
    const newArr = []
    arr.forEach((a, b) => {
      if (a?.type === type) {
        newArr.push(a)
      }
    })
    return newArr.length > 0 ? newArr : ''
  }
  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(232323, titArr(data?.questions, '1'));
    }
  }, [data])
  useLayoutEffect(() => {
    getData(props.id)
  }, [props.id])
  return (
    <div ref={ref} style={{ padding: '3px', position: 'relative', background: '#fff', zIndex: 9 }}>
      <Flex vertical={true} justify='center' align='center' gap={5}>
        <div className="name" style={{ fontSize: '20px', margin: '0 15px 15px' }}>{data?.name}</div>
        <div className="classify" style={{ fontSize: '18px' ,padding:'0 0 10px'}}>科目：{data?.classify}</div>
      </Flex>

      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />


      {/* <div> */}
        
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      <PaperList data={data} type='1' tit='单选题' />
      <PaperList data={data} type='2' tit='多选题' />
      <PaperList data={data} type='3' tit='判断题' />
      <PaperList data={data} type='4' tit='填空题' />
      </div>

    // </div>

  )
})

export default PreviewExaminationPaper