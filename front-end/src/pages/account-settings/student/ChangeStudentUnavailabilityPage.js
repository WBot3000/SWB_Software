import PageContainer from "../../../components/PageContainer";
import { Table, Form, Input, Popconfirm, DatePicker, Button } from 'antd';

import { useState, useEffect } from "react";
import { getStudentList } from '../../../utility/data.js'
import moment from 'moment'

const { RangePicker } = DatePicker
function ChangeStudentUnavailabilityPage() {
    const [form] = Form.useForm();

    const [columns, setColumns] = useState([
        {
            title: 'Student Name',
            dataIndex: 'name',
        },
        {
            title: 'Unavailability Start Time',
            dataIndex: 'startTime',
            render: (text, record, index) => {
                return <DatePicker showTime={{
                    format: 'HH:mm',
                }} onChange={() => { }} onOk={() => { }} />
            }
        },
        {
            title: 'Unavailability End Time',
            dataIndex: 'endTime',
            render: (text, record, index) => {
                return <DatePicker showTime={{
                    format: 'HH:mm',
                }} onChange={() => { }} onOk={() => { }} />
            }
        },
        {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                return <Popconfirm
                    title="Save"
                    description="Are you sure to set unavailability?"
                    onConfirm={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" ghost>Save</Button>
                </Popconfirm>
            }
        },
    ])
    const [options, setOptions] = useState()
    const [tablData, setTableDate] = useState(getStudentList())

    useEffect(() => {
    }, [])

    return <PageContainer pageName="Change Student Unavailability">
        <div className="search">
            <Form
                form={form}
                layout="inline"
            >
                <Form.Item label="Student:" >
                    <Input placeholder="input student name" />
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
export default ChangeStudentUnavailabilityPage;