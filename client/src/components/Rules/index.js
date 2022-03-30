import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Container, Row } from 'reactstrap'
import PDOSpinner from '../SharedComponents/Spinner/PDOSpinner'
import HeaderComponent from '../SharedComponents/Header'
import Sidebar from '../SharedComponents/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "antd/dist/antd.css";
import { Popconfirm, Switch } from 'antd';
import moment from 'moment'
import {
  deleteRuleAction,
  getRuleAction,
  saveRuleAction,
} from '../../actions/rule'

const RulesPage = ({
  deleteRuleAction,
  getRuleAction,
  saveRuleAction,
}) => {

  useEffect(() => {
    getRuleAction()
  }, [getRuleAction])

  const { loading, rules } =
    useSelector(state => ({
      loading: state.ruleReducer.loading,
      rules: state.ruleReducer.rule,
    }))

  const handleClickDelete = (e, id) => {
    deleteRuleAction(id)
  }

  const onActiveChange = (checked, item) => {
    item.active = checked
    delete item.createdAt
    delete item.updatedAt
    saveRuleAction(item)
  }

  return (
    <React.Fragment>
      {loading && <PDOSpinner />}
      <HeaderComponent />
      <Container fluid={true}>
        <Row>
          <Sidebar curPage='rules' />
          <div className='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
              <h1 className='h2'>Rules</h1>
            </div>
            <div className='table-responsive mb15'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th>Added</th>
                    <th>Rule Name</th>
                    <th>Type</th>
                    <th>Entry Point</th>
                    <th>Every</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((item, nIndex) => {
                    return (
                      <tr key={nIndex}>
                        <td> {moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')} </td>
                        <td> {item.name} </td>
                        <td> {item.type} </td>
                        <td style={{ wordBreak: 'break-all', width: '50%' }}>{item.webhookAddress}</td>
                        <td> {item.every + item.duration} </td>
                        <td> <Switch defaultChecked={item.active} onChange={checked => onActiveChange(checked, item)} />{item.active} </td>
                        <td>
                          <Popconfirm
                            placement="topRight"
                            title="Are you sure to delete this rule?"
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
    deleteRuleAction,
    getRuleAction,
    saveRuleAction,
  })(RulesPage)
)
