import { Slide } from "@chakra-ui/react";

import styles from "./DateBottomSlide.module.scss";

import { BottomSlideProps } from "@/types/bottomSlide";

function DateBottomSlide({ isOpen, onClose, children }: BottomSlideProps) {
  return (
    <>
      <div
        className={styles.slideContainer}
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={() => {
          document.body.style.removeProperty("overflow");
          onClose();
        }}
      ></div>
      <Slide className={styles.slide} direction="bottom" in={isOpen}>
        <div className={styles.slide__content}>{children}</div>
      </Slide>
    </>
  );
}

export default DateBottomSlide;
