import React, { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from "react-router-dom";
import axios from 'axios';

import { 
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, Button, Input,
  // Alert,
  Container, Row, Col,
} from "reactstrap";

import {
  AXIOS_CONFIG
} from '../../constants';

import { registerAction } from "../../actions/auth";

const RegisterPage = ({
  history,
  registerAction,
}) => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("user");
  //const [isRegistered, setRegistration] = useState(false);
  //const [err, setErr] = useState();

  const handleClickRegister = async (e) => {
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role
    };

    try {
      const res = await axios.post('/auth/signup', newUserData, AXIOS_CONFIG);
      registerAction(res.data.token)
      history.push('/products')
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <Modal isOpen={true} className="auth-modal" size="lg">
        <ModalHeader className="text-center">
          Register
        </ModalHeader>

        <ModalBody className="mx-4">
          <Container>
            <Form>
              <Row>
                <Col>
                  <Input
                    type="text" 
                    name="firstName" 
                    value={firstName} 
                    placeholder="First name"
                    onChange={e => setFirstName(e.target.value)} 
                  />
                </Col>
                <Col>
                  <Input
                    type="text" 
                    name="password" 
                    value={lastName} 
                    placeholder="Last name"
                    onChange={e => setLastName(e.target.value)} 
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Input
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)} 
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Input
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} 
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Input 
                    type="select" 
                    name="role" 
                    onChange={event => setRole(event.target.value)} defaultValue={role}
                  >
                    <option>user</option>
                    <option>admin</option>                  
                  </Input>
                </Col>
              </Row>
            </Form>
          </Container>                    
        </ModalBody>

        <ModalFooter>
          <Button color="primary" size="lg" onClick={handleClickRegister} >Submit</Button>          
        </ModalFooter>
      </Modal>
    </div>
  )
}

RegisterPage.propTypes = {
  registerAction: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    registerAction,
  }
)(RegisterPage)
