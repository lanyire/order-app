import React,{ Component } from 'react';
import { Menu,Dropdown,Icon} from'antd';
import { Link } from 'dva/router'
import style from './index.scss';

const menus = [
    {
        key:"home",
        path:"/home",
        name:"主页"
    },
    {
        key:"menus",
        path:"/menus",
        name:"菜单"
    },
    {
        key:"admin",
        path:"/admin",
        name:"管理"
    },
    {
        key:"about",
        path:"/about",
        name:"关于我们"
    },
    {
        key:"login",
        path:"/login",
        name:"登录",
        className:style.login,
        isAuthority:true
    }, 
    {
        key:"register",
        path:"/register",
        name:"注册",
        className:style.register,
        isAuthority:true
    }
]

export default class index extends Component {
    constructor(props){
        super(props);
        this.state= {
            selectKeys:[]
        }
    }

    //当页面刷新时祖籍安徽重新加载汇之星componentDidMount（cdm)钩子函数
    //为解决刷新页面菜单与路由不同步问题，解决方法则放在cdm钩子函数里执行
    componentDidMount(){
        this.handerSetSelctedKeys(this.props.location.pathname);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const { pathname } = this.props.location;
        if(nextProps.location.pathname !== pathname){
            //当路由发生变化时改变当前菜单选中key值
          this.handerSetSelctedKeys(nextProps.location.pathname);
        }
    }

    handleSetSelectKeys(pathname){
        // 根据'/'把路由地址分割成一个数组
        const temp = pathname.spilt('/');
        //如果说数组的长度小于2表示只有根路径/，设置为Home，否则取数组中的第二个值
        const key = temp && temp.length < 2 ? "home" : temp[1];
        this.setState({
            selectedKeys:[key]
        })
    }
     
    handleClickMenu = ({ key }) => {
        //退出
        if(key==='logout'){
            window.localStorage.clear();
            this.props.history.push('/login');
        }
    }
    menu = (
        <Menu onClick={this,handleClickMenu}>
            <Menu.Item key="logout">
                <span>退出</span>
            </Menu.Item>
        </Menu>
    );

    render(){
      return (
        
            <nav className={style.header}>
                <a className={style.logo} href="http://baidu.com"></a>
                <Menu className={style["menu-left"]} 
                      mode="horizontal" 
                      defaultSelectedKers={["home"]}
                      selectKeys={this.state.selectKeys}>
                    {menus.filter(({isAuthority}) => !(isAuthority && localStorage.key && localStorage.email))
                    .map(({key,path,name,className}) =>
                        <Menu.Item key={key} className={className}>
                            <Link to={path}>{name}</Link>
                        </Menu.Item>
                      )
                    }
                </Menu>
                {/* 用户email和退出 */}
                { localStorage.email && localStorage.key && (
                    <Dropdown overlay={this.menu} className={style["dropdowm-menu"]}>
                        <a className='ant-dropdown-link'>
                            <span className={style.email}>{localStorage.email}</span>
                            <Icon className={style.icon} type="down" />
                        </a>
                    </Dropdown>
                )}
            </nav>
        );
    }
}
