

import { useEffect, useState, useLayoutEffect } from 'react';
import { inquireAboutDetailsExaminationPaper } from '@/api/chai/chia'
import { List, Card } from "antd";

const PaperList = (props) => {
  const singleTopic = ['A. ', 'B. ', 'C. ', 'D. ']
  // console.log(props);
  const titArr = (arr, type) => {
    if (!Array.isArray(arr)) return false
    const newArr = []
    arr.forEach((a, b) => {
      if (a?.type === type) {
        newArr.push(a)
      }
    })
    return newArr.length > 0 ? newArr : false
  }
  return (
    titArr(props.data?.questions, props.type) ?
      <div >
        {<li style={{height:'14px'}}>{props.tit}</li>}
        <List
          // bordered
          split={false}
          // header={<div>{props.tit}</div>}
          locale={{}}
          dataSource={titArr(props.data?.questions, props.type)}
          renderItem={(item, index) => (
            <div >

              <List.Item style={{ color: 'red' }} className='list'>
                {index + 1} {' . '} {item.question ? item.question : ''}

              </List.Item>
              <List.Item className='list'>
                <List
                  dataSource={item?.options}
                  size='small'
                  // metaMarginBottom={0}
                  // titleMarginBottom={0}
                  grid={{
                    // column:6,
                    gutter: 6,
                  }}
                  renderItem={(item, index) => (
                    <List.Item >
                      {singleTopic[index]}{item}
                      {/* {item} */}
                    </List.Item>
                  )}
                />
              </List.Item>
            </div>
          )}
        />
      </div>
      : <div></div>
  )
}

export default PaperList