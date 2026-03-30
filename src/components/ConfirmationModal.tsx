import { Button, Modal } from "react-bootstrap"
import type { ConfirmationModalProps } from "../types"

export const ConfirmationModal = ({ showModal, onHide, onConfirm }: ConfirmationModalProps) => {

    return (
        <Modal 
            show={showModal}
            onHide={onHide}
            size="sm"
            aria-labelledby="modal-title"
            centered
        >
            <Modal.Header closeButton >
                <Modal.Title
                    id="modal-title"
                >
                    Empty Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal-description">
                Are you sure you want to clear your cart?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="btn btn-brand"
                    onClick={onHide}
                    autoFocus
                >
                    Cancel
                </Button>
                <Button
                    className="btn-remove"
                    onClick={onConfirm}
                >
                    Clear Cart
                </Button>
            </Modal.Footer>
        </Modal>
    )
}