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
  saveRoomAction,
  deleteRoomAction,
  getRoomAction,
} from '../../actions/room'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const RoomPage = ({
  saveRoomAction,
  deleteRoomAction,
  getRoomAction,
}) => {

  useEffect(() => {
    getRoomAction()
  }, [getRoomAction])

  const [roomForm] = Form.useForm();
  const [curId, setCurId] = useState()
  const [modalTitle, setModalTitle] = useState()
  const [modalButton, setModalButton] = useState()

  /****************** Modal Section ******************/
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAddModal = () => {
    setIsModalVisible(true);
    setModalTitle("Add Room")
    setModalButton("Add")
    setCurId(null)
    roomForm.setFieldsValue({
      name: '',
      room_id: ''
    });
  };

  const showEditModal = (item) => {
    setIsModalVisible(true);
    setModalTitle("Edit Room")
    setModalButton("Save")
    setCurId(item.id)
    roomForm.setFieldsValue({
      name: item.name,
      room_id: item.room_id
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
    saveRoomAction(values)
    setIsModalVisible(false);
  };
  /****************** Modal Form Section ******************/

  const { loading, room } =
    useSelector(state => ({
      loading: state.roomReducer.loading,
      room: state.roomReducer.room,
    }))

  const handleClickDelete = (e, id) => {
    deleteRoomAction(id)
  }

  return (
    <React.Fragment>
      {loading && <PDOSpinner />}
      <HeaderComponent />
      <Container fluid={true}>
        <Row>
          <Sidebar curPage='room' />
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
                form={roomForm}
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
                  name={['room_id']}
                  label="Room Id"
                  rules={[{
                    required: true,
                    message: "The room id is required!",
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
              <h1 className='h2'>Rooms</h1>

              <div className='btn-toolbar mb-2 mb-md-0'>
                <button
                  onClick={showAddModal}
                  type='button'
                  className='btn btn-sm mr-1 btn-primary'>
                  Add Room
                </button>
              </div>
            </div>
            <div className='table-responsive mb15'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Room Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {room.map((item, nIndex) => {
                    return (
                      <tr key={nIndex}>
                        <td> {nIndex + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.room_id} </td>
                        <td>
                          <button onClick={e => showEditModal(item)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          &nbsp;
                          <Popconfirm
                            placement="topRight"
                            title="Are you sure to delete this room?"
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
    saveRoomAction,
    deleteRoomAction,
    getRoomAction,
  })(RoomPage)
)
