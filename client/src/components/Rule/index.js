import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PDOSpinner from '../SharedComponents/Spinner/PDOSpinner'
import HeaderComponent from '../SharedComponents/Header'
import Sidebar from '../SharedComponents/Sidebar'
import "antd/dist/antd.css";
import { Tabs } from 'antd';
import JsonFetch from './jsonFetch.js';
import WebSocketPage from './webSocket.js';
import WebhookReceive from './webhookReceive.js';

const { TabPane } = Tabs;

const RulePage = () => {

  const { loading } =
    useSelector(state => ({
      loading: state.ruleReducer.loading,
    }))

  return (
    <React.Fragment>
      {loading && <PDOSpinner />}
      <HeaderComponent />
      <Container fluid={true}>
        <Row>
          <Sidebar curPage='rule' />
          <div className='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
              <h1 className='h2'>Rules</h1>
            </div>
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="WebHook Receive" key="1">
                <WebhookReceive />
              </TabPane>
              <TabPane tab="JSON Fetch" key="2">
                <JsonFetch />
              </TabPane>
              <TabPane tab="WebSocket" key="3">
                <WebSocketPage />
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </Container >
    </React.Fragment >
  )
}

export default withRouter(
  connect(null, {
  })(RulePage)
)
