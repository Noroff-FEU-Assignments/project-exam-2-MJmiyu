import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import styles from './ContactForm.module.css';
import { useAPI } from '../../util/APIContext';
import Input from '../inputs/Input';
import Button from '../inputs/Button';
import Textarea from '../inputs/Textarea';
import Notification from '../page/Notification';

const schema = yup.object().shape({
  name: yup.string().required('Enter your name here'),
  email: yup
    .string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  subject: yup.string().required('Enter a subject'),
  message: yup.string().required('Enter your message'),
});

const ContactForm = () => {
  const [notification, setNotification] = useState();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { post } = useAPI();

  const onSubmit = useCallback(
    async (data) => {
      if (submitting) {
        return;
      }

      setSubmitting(true);

      const result = await post('messages', data);

      if (!result) {
        setNotification({ type: 'error', message: 'Failed to send message' });
      } else {
        setNotification({ message: 'Message sent' });

        reset();
      }

      setSubmitting(false);
    },
    [post, reset, submitting]
  );

  return (
    <>
      <form className={styles.ContactForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Name"
          error={errors.name}
          placeholder="Name"
          {...register('name')}
        />

        <Input
          title="Email address"
          error={errors.email}
          placeholder="Email address"
          {...register('email')}
        />

        <Input
          title="Subject"
          error={errors.subject}
          placeholder="Subject"
          {...register('subject')}
        />

        <Textarea
          title="Message"
          error={errors.message}
          placeholder="Message"
          {...register('message')}
        />

        <Button>Submit</Button>
      </form>

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ContactForm;
