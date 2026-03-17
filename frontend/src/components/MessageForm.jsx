import React, { useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import socket, { filter } from '../socket';

const MessageForm = ({ currentChannelId, username }) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }, { resetForm }) => {
      const cleanBody = filter.clean(body);
      socket.emit('newMessage', { body: cleanBody, channelId: currentChannelId, username }, (response) => {
        if (response.status === 'ok') {
          resetForm();
          inputRef.current.focus();
        }
      });
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control name="body" aria-label="Nuevo mensaje" placeholder={t('chat.placeholder')} className="border-0 p-0 ps-2" onChange={formik.handleChange} value={formik.values.body} ref={inputRef} />
          <Button type="submit" variant="group-vertical" disabled={!formik.values.body}>
            {t('chat.send')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default MessageForm;