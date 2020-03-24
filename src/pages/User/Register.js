import React, { Component } from 'react';
import { Form,Input,Button} from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request.js'
import Logo from 'Assets/icon.jpg';
import style from './account.scss';

class index extends Component {
    state = {
        email:'27732357@qq.com'
    }
    
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
               //发起网络请求
               Request('/users.json',
                 {method:"post",
                 data:{ email,pwd }
                 }).then( res => {
                    if(res.status === 200 && res.data){
                      this.props.history.push('/login');
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

                       <Form.Item label="确认密码">
                       {getFieldDecorator('aPwd',{
                             rulels:[
                                 {
                                     requires:true,
                                     message:'密码不能为空，请输入密码'
                                 },
                                 {
                                     pattern:pwd_reg,
                                     validator:this.validatorForm,
                                     message:'请输入正确的密码格式，6-16位字母数字或特殊符号_-.'
                                 },
                                 {
                                     validator:this.validatorPwd,
                                     message:'两次输入密码不一致'
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
                         <Button onClick={this.handleSubmit} className="btn" type="primary">注册</Button>
                       </Form.Item> 
               </Form>
            </div>
        )
    }
}

export default Form.create()(index);
