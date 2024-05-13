import React, { useState } from 'react';
import { addSecondApi } from '../../../../../api/user/user'

function Last() {

  
    const [examData, setExamData] = useState({ /* 初始化考试数据 */ });
  
    // 处理表单提交的函数
    const handleExamSubmit = async () => {
      try {
        // 调用 API 创建考试
        const response = await addSecondApi(examData);
  
        // 检查响应状态
        if (response.ok) {
          // 使用 response.json() 解析返回的 JSON 数据
          const data = await response.json();
          console.log('考试创建成功，返回的数据：', data);
          // 在这里可以根据返回的数据进行进一步操作，比如更新状态或导航到其他页面
        } else {
          console.error('创建考试失败，响应状态码：', response.status);
        }
      } catch (error) {
        console.error('创建考试时发生错误：', error);
      }
    };




  return (
    <div><h1>创建成功</h1></div>
  )
}

export default Last