import React from 'react'
import { Spinner } from 'reactstrap'
import './styled.scss'

const PDOSpinner = (props) => {

  return (
    <div className="panel-spinner-container">
      <Spinner className="panel-spinner" animation="border" color="primary" />
    </div>
  )
}

export default PDOSpinner;