import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import styles from './SignupForm.module.scss';

import {useSignup} from '@/hooks/Auth/auth';

import StepEmail from '@/components/Auth/Signup/Step/StepEmail';
import StepEmailSert from '@/components/Auth/Signup/Step/StepEmailSert';
import StepPassword from '@/components/Auth/Signup/Step/StepPassword';
import StepProfile from '@/components/Auth/Signup/Step/StepProfile';
import CustomToast from '@/components/CustomToast/CustomToast';

import {s3Request} from '@/api/s3';

import {AuthForm, SignupFormProps} from '@/types/auth';

function SignupForm({signupStep, setSignupStep}: SignupFormProps) {
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: {errors, dirtyFields},
  } = useForm<AuthForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      emailSert: '',
      password: '',
      passwordConfirm: '',
      image: undefined,
      nickname: '',
    },
  });
  const watchFields = watch();
  const [code, setCode] = useState<string>('');
  const showToast = CustomToast();
  const navigate = useNavigate();
  const signup = useSignup();

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    if (Object.keys(dirtyFields).length < 5) return;

    try {
      const {email, password, image, nickname} = data;
      const profile = dirtyFields.image ? await s3Request.uploadImage(image as FileList) : undefined;

      const res = await signup.mutateAsync({
        email,
        password,
        profile: profile?.split('?')[0],
        nickname,
        token: code,
      });

      if (res.data.responseCode === 204) {
        showToast('만료된 토큰입니다. 다시 인증해주세요.');
        setSignupStep('agree');
        navigate('/auth/login');
        return;
      }

      if (res.data.responseCode === 205) {
        showToast('잘못된 토큰입니다. 다시 인증해주세요.');
        setSignupStep('agree');
        navigate('/auth/login');
        return;
      }

      navigate('/auth/login', {replace: true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.bar}></div>
      <div
        className={`${styles.bar}
          ${
            signupStep === 'email'
              ? styles.step_email
              : signupStep === 'emailSert'
                ? styles.step_emailSert
                : signupStep === 'password'
                  ? styles.step_password
                  : styles.step_profile
          }
        `}
      ></div>

      {signupStep === 'email' && (
        <StepEmail
          setSignupStep={setSignupStep}
          register={register}
          watchFields={watchFields}
          resetField={resetField}
          dirty={dirtyFields.email}
          error={errors.email}
        />
      )}

      {signupStep === 'emailSert' && (
        <StepEmailSert
          setSignupStep={setSignupStep}
          register={register}
          watchFields={watchFields}
          dirty={dirtyFields.emailSert}
          error={errors.emailSert}
          setCode={setCode}
        />
      )}

      {signupStep === 'password' && (
        <StepPassword
          setSignupStep={setSignupStep}
          register={register}
          resetField={resetField}
          watchFields={watchFields}
          dirtyFields={dirtyFields}
          errors={errors}
        />
      )}

      {signupStep === 'profile' && (
        <StepProfile register={register} resetField={resetField} dirty={dirtyFields.nickname} error={errors.nickname} />
      )}
    </form>
  );
}

export default SignupForm;
