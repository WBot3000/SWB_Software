import { Modal } from "react-bootstrap";

function WeeklyScheduleModal(props) {
    return <Modal show={props.show} onHide={() => {props.closingFunc(false)}} size="xl" fullscreen="lg-down">
    <Modal.Header closeButton>
        <Modal.Title>{"Schedule for " + (props.week ?? "WEEK")}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="mb-5">
    </Modal.Body>
</Modal>
}
export default WeeklyScheduleModal;