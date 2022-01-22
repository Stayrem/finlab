import React from 'react';
import { Button, Form, Input } from 'antd';
import { IUserRequest } from '../../userSlice';

interface ISignUp {
  onFinish: (values: IUserRequest) => void,
}

const SignUp = (props: ISignUp) => {
  const { onFinish } = props;
  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={(values: IUserRequest) => onFinish(values)}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="Имя Пользователя"
        name="username"
        rules={[
          {
            required: true,
            message: 'Введите имя пользователя',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите свой пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Подтверждение пароля"
        name="password"
        rules={[
          {
            required: true,
            message: 'Повторите пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
