import styles from "./Input.module.scss";

import RemoveBtn from "@/assets/icons/removeBtn.svg?react";

import { LoginInput } from "@/types/auth";

function InputEmail({ label, register, dirtyFields, resetField }: LoginInput) {
  const resetEmail = () => {
    resetField("email");
  };

  return (
    <section className={styles.container}>
      <label htmlFor="email">{label}</label>

      <input
        id="email"
        className={styles.input}
        type="text"
        placeholder="이메일 주소를 입력해주세요"
        {...register("email", {
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
            message: "이메일 형식이 올바르지 않습니다.",
          },
        })}
      />

      {dirtyFields.email && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={resetEmail}
          tabIndex={-1}
        >
          <RemoveBtn className={styles.svg} />
        </button>
      )}
    </section>
  );
}

export default InputEmail;
