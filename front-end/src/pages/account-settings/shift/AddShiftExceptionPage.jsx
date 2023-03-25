import PageContainer from "../../../components/PageContainer";
import { Form, Popconfirm, Button, Select, DatePicker } from 'antd'
import { useEffect, useState } from 'react'

const AddShiftExceptionPage = () => {

    const [curShift, setCurShift] = useState('Shift 1')
    const [exceptions, setExceptions] = useState({})
    const [form] = Form.useForm();

    const setExceptionAction = () => {
        let obj = exceptions

        // isexist shift
        let isExist = obj[curShift]

        if (isExist) {
            obj[curShift].exceptList.push({})
        } else {
            obj[curShift] = {
                exceptList: [{}]
            }
        }
        setExceptions({ ...obj })
    }

    const removeDay = (field, index) => {
        let obj = exceptions

        obj[field].exceptList.splice(index, 1)

        setExceptions({ ...obj })
    }

    const renderMap = () => {
        const items = [];
        for (const key in exceptions) {
            items.push(
                <>
                    <div className="item" key={key} style={{ display: 'flex' }}>
                        <div className="shift-name">{key}: &nbsp;</div>
                        <div>
                            {exceptions[key].exceptList.map((item, index) => (
                                <div>
                                    <div key={index}>
                                        <DatePicker />
                                        &nbsp;
                                        <Button danger onClick={() => removeDay(key, index)}> Remove </Button>
                                    </div>
                                    <br />
                                </div>
                            ))}
                        </div>

                    </div>
                    <br />
                </>
            );
        }

        return items
    }

    useEffect(() => {
        renderMap()
    }, [exceptions])

    return (
        <PageContainer pageName="Add Shift Exception">
            <div className="search">
                <Form
                    form={form}
                >
                    <Form.Item label="Schedule Shift:" >
                        <Select
                            defaultValue='Shift 1'
                            style={{ width: 120 }}
                            options={[
                                { value: 'Shift 1', label: 'Shift 1' },
                                { value: 'Shift 2', label: 'Shift 2' },
                                { value: 'Shift 3', label: 'Shift 3' },
                                { value: 'Shift 4', label: 'Shift 4', },
                            ]}
                            onChange={(val) => {
                                setCurShift(val)
                            }}
                        />
                        &emsp;
                        <Button
                            type="primary"
                            onClick={setExceptionAction}>Add Exception</Button>
                        &emsp;
                        <Popconfirm
                            title="Save the Shift"
                            description="Are you sure to Save this Shift?"
                            onConfirm={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary">Save</Button>
                        </Popconfirm>

                    </Form.Item>
                    <Form.Item label="Exception Days: ">
                    </Form.Item>
                </Form>

                <div className="exception-wrap">
                    {
                        renderMap()
                    }
                </div>
            </div>
        </PageContainer>
    )
}
export default AddShiftExceptionPage;