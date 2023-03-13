import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

function DropdownField(props) {
    return <Dropdown as={ButtonGroup} onSelect={props.setStateFunc ? (eventKey) => {props.setStateFunc(eventKey)} : () => {}}>
        <Button variant="light">{props.selectedItem ?? ("Select a " + (props.itemType ?? "value"))}</Button>
        <Dropdown.Toggle disabled={props.disabled} split variant="dark"/>

        <Dropdown.Menu>
            {props.items?.map((item, idx) => {
                return <Dropdown.Item key={item} eventKey={item}>{props.displayItems?.[idx] ?? item}</Dropdown.Item>
            })}
        </Dropdown.Menu>
    </Dropdown>
}
export default DropdownField;