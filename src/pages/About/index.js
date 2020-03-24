import React, { Component } from 'react';
import { Tabs } from 'antd';
import style from './index.scss'
import SubRoutes,{ RedirectRoute } from '../../utils/SubRoutes'
import {Switch} from 'dva/router'

const { TabPane } = Tabs;

//点击tab切换路由
handleChangeTab = key => {
    // window.location.href = '/#' + key;
    if(this.props.location.pathname !== key)
    this.props.history.push(key);
}

export default class index extends Component {
    render() {
        const{routes,app} = this.props;
        return (
            <div className={style.about}>
              <Tabs className={style.tabs} activeKey={this.props.location.pathname} tabPisition={'left'}>
                  <TabPane tab="历史订单" key="/about/history"></TabPane>
                  <TabPane tab="联系我们" key="/about/contact"></TabPane>
                  <TabPane tab="点餐文档" key="/about/orderingguide"></TabPane>
                  <TabPane tab="快递信息" key="/about/delivery"></TabPane>
              </Tabs>
              <div className={style.routes}>
                {/* 二级路由*/}
                 <Switch>
                  {routes.map((route,i) => (
                     //调用封装组件
                     <SubRoutes key = {i} {...route} app={app} />
                   ))}
                
                   <RedirectRoute exact={true} from={"/about"} routes={routes} />
                 </Switch>
              </div>
            </div>
        )
    }
}
