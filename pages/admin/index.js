import { HolidazeAdminHead } from '../../components/page/Head';
import styles from '../../styles/admin/Login.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthAPI } from '../../util/AuthAPIContext';
import Input from '../../components/inputs/Input';
import Button from '../../components/inputs/Button';
import Page from '../../components/page/Page';
import Title from '../../components/typography/Title';

const schema = yup.object().shape({
  username: yup.string().required('Enter your username or email'),
  password: yup.string().required('Enter a password'),
});

const LoginPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuthAPI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async ({ username, password }) => {
      if (submitting) {
        return;
      }

      setSubmitting(true);

      login(username, password);

      setSubmitting(false);
    },
    [login, submitting]
  );

  return (
    <Page>
      <HolidazeAdminHead />

      <Title>Holidaze admin login</Title>

      <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Username"
          placeholder="Username"
          error={errors.name}
          {...register('username')}
        />

        <Input
          type="password"
          title="Password"
          placeholder="Password"
          error={errors.password}
          {...register('password')}
        />

        <Button>Login</Button>
      </form>
    </Page>
  );
};

export default LoginPage;
