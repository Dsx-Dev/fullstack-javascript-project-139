import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthProvider';

const ChatPage = () => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Incluimos el token en la cabecera para autorizar la petición
        const response = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        setChannels(response.data.channels);
        setMessages(response.data.messages);
        // Marcamos el canal 'general' como el actual (suele ser el id: 1)
        setCurrentChannelId(response.data.currentChannelId);
      } catch (err) {
        console.error("Error al cargar datos", err);
      }
    };

    fetchData();
  }, [user.token]);

  // Filtrar mensajes del canal seleccionado
  const activeMessages = messages.filter((m) => m.channelId === currentChannelId);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column">
          <div className="p-4"><b>Canales</b></div>
          <ListGroup variant="flush">
            {channels.map((c) => (
              <ListGroup.Item 
                key={c.id} 
                action 
                active={c.id === currentChannelId}
                onClick={() => setCurrentChannelId(c.id)}
              >
                # {c.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col className="p-0 h-100 d-flex flex-column">
          <div className="bg-light mb-4 p-3 shadow-sm">
             <b># {channels.find(c => c.id === currentChannelId)?.name}</b>
             <div className="text-muted small">{activeMessages.length} mensajes</div>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
            {activeMessages.map((m) => (
              <div key={m.id} className="text-break mb-2">
                <b>{m.username}</b>: {m.body}
              </div>
            ))}
          </div>
          {/* Aquí irá el formulario para enviar mensajes en el siguiente paso */}
        </Col>
      </Row>
    </Container>
  );
};