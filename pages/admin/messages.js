import { useCallback, useState } from 'react';
import useSWR from 'swr';
import AdminNav from '../../components/page/AdminNav';
import Button from '../../components/inputs/Button';
import { HolidazeAdminHead } from '../../components/page/Head';
import Loading from '../../components/page/Loading';
import Notification from '../../components/page/Notification';
import Page from '../../components/page/Page';
import Paragraph from '../../components/typography/Paragraph';
import Title from '../../components/typography/Title';
import styles from '../../styles/admin/Messages.module.css';
import { useAuthAPI } from '../../util/AuthAPIContext';

const Messages = () => {
  const [notification, setNotification] = useState();

  const { authGet, authDelete } = useAuthAPI();

  const { data, error, mutate } = useSWR('messages', authGet);

  const onDeleteMessage = useCallback(
    async (id) => {
      if (!window.confirm('Are your sure you wish to delete this message?')) {
        return;
      }
      const result = await authDelete('/messages', id);

      if (result) {
        setNotification({ message: 'Booking deleted' });

        mutate();
      } else {
        setNotification({ type: 'error', message: 'Deleting message failed' });
      }
    },
    [authDelete, mutate]
  );

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load messages</div>;
  }

  const messages = data.data;

  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Messages</Title>

      <div className={styles.Messages}>
        {messages.map((message) => {
          const {
            id,
            attributes: { name, email, subject, message: userMessage },
          } = message;

          return (
            <div className={styles.MessageRow} key={message.id}>
              <div className={styles.Name} title={name}>
                {name}
              </div>

              <div className={styles.Email} title={email}>
                {email}
              </div>

              <Paragraph className={styles.Subject}>
                Subject: {subject}
              </Paragraph>

              <Paragraph className={styles.Message}>{userMessage}</Paragraph>

              <div className={styles.DeleteMessage}>
                <Button color="red" onClick={() => onDeleteMessage(id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </Page>
  );
};

export default Messages;
