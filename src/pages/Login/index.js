import { Card, Button, Checkbox, Form, Input, message } from 'antd'

import logo from '@/assets/logo.png'
import './index.scss'
import { postsetToken } from '@/store/LoginStore'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // console.log(values)
    try {
      //postsetToken为异步函数
      await dispatch(postsetToken(values))
      navigate('/', { replace: true })
      message.success({
        content: '登入成功',
      });
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form initialValues={{
          mobile: '13911111111',
          code: '246810',
          remember: true
        }}
          onFinish={onFinish}>
          <Form.Item name="mobile"
            // 输入框表单规则
            rules={[
              {//规则一
                required: true,//必要输入
                message: 'Please input your username!',
              },
              {//规则二
                pattern: /^1[3-9]\d{9}$/, //正则
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="code"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                len: 6,//长度规则
                message: "请输入6位密码",
                validateTrigger: 'onBlur'
              }
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
