import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EmailModal(props) {

    const [currEmail, setCurrEmail] = useState("");

    function submitEmail(e) {
        e.preventDefault();
        console.log("Email Body: " + currEmail);
    }

    return <Modal show={props.show} onHide={() => {props.closingFunc(false)}} size="xl" fullscreen="lg-down">
        <Modal.Header closeButton>
            <Modal.Title>{(props.week ?? "WEEK") + " Schedule Email"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-5">
            <Form className="mx-5">
                    <Form.Group className="mb-4">
                        <Form.Label>Input Email</Form.Label>
                        <Form.Control as="textarea" rows={10} onChange={(e) => {setCurrEmail(e.target.value)}}/>
                    </Form.Group>

                    <Button onClick={(e) => {submitEmail(e)}} className="mb-4 w-25 p-2" variant="primary" type="submit">
                        Send Out Emails
                    </Button>
            </Form>
        </Modal.Body>
    </Modal>
}
export default EmailModal;