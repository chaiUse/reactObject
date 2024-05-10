import { useEffect, useState } from 'react'
import style from './permissonMenu.module.scss'
import { createPre, findPre ,updatePre, deletePre } from '../../api/permissionMenu/permissionMenu'
import { getListApi } from '../../api/user/user'
import formatTimestamp from '../../tool/date'
const PermissionMenu = () => {
    //数据
    const[list,setList] = useState([])
    //添加菜单是否展示
    const[show,setShow] = useState(false)
    //选择列表是否展开
    const[showList,setShowList] = useState(false)
    const[active1,setActive1] = useState(false)
    //查看当前下标
    const[curIndex,setCurIndex] = useState(0)
    //切换图片展示隐藏内容
    const[changeIndex,setChangeIndex] = useState(true)
    //用于存储正在编辑的元素
    const[nowPop,setNowPop] = useState([])
    //存储输入框菜单名称的值
    const[inputValue1,setInputValue1] = useState("")
    const[inputValue2,setInputValue2] = useState("")
    const[inputValue3,setInputValue3] = useState("")
    //控制输入框显示或者隐藏
    const[showInput,setShowInput] = useState(false)
    //检查为空弹错误
    const[error,setError] = useState('')
    //点击切换为保存和取消
    const[isChange,setIsChange] = useState(false)
    //处理编辑操作
    const handEdit = (index) => {
        //显示输入框
        setShowInput(true),
        //设置正在编辑的索引
        setNowPop(pre => [...pre,index])
        //设置输入框初始值为当前元素的值
        setInputValue1(list[index].name)
        setInputValue2(list[index].path)
        setInputValue3('页面')
    }
    //处理保存操作
    const handSave = (index) => {
        //查看输入框的值是否为空
        if(!inputValue1.trim()) {
            setError('该字段不能为空')
            return
        }
        if(!inputValue2.trim()) {
            setError('该字段不能为空')
            return
        }
        if(!inputValue3.trim()) {
            setError('该字段不能为空')
            return
        }
        //结束编辑状态
        setNowPop(pre => pre.filter(i => i !== index));
        //隐藏输入框
        setShowInput(false)
        //清空错误消息
        setError('')
    }
    //取消操作
    const handCanle = (index) => {
        setNowPop(pre => pre.filter(i => i !== index))
        setShowInput(false)
        setError('')
    }
    //输入框变化
    const handChange1 = (e) => {
        setInputValue1(e.target.value)
        setError('')
    }
    const handChange2 = (e) => {
        setInputValue2(e.target.value)
        setError('')
    }
    const handChange3 = (e) => {
        setInputValue3(e.target.value)
        setError('')
    }
    //修改加减展示隐藏内容
    const clickList = (index) => {
        setChangeIndex(
            pre => ({
            ...pre,
            [index]: !pre[index]
        }))
    }
    //点击添加高亮和展示列表
    const handClick = () => {
        setShowList(true)
        setActive1(!active1)
    }
    //获取菜单信息
    const getMenu = async() =>{
        const creat = await createPre();
        const finde = await findPre();
        const updates = await updatePre();
        const dele = await deletePre();
        const men = await getListApi();
        console.log(men.data);
        console.log(creat.data);
        console.log(finde.data);
        console.log(updates.data);
        console.log(dele.data);
        const formatted = men.data.list.map(item => ({
            ...item,
            createTime:formatTimestamp(item.createTime,false),
            children:item.children?.map(items => ({
                ...items,
                createTime:formatTimestamp(items.createTime,false)
            }))
        }))
        setList(formatted)
    }
    useEffect(() => {
        getMenu()
    },[])
    console.log(list);
    return(
        <div className={style.box}>
            <div className={style.menu}>
                
                <header>
                    <span>菜单列表 </span>
                    <p onClick={() => setShow(true)}>+添加菜单</p>
                </header>
                <main>
                    <nav>
                        <p>菜单名称</p>
                        <p>菜单路径</p>
                        <p>权限类型</p>
                        <p>创建时间</p>
                        <p>操作</p>
                    </nav>
                    <ul>
                            {list.map((item, index) => 
                                    <li key={index}>
                                        <div className={`${style.tops} ${nowPop.includes(index) ? style.editing : ''}`}>
                                            <div>
                                                <button onClick={() => clickList(index)}>{changeIndex[index] ? '-' : '+'}</button>
                                                <span>{item.name}
                                                {showInput && nowPop.includes(index) && (<input type="text" value={inputValue1} onChange={handChange1} /> )}
                                                </span>
                                                 
                                            </div>
                                            <div>{item.path}
                                            {showInput && nowPop.includes(index) && (<input type="text" value={inputValue2} onChange={handChange2}/>)}
                                            </div>
                                            <div>页面
                                            {showInput && nowPop.includes(index) && (<input type="text" value={inputValue3} onChange={handChange3}/>)}
                                            </div>
                                            <div>{item.createTime}</div>
                                            <div>
                                                <span onClick={() => handEdit(index)}>编辑</span>
                                                <span>删除</span>
                                            </div>
                                        </div>
                                        {changeIndex[index] && (<>
                                        {list[curIndex]?.children.map((item,index) =>
                                        <div key={index} className={style.lis}>
                                            <p>{item.name}</p>
                                            <p>{item.path}</p>
                                            <p>页面</p>
                                            <p>{item.createTime}</p>
                                            <p>
                                                <span>编辑</span>
                                                <span>删除</span>
                                            </p>
                                        </div>
                                        )}
                                        </>)}
                                    </li>

                            )}
                    </ul>
                </main>
            </div>
            {show && (<div className={style.box1}>
                <div className={style.addMenu}>
                    <div className={style.top}>
                        <span onClick={() => setShow(false)}>X</span> 添加菜单
                    </div>
                    <div className={style.body}>
                        <div className={style.menuLevel}>
                            <div><b>*</b> 选择菜单等级</div>
                            <span className={active1 ? 'active1' : ''} onClick={handClick} >
                            <svg t="1715140681662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1327" width="32" height="32"><path d="M512 622.336l311.168-311.168a42.666667 42.666667 0 0 1 60.330667 60.330667l-341.333334 341.333333a42.666667 42.666667 0 0 1-60.330666 0l-341.333334-341.333333a42.666667 42.666667 0 0 1 60.330667-60.330667L512 622.336z" fill="#bfbfbf" p-id="1328"></path></svg>
                                {showList && (
                                    <ul>
                                    <li>创建新的一级菜单</li>
                                    <li>试题管理</li>
                                    <li>试卷管理</li>
                                    <li>考试管理</li>
                                    <li>系统管理</li>
                                    <li>班级管理</li>
                                </ul>
                                )}
                            </span>
                        </div>
                        <div className={style.menuMiddle}>
                            <div className={style.menuName}>
                                <div><b>*</b> 菜单名字 <span>?</span></div>
                                <input type="text" placeholder='请输入名称'/>
                            </div>
                            <div className={style.hover}>
                                <div><b>*</b> 状态</div>
                                <select name="" id="">
                                    <option value="">禁用</option>
                                    <option value="">可用</option>
                                </select>
                            </div>
                            <div className={style.permissionMenuType}>
                                <div><b>*</b> 权限类型</div>
                                <select name="" id="">
                                    <option value="">页面</option>
                                    <option value="">按钮</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.naviga}>
                            <div><b>*</b> 路径<p>?</p></div>
                            <input type="text" placeholder='请输入正确的路径' />
                        </div>
                    </div>
                    <div className={style.foot}>
                        <p onClick={() => setShow(false)}>取消</p>
                        <p>确定</p>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default PermissionMenu