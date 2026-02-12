import { Dropdown, ButtonGroup } from 'react-bootstrap';

// Dentro del mapeo de canales:
{channels.map((c) => (
  <Dropdown as={ButtonGroup} key={c.id} className="d-flex mb-2">
    <Button
      variant={c.id === currentChannelId ? 'secondary' : 'light'}
      className="w-100 text-start text-truncate border-0"
      onClick={() => dispatch(actions.setCurrentChannel(c.id))}
    >
      <span className="me-1">#</span>
      {c.name}
    </Button>

    {c.removable && (
      <>
        <Dropdown.Toggle 
          split 
          variant={c.id === currentChannelId ? 'secondary' : 'light'} 
          className="border-0"
        >
          <span className="visually-hidden">Gestión de canal</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'removing', extraData: { channelId: c.id } }))}>
            Eliminar
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'renaming', extraData: { channelId: c.id, name: c.name } }))}>
            Renombrar
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    )}
  </Dropdown>
))}