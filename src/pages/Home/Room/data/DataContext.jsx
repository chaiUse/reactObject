import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // 初始化数组状态
  const [data, setData] = useState([]);

  // 返回 Provider 组件，其中包含共享的 data 和 setData 函数
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};