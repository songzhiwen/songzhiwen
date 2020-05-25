import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, DatePicker, Input, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormBasicForm = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndFormBasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="formandformbasicform.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandformbasicform.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formandformbasicform.title.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'formandformbasicform.title.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandformbasicform.date.label" />}
            name="date"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formandformbasicform.date.required',
                }),
              },
            ]}
          >
            <RangePicker
              style={{
                width: '100%',
              }}
              placeholder={[
                formatMessage({
                  id: 'formandformbasicform.placeholder.start',
                }),
                formatMessage({
                  id: 'formandformbasicform.placeholder.end',
                }),
              ]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandformbasicform.goal.label" />}
            name="goal"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formandformbasicform.goal.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'formandformbasicform.goal.placeholder',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandformbasicform.standard.label" />}
            name="standard"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'formandformbasicform.standard.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'formandformbasicform.standard.placeholder',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="formandformbasicform.client.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="formandformbasicform.form.optional" />
                  <Tooltip title={<FormattedMessage id="formandformbasicform.label.tooltip" />}>
                    <InfoCircleOutlined
                      style={{
                        marginRight: 4,
                      }}
                    />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input
              placeholder={formatMessage({
                id: 'formandformbasicform.client.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="formandformbasicform.invites.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="formandformbasicform.form.optional" />
                </em>
              </span>
            }
            name="invites"
          >
            <Input
              placeholder={formatMessage({
                id: 'formandformbasicform.invites.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="formandformbasicform.weight.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="formandformbasicform.form.optional" />
                </em>
              </span>
            }
            name="weight"
          >
            <InputNumber
              placeholder={formatMessage({
                id: 'formandformbasicform.weight.placeholder',
              })}
              min={0}
              max={100}
            />
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandformbasicform.public.label" />}
            help={<FormattedMessage id="formandformbasicform.label.help" />}
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  <FormattedMessage id="formandformbasicform.radio.public" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="formandformbasicform.radio.partially-public" />
                </Radio>
                <Radio value="3">
                  <FormattedMessage id="formandformbasicform.radio.private" />
                </Radio>
              </Radio.Group>
              <FormItem
                style={{
                  marginBottom: 0,
                }}
                name="publicUsers"
              >
                <Select
                  mode="multiple"
                  placeholder={formatMessage({
                    id: 'formandformbasicform.publicUsers.placeholder',
                  })}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    <FormattedMessage id="formandformbasicform.option.A" />
                  </Option>
                  <Option value="2">
                    <FormattedMessage id="formandformbasicform.option.B" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="formandformbasicform.option.C" />
                  </Option>
                </Select>
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandformbasicform.form.submit" />
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
            >
              <FormattedMessage id="formandformbasicform.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndFormBasicForm/submitRegularForm'],
}))(FormBasicForm);
