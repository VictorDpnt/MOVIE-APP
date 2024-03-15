import React, { useState } from "react";

const Trie = () => {
  const [showPop, setShowPop] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showDate, setShowDate] = useState(false);
  return (
    <div className="trie-container">
      <div className="drop-container">
        <ul onClick={() => setShowPop(!showPop)}>
          Popularité
          {showPop ? (
            <div className="drop-menu">
              <li>Popularité +/-</li>
              <li>Popularité -/+</li>
            </div>
          ) : null}
        </ul>
      </div>
      <div className="drop-container">
        <ul onClick={() => setShowRate(!showRate)}>
          Notation
          {showRate ? (
            <div className="drop-menu">
              <li>Note +/-</li>
              <li>Note -/+</li>
            </div>
          ) : null}
        </ul>
      </div>
      <div className="drop-container">
        <ul onClick={() => setShowDate(!showDate)}>
          Dates de sortie
          {showDate ? (
            <div className="drop-menu">
              <li>Date +/-</li>
              <li>Date -/+</li>
            </div>
          ) : null}
        </ul>
      </div>
      <p>Titres ( de A à Z)</p>
    </div>
  );
};

export default Trie;
