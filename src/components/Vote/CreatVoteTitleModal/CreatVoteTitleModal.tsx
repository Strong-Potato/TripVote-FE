import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { LiaVoteYeaSolid } from "react-icons/lia";

import styles from "./CreatVoteTitleModal.module.scss";

// import VoteIcon from "@/assets/ic_vote.svg";

const CreatVoteTitleModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputCount, setInputCount] = useState<number>(0);

  return (
    <div className={styles.container}>
      <Button
        variant="blueButton"
        onClick={onOpen}
        mt="30px"
        w="18.4rem"
        h="5.4rem"
        borderRadius="30px"
      >
        <Icon as={LiaVoteYeaSolid} fontSize="2.2rem" mr="4px" /> 투표 만들기
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent
          px="10px"
          py="20px"
          borderRadius="20px"
          alignSelf="center"
          w="32.7rem"
          h="23.6rem"
          boxSizing="border-box"
        >
          <ModalHeader
            fontWeight="titleSmall"
            fontSize="titleSmall"
            textAlign="center"
            mt="5px"
          >
            투표 제목을 정해주세요
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl justifyContent={"center"}>
              <Input
                onChange={(e) => setInputCount(e.target.value.length)}
                maxLength={15}
                borderColor="neutral.800"
                focusBorderColor="primary.300"
                variant="flushed"
                placeholder=" 숙소 정하자, 카페 정하자"
                fontSize="subTitle"
                mt="5%"
              />
              <FormLabel
                display="flex"
                justifyContent="flex-end"
                fontSize="captionMedium"
                fontWeight="captionMedium"
                mt="4px"
                mr="-1px"
              >
                {inputCount}/15자
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={onClose}
              variant="blueButton"
              w="100%"
              h="48px"
              isDisabled={inputCount === 0}
            >
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatVoteTitleModal;
