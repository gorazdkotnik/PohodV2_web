import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AllEvents from './AllEvents';
import NewEvent from './NewEvent';
import EventDetails from './EventDetails';

import EventsNavigation from '../../components/events/EventsNavigation';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Events() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/events') {
      navigate('/events/all');
    }
  }, [pathname, navigate]);

  return (
    <Container mode="page">
      <Card>
        <EventsNavigation />
        <Routes>
          <Route path="all" element={<AllEvents />} />
          <Route path="new" element={<NewEvent />} />
          <Route path=":id" element={<EventDetails />} />
        </Routes>
      </Card>
    </Container>
  );
}

export default Events;
