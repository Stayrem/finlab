import React from 'react';
import {
  Form, Input, Tag, Button, Select,
} from 'antd';

const { Option } = Select;

const categoriesList = ['Продукты', 'Личный транспорт', 'Общественный транпорт', 'Такси', 'Кафе, Рестораны', 'Одежда'];
const TransactionForm = () => {
  const onFinish = (values: any) => values;

  const options = [{ value: 'red' }, { value: 'green' }, { value: 'yellow' }, { value: 'cyan' }];

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
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <Form.Item
          label="Название"
          name="title"
          required
          style={{ width: '50%' }}
        >
          <Input placeholder="Введите название траты" />
        </Form.Item>
        <Form.Item
          style={{ flexGrow: 1 }}
          label="Сумма"
          name="sum"
          required
        >
          <Input placeholder="300" />
        </Form.Item>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Form.Item
          label="Категория"
          name="categories"
          required
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
          required
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
        <Button type="primary" htmlType="submit">Отправить</Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
