import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Timer from "./Timer";

const Main = () => {
  const phrase = "Once upon a time there was a little girl!";

  const [timerOn, setTimerOn] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [typedText, setTypedText] = useState();
  const [textMatch, setTextMatch] = useState(false);

  useEffect(() => {
    if (typedText && typedText.length === 1 && !textMatch) {
      setTimerOn(true);
    }
    if (typedText === phrase) {
      setTimerOn(false);
      setTextMatch(true);
    }
  }, [typedText, textMatch]);

  return (
    <main className="main">
      <section className="test-area">
        <div id="origin-text">
          <p>{phrase}</p>
        </div>
        <div className={classnames(textMatch ? "success" : "alert")}>
          <p>{timerOn && !textMatch && "Please insert the correct phrase!"}</p>
          <p>
            {!timerOn && textMatch && "Success! Inserted phrase is correct!"}
          </p>
        </div>

        <div className="test-wrapper">
          <textarea
            id="test-area"
            name="textarea"
            rows="6"
            placeholder="Type text here."
            className={classnames(
              typedText && (textMatch ? "valid" : "inValid")
            )}
            value={typedText}
            onChange={e => setTypedText(e.target.value)}
          ></textarea>
        </div>

        <div className="meta">
          <section id="clock">
            <div className="timer">
              <Timer timerOn={timerOn} resetTimer={resetTimer} />
            </div>
          </section>

          <button
            id="reset"
            onClick={() => {
              setTypedText("");
              setTextMatch(false);
              setTimerOn(false);
              setResetTimer(!resetTimer);
            }}
          >
            Start Again
          </button>
        </div>
      </section>
    </main>
  );
}

export default Main;
