// import React from 'react'
import style from './testBase.module.scss'
import TestContent from './components/testComtent/TestContent'
// import TestKu from './components/testKu/TestKu'
// import TestNew from './components/testNew/TestNew'

const TestBase = () => {
  return (
    <div className={style.testBase}>
      <main>
        <TestContent />
        {/* <TestKu /> */}
        {/* <TestNew /> */}
      </main>
    </div>
  )
}

export default TestBase