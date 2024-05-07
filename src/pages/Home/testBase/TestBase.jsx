// import React from 'react'
import style from './testBase.module.scss'
// import TestContent from './components/testComtent/TestContent'
import TestKu from './components/testKu/TestKu'

const TestBase = () => {
  return (
    <div className={style.testBase}>
      <main>
        {/* <TestContent /> */}
        <TestKu />
      </main>
    </div>
  )
}

export default TestBase