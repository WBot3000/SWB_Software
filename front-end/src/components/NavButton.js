import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

function NavButton(props) {

    const navigate = useNavigate();

    return <Button className={props.className} onClick={() => (props.to ? navigate(props.to) : null)}>
        {props.children}
    </Button>
}

export default NavButton;