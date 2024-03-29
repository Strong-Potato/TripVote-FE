import {useEffect, useState} from 'react';

import styles from './Step.module.scss';

import {useFindPasswordEmailSert} from '@/hooks/Auth/auth';

import AuthButton from '@/components/Auth/Button/AuthButton';
import InputEmailSert from '@/components/Auth/Input/InputEmailSert';
import CustomToast from '@/components/CustomToast/CustomToast';

import {StepEmailSertProps} from '@/types/auth';

function StepEmailSert({
  setFindPasswordStep,
  register,
  watchFields: {email, emailSert},
  dirty,
  error,
  setCode,
}: StepEmailSertProps) {
  const [due, setDue] = useState<number>(300);
  const showToast = CustomToast();
  const sertEmail = useFindPasswordEmailSert();

  useEffect(() => {
    const timer = setInterval(() => {
      setDue((count) => count - 1);
    }, 1000);

    if (due === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [due]);

  const onClickEmailSert = async () => {
    try {
      const res = await sertEmail.mutateAsync({
        email,
        code: emailSert,
      });

      if (res.data.responseCode === 203) {
        showToast('인증코드가 일치하지 않습니다.');
        return;
      }

      setCode!(await res.data.data.token);
      setFindPasswordStep!('password');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>
        비밀번호 재설정을 위해
        <br />
        이메일 인증을 해주세요
      </h2>

      <div className={styles.userEmail}>
        <p className={styles.userEmail__label}>이메일</p>
        <p className={styles.userEmail__email}>{email}</p>
      </div>

      <InputEmailSert register={register} email={email} due={due} setDue={setDue} type='findPassword' />

      <AuthButton
        content='이메일 인증 완료'
        disabled={!dirty || due === 0 || error ? true : false}
        type='button'
        onClick={onClickEmailSert}
      />
    </section>
  );
}

export default StepEmailSert;
