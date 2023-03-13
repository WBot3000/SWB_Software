import { Form, Row, Col, Button } from "react-bootstrap";

function InlineTextField(props) {
    return <Form.Group>
        <Row>
            <Form.Label column="xs" xs={1}>{props.label}</Form.Label>
            <Col xs="auto">
                <Form.Control 
                    type={props.type ?? "text"}
                    onChange={props.setStateFunc ? (e) => {props.setStateFunc(e.target.value)} : () => {}}
                    disabled={props.disabled}
                />
            </Col>
            <Col>
                <Button disabled={props.disabled || !props.value} onClick={() => {props.submitFunc()}}>{props.buttonLabel ?? "Submit"}</Button>
            </Col>
        </Row>
    </Form.Group>
}
export default InlineTextField;