import React, { Component } from 'react'
import { Card, Button, Table, Modal ,Form , Input} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
export default class Catetory extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        })
    }
    onFinish = values => {
        console.log('Success:', values)
    }
    render() {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: 'age',
                key: 'age',
                width: '25%',
                align: 'center',
                render: () => { return <Button type='link'>修改分类</Button> }
            },

        ];
        return (
            <div>
                <Card extra={
                    <Button type='primary' onClick={this.showModal}>
                        <PlusCircleOutlined />
                         添加
                     </Button>}
                >
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered

                    />
                    <Modal
                        title="新增分类"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText='确认'
                        cancelText='取消'
                        >
                        <Form 
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name='categoryName'
                                rules={[{ required: true, message: '分类名必须输入' }]}
                            >
                                <Input placeholder='请输入分类名'/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            </div>
        )
    }
}
