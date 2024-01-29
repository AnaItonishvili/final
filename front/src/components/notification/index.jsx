import { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";

import { clearMessages } from "../../redux/slices/uiSlice";

import "./notification.css";

function NotifyUser({ messages }) {
  const dispatch = useDispatch();
  const nonNullKey = Object.keys(messages).find(
    (key) => messages[key] !== null
  );
  const nonNullValue = messages[nonNullKey];
  const elementRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      elementRef.current.classList.add("hiding");
      setTimeout(() => {
        dispatch(clearMessages());
      }, 350);
    }, 3000);
  }, [messages]);

  return (
    <div ref={elementRef} className={`ui__show__message ${nonNullKey}`}>
      <strong>{nonNullValue}</strong>
    </div>
  );
}

export default NotifyUser;
