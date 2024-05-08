// import React from 'react'
import { Select } from "antd"

const TestNew = () => {

  return (
    <div className="testNew">
      <div className="btns">
        <button>手动添加</button>
        <button>批量导入</button>
      </div>
      <div className="newTest" style={{display:'flex'}}>
        <div className="testType" style={{width: 400, marginRight:'40px'}} >
          <p>题型</p>
          <Select
            defaultValue= '选择题型'
            style={{
              width: 400,
            }}
            allowClear
            options={[
              {
                value: '判断题',
                label: '判断题',
              },
              {
                value: '单选题',
                label: '单选题',
              },
              {
                value: '多选题',
                label: '多选题',
              },
              {
                value: '填空题',
                label: '填空题',
              },
            ]}
          />
        </div>
        <div className="testType" style={{width: 400}}>
          <p>分类</p>
          <Select
            defaultValue="选择科目"
            style={{
              width: 400,
            }}
            allowClear
            options={[
              {
                value: 'lucy',
                label: 'Lucy',
              },
            ]}
          />
        </div>  
      </div>

    </div>
  )
}

export default TestNew