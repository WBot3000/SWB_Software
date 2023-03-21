import { Form, Row, Col, Button } from "react-bootstrap";

function InlineTextField(props) {
    return <Form.Group className={props.className}>
        <Row>
            <Form.Label column="xs" xs={1}>{props.label}</Form.Label>
            <Col xs="auto">
                <Form.Control 
                    type={props.type ?? "text"}
                    onChange={props.setStateFunc ? (e) => {props.setStateFunc(e.target.value)} : () => {}}
                    disabled={props.disabled}
                />
            </Col>
            {props.submittable ?
            <Col>
                <Button disabled={props.disabled || !props.value} onClick={() => {props.submitFunc()}}>{props.buttonLabel ?? "Submit"}</Button>
            </Col> : null}
        </Row>
    </Form.Group>
}
export default InlineTextField;