// import React from 'react'
import style from './testBase.module.scss'
import TestContent from "./components/TestContent"

const TestBase = () => {
  return (
    <div className={style.testBase}>
      <main>
        <TestContent />
      </main>
    </div>
  )
}

export default TestBase