import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageContainer from "../components/PageContainer";

function EmailPage() {

    const [currEmail, setCurrEmail] = useState("");

    function submitEmail(e) {
        e.preventDefault();
        console.log("Email Body: " + currEmail);
    }

    return <PageContainer pageName="WEEK Schedule Email">
        <Form className="mx-5">
                <Form.Group className="mb-4">
                    <Form.Label>Input Email</Form.Label>
                    <Form.Control as="textarea" rows={10} onChange={(e) => {setCurrEmail(e.target.value)}}/>
                </Form.Group>

                <Button onClick={(e) => {submitEmail(e)}} className="mb-4 w-25 p-2" variant="primary" type="submit">
                    Send Out Emails
                </Button>
        </Form>

    </PageContainer>
}
export default EmailPage;