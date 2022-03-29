import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import "antd/dist/antd.css";
import { Row as AntRow, Col, Form, Input, Space, Button, Radio } from 'antd';
import ReactJson from 'react-json-view'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';

import {
    saveRuleAction,
} from '../../actions/rule'

const WebSocketPage = ({
    saveRuleAction,
}) => {

    const [duration, setDuration] = useState("s")
    const [data, setData] = useState()
    const [ruleForm] = Form.useForm()
    const [outputMessage, setOutputMessage] = useState("")

    const onFinish = (values) => {
        values.id = 0
        values.outputMessage = outputMessage
        values.type = 'websocket'
        saveRuleAction(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value)
    };

    const retrieve = () => {
        const address = ruleForm.getFieldValue('webhookAddress')

        let ws
        try {
            ws = new WebSocket(address)
        } catch (err) {
            console.log(err)
            toast.error(`The URL '${address}' is invalid.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            return
        }
        // Listen for messages
        ws.addEventListener('message', function (event) {
            setData(JSON.parse(event.data))
        });
    };

    return (
        <Form
            form={ruleForm}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ sendAs: 1 }}
        >
            <Form.Item
                label="Rule Name"
                name="name"
                rules={[{ required: true, message: 'Please input the rule name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="WehSocket Address">
                <Space>
                    <Form.Item
                        name="webhookAddress"
                        noStyle
                        rules={[{ required: true, message: 'WehSocket Address is required' }]}
                    >
                        <Input style={{ width: 500 }} />
                    </Form.Item>
                    <Button onClick={retrieve} type='primary'>Retrieve</Button>
                </Space>
            </Form.Item>

            <AntRow>
                <Col span={4}>
                </Col>
                <Col span={20}>
                    <ReactJson
                        src={data}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        enableClipboard={false}
                        theme='apathy:inverted'
                    />
                </Col>
            </AntRow><br />

            <Form.Item
                label="Target Room"
                name="targetRoom"
                rules={[{ required: true, message: 'Please input the target room!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Send As"
                name="sendAs"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Output Message"
                name="outputMessage"
            >
                <CKEditor
                    editor={ClassicEditor}
                    onReady={editor => {
                        // console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setOutputMessage(data)
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
            </Form.Item>

            <Form.Item label="Limit">
                <Input.Group compact>
                    <Form.Item name={"every"} >
                        <Input placeholder="Every" />
                    </Form.Item>
                    <Form.Item name={"duration"} >
                        <Radio.Group value={duration} onChange={handleDurationChange}>
                            <Radio.Button value="s">S</Radio.Button>
                            <Radio.Button value="m">M</Radio.Button>
                            <Radio.Button value="h">H</Radio.Button>
                            <Radio.Button value="d">D</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item wrapperCol={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default withRouter(
    connect(null, {
        saveRuleAction
    })(WebSocketPage)
)
