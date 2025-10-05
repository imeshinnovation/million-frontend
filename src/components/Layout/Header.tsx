import { Title, Group, Button, Container } from '@mantine/core';
import { IconArrowLeft, IconPlus } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../features/properties/hooks/useWindowSize';
import config from '../../config';

export const Header = () => {

  const { width } = useWindowSize();

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;


  return (
    <Container>
      <Group className='GroupMantine'>
        <Title order={1} c="blue" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>{config.app.name}</Title>
        <Button
          leftSection={currentPath === '/' ? <IconPlus style={width > 1024 ? { marginRight: 10 } : { marginRight: 0 }} /> : <IconArrowLeft style={width > 1024 ? { marginRight: 10 } : { marginRight: 0 }} />}
          radius="md"
          aria-label='action-button'
          px={0}
          w={width > 1024 ? 200 : 40}
          h={width > 1024 ? 40 : 40}
          onClick={() => navigate(currentPath === '/' ? '/addproperty' : '/')}
          justify='center'
          styles={{
            section: {
              marginRight: 0,
            }
          }}
        >{width > 1024 ? currentPath === '/' ? 'Agregar Propiedad' : 'Volver' : ''}</Button>
      </Group>
    </Container>

  );
};