import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PDOSpinner from '../SharedComponents/Spinner/PDOSpinner'
import HeaderComponent from '../SharedComponents/Header'
import Sidebar from '../SharedComponents/Sidebar'
import ChartJsChartMonitor from '../SharedComponents/ChartJsSizeMonitor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import "antd/dist/antd.css";
import { Popconfirm, Form, Input, Modal, Button } from 'antd';

import {
  saveBotAction,
  deleteBotAction,
  getBotAction,
} from '../../actions/bot'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const BotPage = ({
  saveBotAction,
  deleteBotAction,
  getBotAction,
}) => {

  useEffect(() => {
    getBotAction()
  }, [getBotAction])

  const [botForm] = Form.useForm();
  const [curId, setCurId] = useState()
  const [modalTitle, setModalTitle] = useState()
  const [modalButton, setModalButton] = useState()

  /****************** Modal Section ******************/
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAddModal = () => {
    setIsModalVisible(true);
    setModalTitle("Add Bot")
    setModalButton("Add")
    setCurId(null)
    botForm.setFieldsValue({
      name: '',
      access_token: '',
      bot_id: ''
    });
  };

  const showEditModal = (item) => {
    setIsModalVisible(true);
    setModalTitle("Edit Bot")
    setModalButton("Save")
    setCurId(item.id)
    botForm.setFieldsValue({
      name: item.name,
      access_token: item.access_token,
      bot_id: item.bot_id
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /****************** Modal Section ******************/

  /****************** Modal Form Section ******************/
  const onFinish = (values) => {
    values.id = curId;
    saveBotAction(values)
    setIsModalVisible(false);
  };
  /****************** Modal Form Section ******************/

  const { loading, bot } =
    useSelector(state => ({
      loading: state.botReducer.loading,
      bot: state.botReducer.bot,
    }))

  const handleClickDelete = (e, id) => {
    deleteBotAction(id)
  }

  return (
    <React.Fragment>
      {loading && <PDOSpinner />}
      <HeaderComponent />
      <Container fluid={true}>
        <Row>
          <Sidebar curPage='bot' />
          <div className='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <ChartJsChartMonitor />
            <Modal
              title={modalTitle}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                {...layout}
                form={botForm}
                name="nest-messages"
                onFinish={onFinish}
              >
                <Form.Item
                  name={['name']}
                  label="Name"
                  rules={[{
                    required: true,
                    message: 'Name is required!'
                  }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['access_token']}
                  label="Access Token"
                  rules={[{
                    required: true,
                    message: 'Access Token is required!'
                  }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['bot_id']}
                  label="Bot Id"
                  rules={[{
                    required: true,
                    message: "The bot id is required!",
                  }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button type="primary" htmlType="submit">
                    {modalButton}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
              <h1 className='h2'>Bots</h1>

              <div className='btn-toolbar mb-2 mb-md-0'>
                <button
                  onClick={showAddModal}
                  type='button'
                  className='btn btn-sm mr-1 btn-primary'>
                  Add Bot
                </button>
              </div>
            </div>
            <div className='table-responsive mb15'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Access Token</th>
                    <th>Bot Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bot.map((item, nIndex) => {
                    return (
                      <tr key={nIndex}>
                        <td> {nIndex + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.access_token} </td>
                        <td> {item.bot_id} </td>
                        <td>
                          <button onClick={e => showEditModal(item)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          &nbsp;
                          <Popconfirm
                            placement="topRight"
                            title="Are you sure to delete this bot?"
                            onConfirm={e => handleClickDelete(e, item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </Popconfirm>

                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Row>
      </Container>
    </React.Fragment >
  )
}

export default withRouter(
  connect(null, {
    saveBotAction,
    deleteBotAction,
    getBotAction,
  })(BotPage)
)
