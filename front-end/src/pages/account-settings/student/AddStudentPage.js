import { Button, Col, Form, Row } from "react-bootstrap";
import InlineTextField from "../../../components/InlineTextField";
import PageContainer from "../../../components/PageContainer";
import { useState } from "react";

function AddStudentPage() {

    const [idField, setIDField] = useState(null);
    const [nameField, setNameField] = useState(null);
    const [emailField, setEmailField] = useState(null);

    const [addedMsg, setAddedMsg] = useState(null);

    function addStudentToAccount(e) {
        e.preventDefault();
        console.log("ID: " + idField);
        console.log("Name: " + nameField);
        console.log("Email: " + emailField);
        setAddedMsg("Student successfully added");
    }

    return <PageContainer pageName="Add Student Worker">
        <Row>
            <Col>
                <Form>
                    <InlineTextField className="mb-3" label="Student ID" controlId="addstudent.id"
                        setStateFunc={setIDField}
                        value={idField}/>
                    <InlineTextField className="mb-3" label="Name" controlId="addstudent.name"
                        setStateFunc={setNameField}
                        value={nameField}/>
                    <InlineTextField className="mb-3" label="Email" controlId="addstudent.email"
                        setStateFunc={setEmailField}
                        value={emailField}/>
                    <Button onClick={(e) => addStudentToAccount(e)} className="mb-4 w-25 p-2" variant="primary" type="submit">
                        Add New Student
                    </Button>
                </Form>
            </Col>
            <Col className="mx-auto">
                <p className="text-center">{addedMsg}</p>
            </Col>
        </Row>
    </PageContainer>
}
export default AddStudentPage;