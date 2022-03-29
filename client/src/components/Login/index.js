import React, { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Input,
} from "reactstrap";

import axios from 'axios';

import {
  loginAction
} from '../../actions/auth';

import {
  AXIOS_CONFIG
} from '../../constants';

const LoginPage = ({
  loginAction,
}) => {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setLogin] = useState(false);

  const [err, setErr] = useState({ status: false, msg: "" })

  const handleChange = e => {
    if (e.target.name === 'username')
      setUserName(e.target.value)
    else if (e.target.name === 'password')
      setPassword(e.target.value)
  }

  const handleClickLogin = async (e) => {
    if (username.length === 0 || password.length === 0) {
      setErr({
        status: true,
        msg: "Missing credentials/",
      })
      return;
    } else {
      try {
        const res = await axios.post('/auth/login', { email: username, password }, AXIOS_CONFIG);
        setErr({
          status: false,
          msg: "",
        })
        loginAction(res.data.token);
        setLogin(true);
      } catch (err) {
        setErr({
          status: true,
          msg: (err.response && err.response.data && err.response.data.message) ? err.response.data.message : "Server Response Error",
        })
      }
    }
  }

  return (
    <div>
      {
        isLoggedIn && <Redirect to={`/settings`} />
      }
      <Modal isOpen={true} className="auth-modal">
        <ModalHeader className="text-center">
          <span className="text-white">Sign in</span>
        </ModalHeader>

        <ModalBody className="mx-4">
          {err.status && (
            <Alert color="danger" className="my-3">{err.msg}</Alert>
          )}
          <Input className="mb-2" type="text" placeholder="Email" name="username" value={username} onChange={handleChange} />
          <Input className="mb-2" type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
        </ModalBody>

        <ModalFooter>
          <Button color="primary" size="lg" onClick={handleClickLogin} >Login</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
}

export default connect(
  null,
  {
    loginAction,
  }
)(LoginPage);