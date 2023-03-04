import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/BackButton';
import BackButton from '../components/BackButton';

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // When you want something to unmount, use return in useEffect
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>Tickets</div>;
}

export default Tickets;
