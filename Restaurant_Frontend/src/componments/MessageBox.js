import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, removeMessage } from "../store/slice.js";
import PropTypes from "prop-types";

const MessageBox = () => {
  const messages = useSelector((state) => state.MessageBoxState.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    if (messages.length == 0) return;

    const needRemove = messages.every((data) => {
      return data.remove;
    });

    if (needRemove) {
      dispatch(clearMessage());
    }
  }, [messages]);
  return (
    <>
      <ToastContainer position="bottom-end">
        {messages.map((data, index) => (
          <Message key={index} index={index} data={data} />
        ))}
      </ToastContainer>
    </>
  );
};

const Message = ({ index, data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(() => true);
  }, []);
  return (
    <Toast
      show={show}
      onClose={() => {
        setShow(() => false);
        dispatch(removeMessage(index));
      }}
      delay={data.duration}
      autohide
    >
      <Toast.Header closeButton={false}>
        <strong className="me-auto">{data.title}</strong>
      </Toast.Header>
      <Toast.Body>{data.message}</Toast.Body>
    </Toast>
  );
};

Message.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default MessageBox;
