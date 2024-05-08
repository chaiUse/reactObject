import style from './permissonMenu.module.scss'

const permissionMenu = () => {

    return(
        
        <div className={style.box}>
            <div className={style.menu}>
                <header>
                    <span>菜单列表</span>
                    <p>+添加菜单</p>
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
                        <li>
                            <div>
                                <button>+</button>
                                试题管理    
                            </div>
                            <div>/question</div>
                            <div>页面</div>
                            <div>2023-04-26</div>
                            <div>
                                <span>编辑</span>
                                <span>删除</span>
                            </div>
                        </li>
                    </ul>
                </main>
            </div>
            
            <div className={style.box1}>
                <div className={style.addMenu}>
                    <div className={style.top}>
                        <span>X</span> 添加菜单
                    </div>
                    <div className={style.body}>
                        <div className={style.menuLevel}>
                            <div><b>*</b> 选择菜单等级</div>
                            <select name="" id="">
                                <option value="">创建新的一级菜单</option>
                                <option value="">试题管理</option>
                                <option value="">试卷管理</option>
                                <option value="">考试管理</option>
                                <option value="">系统管理</option>
                                <option value="">班级管理</option>
                            </select>
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
                        <p>取消</p>
                        <p>确定</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default permissionMenu