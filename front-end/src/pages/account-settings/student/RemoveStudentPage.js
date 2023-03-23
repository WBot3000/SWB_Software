import { useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import PageContainer from "../../../components/PageContainer";
import DropdownField from "../../../components/DropdownField";
import { fetchStudentInfo } from "../../../utility/data";

function RemoveStudentPage() {

    //Students that belong to the account
    const [studentInfo, setStudentInfo] = useState([]);

    useEffect(() => {
        async function setStudentInfoAsync() {
            let info = await fetchStudentInfo();
            setStudentInfo(info);
        }
        setStudentInfoAsync();
    }, [])

    //The index of the student that is about to be deleted
    const [studentToDeleteIdx, setStudentToDeleteIdx] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function deleteStudent() {
        //Copy all students to a new array except for the one that needs to be deleted
        let newStudentData = [];
        for(let i = 0; i < studentInfo.length; i++) {
            if(i != studentToDeleteIdx) {
                newStudentData.push(studentInfo[i]);
            }
        }
        setStudentInfo(newStudentData);
        setStudentToDeleteIdx(null);
        setModalIsOpen(false);
    }

    console.log(studentInfo)

    return <PageContainer pageName="Remove Student Worker">
        <Row className="mb-5">
            <Col>
                <DropdownField
                    items={[...Array(studentInfo.length).keys()]}
                    itemType="Student"
                    displayItems={studentInfo.map(info => info.name)}
                    selectedItem={studentInfo[studentToDeleteIdx]?.name}
                    setStateFunc={setStudentToDeleteIdx}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <Button 
                    disabled={!studentToDeleteIdx} 
                    onClick={() => setModalIsOpen(true)}
                >
                    Delete Selected Student
                </Button>
            </Col>
        </Row>

        <Modal show={modalIsOpen} onHide={() => {setModalIsOpen(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-5">
                <Row>
                    <p>Are you sure you want to delete {studentInfo[studentToDeleteIdx ?? 0]?.name}?</p>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={deleteStudent}>Yes</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => {setModalIsOpen(false)}}>No</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </PageContainer>
}
export default RemoveStudentPage;