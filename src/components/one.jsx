import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { change } from '../store/one'

const One = () => {
  const tit =useSelector(s=>s.oneStore.tit)
  const dispatch=useDispatch()
  return (
    <div>
      {tit}
      <input value={tit} onChange={(e)=>{dispatch(change(e.target.value))}}/>
    </div>
  )
}

export default One