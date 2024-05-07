
import { useSelector ,useDispatch } from 'react-redux'
import { change } from '../store/one'

import
{ Button }
from
"antd"
;
import { getOldSearch } from '../api/one';
const One = () => {
  const tit =useSelector(s=>s.oneStore.tit)
  const dispatch=useDispatch()
  const fn =async ()=>{
    const res =await getOldSearch()
    console.log(res);
  }
  fn()
  return (
    <div>
      {tit}
      <input value={tit} onChange={(e)=>{dispatch(change(e.target.value))}}/>
      <Button type="primary"  >
            Search
          </Button>
    </div>
  )
}

export default One