import React, { useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IUserRequest, setRegistrationStateToDefault } from '../../userSlice';
import { RootState } from '../../../../store/store';
import { LoadingStatus } from '../../../../app/enums';
import commonCss from '../../../../common/css/style.scss';

interface ISignUp {
  onFinish: Function,
  onRegistrationComplete: Function,
}

const getUserRegistrationStatus = (state: RootState) => state.default.user.registrationStatus;

const SignUp = (props: ISignUp) => {
  const dispatch = useDispatch();
  const registrationStatus = useSelector(getUserRegistrationStatus);
  const passwordRef = useRef('');
  const { onFinish, onRegistrationComplete } = props;
  useEffect(() => {
    if (registrationStatus === LoadingStatus.FULFILLED) {
      onRegistrationComplete();
      setRegistrationStateToDefault();
    }
  }, [registrationStatus]);
  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={(values: IUserRequest) => dispatch(onFinish(values))}
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
          <Input.Password ref={passwordRef} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(('password')) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают '));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={registrationStatus === LoadingStatus.PENDING}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      {registrationStatus === LoadingStatus.FAILED && (
        <p className={commonCss.errorText}>Ошибка регистрации</p>
      )}
    </>
  );
};

export default SignUp;
