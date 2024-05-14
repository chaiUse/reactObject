import { useEffect, useState } from 'react';
import { Button, Steps, theme } from 'antd';
import First from './First/First'

import Second from './Second/Second'

import {posTestApi} from '../../../../api/testpaper/testpaper'


const steps = [
    {
        title: 'First',
    
        content: First ,
      },
      {
        title: 'Second',
   
        content: Second,
      },
     
  ];

  
function Create() {
    const [stepValues, setStepValues] = useState({});
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
   
  
      
    const next = (data) => {
        
    
       
        if(data){
            setStepValues(data);
            setCurrent(current + 1);
            posTestApi(data)
            console.log('Create调用posTestApi创建接口');
        }
        
    };
    const prev = () => {
      setCurrent(current - 1);
    };

   

    const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
    }));
    const contentStyle = {
      lineHeight: '260px',
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
    };
    // 渲染当前步骤的组件，并传递 next 和 prev 函数作为 props
  const CurrentContent = steps[current].content;
    return (
      <>
        <Steps current={current} items={items}  />
        <div style={contentStyle}><CurrentContent next={next} prev={current > 0 ? prev : null}  stepValues={stepValues} /></div>
        <div
          style={{
            marginTop: 24,
          }}
        >
      
          
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              返回上一次操作
            </Button>
          )}
        </div>
      </>
    );
}

export default Create