import React, { Component } from 'react'
import { Form,Input,Button,Message} from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import { connect } from 'dva';
import Request from '../../utils/Request.js'
import Logo from 'Assets/icon.jpg';
import style from './account.scss';

@connect()
class index extends Component {
        //自定义表单校验规则
        validatorForm = (rule,value,callback) => {
            if(value && rule.pattern && !value.match(rule.pattern)){
                callback(rule.message);
            }else{
                callback();
            }
        };
    
        //自定义校验两次密码是否一致
        validatorPwd = (rule,value,callback) => {
            if(value !== this.props.form.getFieldValue('pws')){
                callback(rule.message);
            }else{
                callback();
            }
        };
    
        //点击submit
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err,value) =>{
               if(!err){
                   const { email,pwd } = values;
                   Request("users.json").then( res => {
                       const { data,status } = res;
                       if(res && status === 200 && data){
                           let users = [];
                           for(const key in data){
                               users.push({
                                   ...data[key],
                                   key
                               });
                           }
                           //账户密码匹配
                           users = users.filter(user => {
                               return user.pwd === pwd && user.email === email;
                           });
                           //判断users下是否有内容
                           if(users && users.length){
                               //存到localstorage
                               localStorage.setItem("email",users[0].email);
                               localStorage.setItem("key",users[0].key);
                               //存储到models里
                               this.props.dispatch({
                                   type:"global/setUserInfo",
                                   payload:users[0]
                               }).then(() => {
                                  //页面跳转
                                  this.props.history.push('/')
                                 });
                               }else{
                                   Message.error("邮箱或密码错误,请重新输入"); 
                           }
                       }
                   });
               }
           });
        };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.account}>
               <img src={Logo} alt="mylogo" className={style.logo} />
               <Form className="account-form">
               <Form.Item label="邮箱">{getFieldDecorator('email',{
                           rules:[
                               {
                                   required:true,
                                   message:"邮箱不能为空，请输入邮箱"
                               },
                               {
                                   pattern:email_reg,
                                   validator:this.validatorForm,
                                   message:"请输入正确的邮箱格式"
                               }
                           ]
                        //  initialValue:this.state.email
                       })(<Input />)}
                       </Form.Item> 

                       <Form.Item label="密码">
                         {getFieldDecorator('pwd',{
                             rulels:[
                                 {
                                     requires:true,
                                     message:'密码不能为空，请输入密码'
                                 },
                                 {
                                     pattern:pwd_reg,
                                     validator:this.validatorForm,
                                     message:'请输入正确的密码格式，6-16位字母数字或特殊符号_-.'
                                 }
                             ]
                         })(
                             <input  
                              maxLength={16}
                              type="password"
                              placeholder="请输入6-16位字母数字或特殊符号_-."
                             />
                         )}
                       </Form.Item> 

                       <Form.Item>
                         <Button onClick={this.handleSubmit} className="btn" type="primary">登录</Button>
                       </Form.Item> 
               </Form>
            </div>
        )
    }
}

export default Form.create()(index);
