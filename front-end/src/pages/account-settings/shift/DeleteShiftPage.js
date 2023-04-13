import PageContainer from "../../../components/PageContainer";
import { Table, Form, Input, Popconfirm, DatePicker, Button } from 'antd';

import { useState, useEffect } from "react";

import { getScheduleShiftList } from '../../../utility/data.js'

const { RangePicker } = DatePicker
function DeleteShiftPage() {
    const [form] = Form.useForm();

    const [columns, setColumns] = useState([
        {
            title: 'Shift Name',
            dataIndex: 'name',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
        },
        {
            title: 'Finish Time',
            dataIndex: 'finishTime',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                return <Popconfirm
                    title="Delete the Shift"
                    description="Are you sure to delete this Shift?"
                    onConfirm={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Remove</Button>
                </Popconfirm>
            }
        },
    ])
    const [options, setOptions] = useState()
    const [tablData, setTableDate] = useState(getScheduleShiftList())

    useEffect(() => {
    }, [])

    return <PageContainer pageName="Delete Shift">
        <div className="search">
            <Form
                form={form}
                layout="inline"
            >
                <Form.Item label="Shift Name:" >
                    <Input placeholder="Input shift name" />
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
export default DeleteShiftPage;