import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import "antd/dist/antd.css";
import { Form, Input, Button, Space } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
    saveRuleAction,
} from '../../actions/rule'

const WebhookReceive = ({
    saveRuleAction,
}) => {

    const [ruleForm] = Form.useForm()
    const [outputMessage, setOutputMessage] = useState("")

    const onFinish = (values) => {
        values.id = 0
        values.type = 'webhook'
        values.outputMessage = outputMessage
        saveRuleAction(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const generateString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result.trim();
    }

    const generateAddress = () => {
        ruleForm.setFieldsValue({
            webhookAddress: "/" + generateString(50)
        })
    }

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

            <Form.Item label="Webhook Address">
                <Space>
                    <Form.Item
                        name="webhookAddress"
                        noStyle
                        rules={[{ required: true, message: 'Webhook Address is required' }]}
                    >
                        <Input readOnly style={{ width: 500 }} />
                    </Form.Item>
                    <Button type='primary' onClick={generateAddress}>Generate Address</Button>
                </Space>
            </Form.Item>

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
    })(WebhookReceive)
)
