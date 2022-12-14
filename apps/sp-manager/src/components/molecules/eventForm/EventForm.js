import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  RangePicker,
  Form,
  Input,
  Label,
  Title,
  Row,
  Col,
  Select,
  Textarea,
  InputGroup,
} from '../../../../../../libs/ui-shared/src/lib/components/';
// import moment from 'moment';
import styles from './eventForm.module.scss';
import axios from 'axios';

const EventForm = ({ initialValues,
  onSubmitHandler,
  isEdit,
  setIsEdit, }) => {
  const [form] = Form.useForm();
  const [cohorts, setCohorts] = useState([]);

  const getActiveCohorts = async () => {
    try {
      const response = await axios.get(
        `https://studentplus-backend.herokuapp.com/capi/cohorts/active`
      );
      return response.data;
    } catch (err) {
      try {
        const response = await axios.get(
          `http://localhost:3000/capi/cohorts/active`
        );
        return response.data;
      } catch (err) {
      console.log('Erro', err.message);
    }
  }
  };

  useEffect(() => {
    getActiveCohorts().then((resp) => {
      console.log('cchorts', resp);
      setCohorts(resp);
    });
  }, []);

  const onFinish = (values) => {
    const startTime = values.startEndTime[0].format('YYYY-MM-DD HH:mm:ss');
    const endTime = values.startEndTime[1].format('YYYY-MM-DD HH:mm:ss');
    values.startTime = startTime;
    values.endTime = endTime;
    onSubmitHandler(values);
    form.resetFields();
  };
  
  useEffect(() => {
    const cohortArray = initialValues.cohorts;
    initialValues.cohorts ? console.log([...cohortArray]) : '';
    if (initialValues.cohorts) {
      form.setFieldsValue({
        _id: initialValues._id,
        eventTitle: initialValues.eventTitle,
        cohorts: initialValues.cohorts,
        eventLink: initialValues.eventLink,
        startTime: initialValues.startTime,
        endTime: initialValues.endTime,
      });
  }}, [initialValues, isEdit]);


  return (
    <div className={styles.eventContainer}>
      <Card className={styles.eventForm}>
        <div className={styles.cardContainer}>
          <div className={styles.title}>
            <Title level={5}>Events Editor</Title>
            <Label strong={false}>{isEdit ? 'Edit Event' : 'Add Event'}</Label>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profilefields}>
              <Form
                form={form}
                name="createuser"
                onFinish={onFinish}
                scrollToFirstError
                labelWrap
                layout="vertical"
              >
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="eventTitle"
                        label="Event Title"
                        rules={[
                          {
                            required: true,
                            message: 'Please input event title!',
                            whitespace: false,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="cohorts"
                        label="Cohorts"
                        rules={[
                          {
                            required: true,
                            message: 'Please select cohort/s!',
                          },
                        ]}
                      >
                        <Select mode="tags">
                          {cohorts !== undefined
                            ? cohorts.map((res) => {
                                return (
                                  <Option key={res._id} value={res.cohortId}>
                                    {res.cohortId}
                                  </Option>
                                );
                              })
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="eventLink"
                        label="Event Link"
                        rules={[
                          {
                            required: true,
                            message: 'Please input event link!',
                            whitespace: false,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="password"
                        label="Event Password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input event password!',
                            whitespace: false,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </InputGroup>
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="startEndTime"
                        label="Start/End Time"
                        rules={[
                          {
                            type: 'array',
                            required: true,
                            message: 'Please input start date and time!',
                          },
                        ]}
                      >
                        <RangePicker showTime />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="docSource" label="Document Source">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </InputGroup>
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={24}>
                      <Form.Item name="eventDesc" label="Event Description">
                        <Textarea />
                      </Form.Item>
                    </Col>
                  </Row>
                </InputGroup>
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={12}></Col>
                    <Col span={12}>
                      <Button
                        htmltype="submit"
                        className={styles.save}
                        style={{
                          width: '100%',
						  marginTop: '20px',
                        }}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventForm;
