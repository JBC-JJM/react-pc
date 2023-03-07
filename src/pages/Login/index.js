import { Card, Button, Checkbox, Form, Input } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} initialValues={{ remember: true, }}>
          <Form.Item name="username"
            // 表单规则
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
          <Form.Item name="password"
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
