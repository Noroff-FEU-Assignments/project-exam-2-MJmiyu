import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState } from 'react';
import styles from './BookHotelForm.module.css';
import { useAPI } from '../../util/APIContext';
import { format, addDays, differenceInDays, isAfter } from 'date-fns';
import Input from '../inputs/Input';
import Button from '../inputs/Button';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  fromDate: yup.date().required('Enter when you are booking from'),
  toDate: yup
    .date()
    .required('Enter when you are booking to')
    .test(
      'toDateBeforeFromDate',
      'Needs to be after the start date',
      (value, context) => {
        return isAfter(new Date(value), new Date(context.parent.fromDate));
      }
    ),
  rooms: yup
    .number()
    .typeError('Must be a number')
    .required('Enter the number of rooms your are booking'),
});

const today = () => {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
};

const tomorrow = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  return format(tomorrow, 'yyyy-MM-dd');
};

const BookHotelForm = ({
  hotel: {
    attributes: { price, name },
  },
  onBooking,
  onError,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      fromDate: today(),
      toDate: tomorrow(),
      rooms: 1,
    },
  });

  const { fromDate, toDate, rooms } = watch();

  const isFromDateAfterToDate = useMemo(() => {
    return !isAfter(new Date(toDate), new Date(fromDate));
  }, [toDate, fromDate]);

  const bookingPrice = useMemo(() => {
    const days = differenceInDays(new Date(toDate), new Date(fromDate));
    return days * price * rooms;
  }, [fromDate, toDate, rooms, price]);

  const { post } = useAPI();

  const onSubmit = useCallback(
    async (data) => {
      if (submitting) {
        return;
      }

      setSubmitting(true);
      const result = await post('bookings', {
        ...data,
        price: bookingPrice,
        hotelName: name,
      });

      setSubmitting(false);

      if (result) {
        onBooking();
      } else {
        onError();
      }
    },
    [post, bookingPrice, name, submitting, onBooking, onError]
  );

  return (
    <form className={styles.BookHotelForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="Email"
        error={errors.email}
        placeholder="Email"
        {...register('email')}
      />

      <Input
        title="From"
        error={errors.fromDate}
        type="date"
        placeholder="From"
        {...register('fromDate')}
      />

      <Input
        title="To"
        error={errors.toDate}
        type="date"
        placeholder="To"
        {...register('toDate')}
      />

      <Input
        title="Rooms"
        error={errors.rooms}
        placeholder="Rooms"
        {...register('rooms')}
      />

      <div className={styles.BookingPrice}>
        {isFromDateAfterToDate ? '-' : `Current price: ${bookingPrice} NOK`}
      </div>

      <Button>Order</Button>
    </form>
  );
};

export default BookHotelForm;
