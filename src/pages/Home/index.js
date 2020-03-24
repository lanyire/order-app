import React from 'react';
import { connect} from 'dva';
import style from './index.scss'

export default function index(props) {
    return (
        <div className={style.home}>
            <div className={style.background}>
                <h1>欢迎大家</h1>
                <h2>这里有各种大家需要的技术</h2>
                <p>{props.text}</p>
            </div>
        </div>
    );
}

//关联home.js(model)和当前组件的index.js(home组件)
export default connect(({home}) => ({...home})) (index);
