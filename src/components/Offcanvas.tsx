import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

export default function MyOffcanvas({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas
        backdrop={false}
        show={show}
        onHide={handleClose}
        placement="bottom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>

      <div>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleShow}
          onDoubleClick={handleClose}
        >
          Options
        </button>
      </div>
    </>
  );
}
