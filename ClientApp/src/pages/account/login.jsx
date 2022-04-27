import { Button, Input, Typography, Form, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/user';

const AccountLogin = props => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.user.loginError);

    const onFinish = () => {
        dispatch(login(form.getFieldsValue()));
    }

    return (
        <div style={{ width: 500, margin: '20px auto' }}>
            <Typography.Title level={3}>Login</Typography.Title>
            {
                loginError && <div>{loginError.message}</div>
            }
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div >

    )
}

export default AccountLogin;