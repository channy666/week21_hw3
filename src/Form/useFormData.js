import { useState, useCallback } from "react";
import useInput from "./useInput";

export default function useFormData() {
  const {
    nickname,
    phone,
    email,
    signUp,
    aware,
    other,
    handleInputChange,
  } = useInput();

  const inputData = {
    nickname,
    phone,
    email,
    signUp,
    aware,
    other,
  };

  const [validInput, setValidInput] = useState({
    nickname: true,
    email: true,
    phone: true,
    aware: true,
    signUp: true,
    other: true,
  });

  const [scrollToInvalidInput, setScrollToInvalidInput] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (nickname && phone && aware && email && signUp) {
      let alertMessage = `
      暱稱：${nickname}
      電子郵件：${email}
      手機號碼：${phone}
      報名類型：${signUp}
      怎麼知道這個活動的：${aware}
      `;

      if (other) {
        alertMessage = alertMessage + `其他：${other}`;
      }

      alert(alertMessage);
      window.scrollTo(0, 0);
      window.location.reload();
    }

    const isValidInput = {
      nickname: nickname ? true : false,
      email: email ? true : false,
      phone: phone ? true : false,
      signUp: signUp ? true : false,
      aware: aware ? true : false,
    };

    setValidInput(isValidInput);

    for (let key in isValidInput) {
      if (!isValidInput[key]) {
        setScrollToInvalidInput(key);
        return;
      }
    }
  };

  const handleInputFocus = useCallback(
    (e) => {
      const name = e.target.name;
      if (validInput[name]) return;

      setValidInput((prevState) => {
        let newValidInput = JSON.parse(JSON.stringify(prevState));
        for (let key in newValidInput) {
          if (key === name) {
            newValidInput[key] = true;
          }
        }
        return newValidInput;
      });
    },
    [validInput, setValidInput]
  );

  return {
    inputData,
    handleInputChange,
    validInput,
    scrollToInvalidInput,
    handleFormSubmit,
    handleInputFocus,
  };
}
