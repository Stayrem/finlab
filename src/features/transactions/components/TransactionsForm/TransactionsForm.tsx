import React, { useEffect } from 'react';
import {
  Form, Input, Tag, Button, Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, getTransactions, resetAddStatus } from '../../transactionsSlice';
import { RootState } from '../../../../store/store';
import { LoadingStatus } from '../../../../app/enums';

const { Option } = Select;

const categoriesList = ['Продукты', 'Личный транспорт', 'Общественный транпорт', 'Такси', 'Кафе, Рестораны', 'Одежда'];
const TransactionForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const addStatus = useSelector((state: RootState) => state.default.transactions.addStatus);
  const options = [{ value: 'red' }, { value: 'green' }, { value: 'yellow' }, { value: 'cyan' }];

  useEffect(() => {
    if (addStatus === LoadingStatus.FULFILLED) {
      dispatch(getTransactions(1));
      dispatch(resetAddStatus());
    }
  }, [addStatus]);
  const tagRender = (tagProps: { label: any; value: any; onClose: any; }) => {
    const {
      label, value, onClose,
    } = tagProps;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        dispatch(addTransaction({ ...values, timestamp: Date.now() }));
        form.resetFields();
      }}
      autoComplete="off"
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true }]}
          style={{ width: '50%' }}
        >
          <Input placeholder="Введите название траты" />
        </Form.Item>
        <Form.Item
          style={{ flexGrow: 1 }}
          label="Сумма"
          name="value"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="300"
            type="number"
          />
        </Form.Item>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true }]}
          style={{ width: '50%' }}
        >
          <Select
            showSearch
            placeholder="Выберите категорию"
            filterOption={(input, option) => option
              .children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {categoriesList.map((cat) => <Option key={cat} value={cat}>{cat}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ flexGrow: 1 }}
          label="Тэги"
          name="tags"
        >
          <Select
            mode="multiple"
            placeholder="Выберите тэги"
            showArrow
            tagRender={tagRender}
            style={{ width: '100%' }}
            options={options}
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">Добавить</Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
