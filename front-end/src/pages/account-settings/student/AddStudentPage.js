import { Button, Col, Form, Row } from "react-bootstrap";
import InlineTextField from "../../../components/InlineTextField";
import PageContainer from "../../../components/PageContainer";
import { useState } from "react";
import { validEmail, validStudentID } from "../../../utility/validation";

function AddStudentPage() {

    const [idField, setIDField] = useState("");
    const [nameField, setNameField] = useState("");
    const [emailField, setEmailField] = useState("");

    const [addedMsg, setAddedMsg] = useState("");

    function addStudentToAccount(e) {
        e.preventDefault();
        try {
            validStudentID(idField);
            if(nameField.trim().length == 0) {
                throw "Student's name cannot be empty!";
            }
            validEmail(emailField);
            //TODO: Check to see if the student ID exists within the account already
            setAddedMsg("Student successfully added")
        }
        catch(err) {
            setAddedMsg(err);
        }
        console.log("ID: " + idField);
        console.log("Name: " + nameField);
        console.log("Email: " + emailField);
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