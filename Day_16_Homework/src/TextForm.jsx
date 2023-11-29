import React, { useReducer, useRef, useEffect } from "react";

const initialState = {
  text: "",
  preview: ""
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload, preview: action.payload };
    case 'UPPERCASE':
      return { ...state, text: state.text.toUpperCase(), preview: state.text.toUpperCase() };
    case 'LOWERCASE':
      return { ...state, text: state.text.toLowerCase(), preview: state.text.toLowerCase() };
    case 'CLEAR_TEXT':
      return { ...state, text: "", preview: "" };
    case 'COPY_TO_CLIPBOARD':
      navigator.clipboard.writeText(action.payload);
      return state;
    case 'REMOVE_EXTRA_SPACES':
      const newText = state.text.replace(/\s+/g, ' ').trim();
      return { ...state, text: newText, preview: newText };
    default:
      return state;
  }
};

export default function TextForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const textareaRef = useRef(null);
  const wordCountRef = useRef(null);
  const charCountRef = useRef(null);
  const readingTimeRef = useRef(null);

  useEffect(() => {
    // Update word count, character count, and reading time on state change
    const words = state.text.split(/\s+/).filter((word) => word !== "").length;
    const characters = state.text.length;
    const readingTime = Math.ceil(words / 200);

    wordCountRef.current.textContent = `Words: ${words}`;
    charCountRef.current.textContent = `Characters: ${characters}`;
    readingTimeRef.current.textContent = `Reading Time: ${readingTime} min`;
  }, [state.text]);

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3 mt-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea ref={textareaRef} className="form-control" value={state.text} onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })} id="myBox" rows="8"></textarea>
        </div>
        <div className="flex justify-between w-full">
        <button className="btn btn-primary mr-3" onClick={() => dispatch({ type: 'UPPERCASE' })}>Convert to UpperCase</button>
        <button className="btn btn-primary mr-2" onClick={() => dispatch({ type: 'LOWERCASE' })}>Convert to LowerCase</button>
        <button className="btn btn-warning ml-2" onClick={() => dispatch({ type: 'CLEAR_TEXT' })}>Clear Text</button>
        <button className="btn btn-info ml-2" onClick={() => dispatch({ type: 'COPY_TO_CLIPBOARD' })}>Copy to Clipboard</button>
        <button className="btn btn-success ml-2" onClick={() => dispatch({ type: 'REMOVE_EXTRA_SPACES' })}>Remove Extra Spaces</button>
        </div>
      </div>

      <div className="mt-12 ml-[20%]">
        <p ref={wordCountRef}></p>
        <p ref={charCountRef}></p>
        <p ref={readingTimeRef}></p>
      </div>

      <br />
      <div className="w-screen px-10  flex flex-col items-center">
      <strong className="">Preview : </strong>
      <p className="font-semibold text-2xl" >{state.preview}</p>
      </div>
    </>
  );
}