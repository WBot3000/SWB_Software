import { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import PageContainer from "../../../components/PageContainer";
import { Table, Form, Input, Popconfirm, DatePicker, Button } from 'antd';
import { getStudentList } from '../../../utility/data.js'

const { RangePicker } = DatePicker
function RemoveStudentPage() {
    const [form] = Form.useForm();

    const [columns, setColumns] = useState([
        {
            title: 'Student Name',
            dataIndex: 'name',
        },
        {
            title: 'Schedule Num',
            dataIndex: 'scheduleNum',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
        },
        {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                return <Popconfirm
                    title="Delete the Worker"
                    description="Are you sure to delete this Worker?"
                    onConfirm={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Remove</Button>

                </Popconfirm>
            }
        },
    ])

    //const [options, setOptions] = useState()
    const [tablData, setTableDate] = useState(getStudentList())

    useEffect(() => {
    }, [])

    return <PageContainer pageName="Remove Student Worker">
        <div className="search">
            <Form
                form={form}
                layout="inline"
            >
                <Form.Item label="Student:" >
                    <Input placeholder="Input student name" />
                </Form.Item>
                <Form.Item label="Date:" >
                    <RangePicker />
                </Form.Item>
                <Form.Item label="">
                    <Button type="primary">Query</Button>
                </Form.Item>
            </Form>
        </div>
        <br />
        <br />
        <Table columns={columns} dataSource={tablData} pagination={false} />
    </PageContainer>
}
export default RemoveStudentPage;