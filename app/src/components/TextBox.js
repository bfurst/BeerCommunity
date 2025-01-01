import Form from 'react-bootstrap/Form';
import '../styles/style.css';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

const Simple = ({ value, placeholder, regex, maxLength = 255, errorMessage, optional = false, setData }) => {
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [startCheck, setStartCheck] = React.useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = React.useState("");

  useEffect(() => {
    if (value != null) {
      setText(value);
      setStartCheck(true);
    }

  }, [value]);

  useEffect(() => {
    validation(startCheck);
  }, [text]);

  const validation = (start) => {
    if (!start)
      return;

    let isValid = true;
    let errorMsg = "";

    if (text === "" && !optional) {
      isValid = false;
      errorMsg = "Field is required!";
    } else if (text.length > maxLength) {
      isValid = false;
      errorMsg = "Maximum length is reached!";
    } else if (regex && !regex.test(text)) {
      isValid = false;
      errorMsg = errorMessage;
    }

    setIsValid(isValid);
    setDisplayErrorMsg(errorMsg);
    setData(text, isValid);
  };


  return (
    <>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={text}
        isInvalid={!isValid && startCheck}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => { setStartCheck(true); validation(true) }}
      />
      <Form.Control.Feedback className="validation-error text-start" type="invalid" style={{ minHeight: 21, display: "block" }}>
        {displayErrorMsg}
      </Form.Control.Feedback>
    </>
  );
};

const Area = ({ value, placeholder, regex, maxLength = 1000, errorMessage, optional = false, setData }) => {
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [startCheck, setStartCheck] = React.useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = React.useState("");

  useEffect(() => {
    if (value != null) {
      setText(value);
      setStartCheck(true);
    }
  }, [value]);

  useEffect(() => {
    validation(startCheck);
  }, [text]);

  const validation = (start) => {
    if (!start) return;

    let isValid = true;
    let errorMsg = "";

    if (text === "" && !optional) {
      isValid = false;
      errorMsg = "Field is required!";
    } else if (text.length > maxLength) {
      isValid = false;
      errorMsg = "Maximum length is reached!";
    } else if (regex && !regex.test(text)) {
      isValid = false;
      errorMsg = errorMessage;
    }

    setIsValid(isValid);
    setDisplayErrorMsg(errorMsg);
    setData(text, isValid);
  };

  return (
    <>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder={placeholder}
        value={text}
        isInvalid={!isValid && startCheck}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => {
          setStartCheck(true);
          validation(true);
        }}
      />
      <div className="d-flex flex-row gap-3">
        <Form.Control.Feedback
          className="validation-error"
          type="invalid"
          style={{ minHeight: 21, display: "block" }}
        >
          {displayErrorMsg}
        </Form.Control.Feedback>

        <div className="word-counter" style={{ textAlign: "right", fontSize: "0.9rem", color: "gray" }}>
          {`${text.length}/${maxLength}`}
        </div>
      </div>
    </>
  );
};


const Url = ({ value, placeholder, regex, maxLength = 2048, errorMessage, optional = false, setData }) => {
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [startCheck, setStartCheck] = React.useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = React.useState("");

  useEffect(() => {
    if (value != null) {
      setText(value);
      setStartCheck(true);
    }
  }, [value]);

  useEffect(() => {
    validation(startCheck);
  }, [text]);

  const validation = (start) => {
    if (!start)
      return;

    let isValid = true;
    let errorMsg = "";

    if (text === "" && !optional) {
      isValid = false;
      errorMsg = "Field is required!";
    } else if (text.length > maxLength) {
      isValid = false;
      errorMsg = "Maximum length is reached!";
    } else if (regex && !regex.test(text)) {
      isValid = false;
      errorMsg = errorMessage;
    }

    setIsValid(isValid);
    setDisplayErrorMsg(errorMsg);
    setData(text, isValid);
  };


  return (
    <>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={text}
        isInvalid={!isValid && startCheck}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => { setStartCheck(true); validation(true) }}
      />
      <Form.Control.Feedback className="validation-error" type="invalid" style={{ minHeight: 21, display: "block" }}>
        {displayErrorMsg}
      </Form.Control.Feedback>
    </>
  );
};

const Number = ({ value, placeholder, min, max, maxLength, errorMessage, optional = false, setData }) => {
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [startCheck, setStartCheck] = React.useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = React.useState("");

  useEffect(() => {
    if (value != null) {
      setText(value);
      setStartCheck(true);
    }
  }, [value]);

  useEffect(() => {
    validation(startCheck);
  }, [text]);

  const validation = (start) => {
    if (!start) return;

    let isValid = false;
    let errorMsg = "Field is required!";

    if (text === "") {
      isValid = false;
      errorMsg = "Field is required!";
    } else if (!isNaN(parseInt(text)) && parseInt(text) >= min && parseInt(text) <= max) {
      isValid = true;
      errorMsg = "";
    } else {
      isValid = false;
      errorMsg = errorMessage;
    }

    setIsValid(isValid);
    setDisplayErrorMsg(errorMsg);
    setData(text, isValid);
  };


  return (
    <>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={text}
        isInvalid={!isValid && startCheck}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => { setStartCheck(true); validation(true) }}
      />
      <Form.Control.Feedback className="validation-error" type="invalid" style={{ minHeight: 21, display: "block" }}>
        {displayErrorMsg}
      </Form.Control.Feedback>
    </>
  );
};

const DecimalNumber = ({ value, placeholder, min, max, maxLength, decimals, errorMessage, optional = false, setData }) => {
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [startCheck, setStartCheck] = React.useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = React.useState("");

  useEffect(() => {
    if (value != null) {
      setText(value);
      setStartCheck(true);
    }
  }, [value]);

  useEffect(() => {
    validation(startCheck);
  }, [text]);

  const validation = (start) => {
    if (!start) return;

    let isValid = false;
    let errorMsg = "Field is required!";

    if (text === "") {
      isValid = optional;
      errorMsg = optional ? "" : "Field is required!";
    } else {
      const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimals}})?$`);
      const numericValue = parseFloat(text);

      if (regex.test(text) && !isNaN(numericValue) && numericValue >= min && numericValue <= max) {
        isValid = true;
        errorMsg = "";
      } else {
        isValid = false;
        errorMsg = errorMessage;
      }
    }

    setIsValid(isValid);
    setDisplayErrorMsg(errorMsg);
    setData(text, isValid);
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={text}
        isInvalid={!isValid && startCheck}
        maxLength={maxLength}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => { setStartCheck(true); validation(true) }}
      />
      <Form.Control.Feedback className="validation-error" type="invalid" style={{ minHeight: 21, display: "block" }}>
        {displayErrorMsg}
      </Form.Control.Feedback>
    </>
  );
};


const TextBox = {
  Simple,
  Area,
  Url,
  Number,
  DecimalNumber
};

export default TextBox;
