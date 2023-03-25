import { Form } from "react-bootstrap";

function TextFormField(props) {
    return <Form.Group className="mb-5 mx-5" controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control 
            type={props.type ?? "text"}
            onChange={props.setStateFunc ? (e) => {props.setStateFunc(e.target.value)} : () => {}}
        />
        {props.bullets ? (
            <Form.Text className="text-muted">
                <ul className="mt-2">
                    {props.bullets.map((bullet, idx) => <li key={bullet + idx}>{bullet}</li>)}
                </ul>
            </Form.Text>
        ) : null}
    </Form.Group>
}
export default TextFormField;