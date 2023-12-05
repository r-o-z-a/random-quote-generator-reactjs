import React, { useState, useEffect } from "react";
import "./quotesStyles.css";

const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [hover, setHover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch(
        "https://bahaiprayers.net/api/prayer/HiddensByLanguage?languageid=1"
      );
      const data = await response.json();
      setQuotes(data);
      setQuote(data[0].Text); // Set the first quote as the default
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const displayRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].Text);
    }
  };

  const handleCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = quote;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`wrapper ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <div className="toggle-dark-mode" onClick={toggleDarkMode}>
          {darkMode ? (
            <img
              src="https://cdn-icons-png.flaticon.com/128/12765/12765937.png"
              alt="sun"
              width="30px"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/2541/2541712.png"
              alt="moon"
              width="30px"
            />
          )}
        </div>
        <h1>THE HIDDEN WORDS</h1>
      </div>
      <div
        className={`quote ${hover ? "hovered" : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleCopyToClipboard}
      >
        <span className={`right ${hover ? "visible" : "hidden"}`}>🗍</span>
        {darkMode ? (
          <img
            src="https://cdn-icons-png.flaticon.com/128/7671/7671342.png"
            alt="sun"
            width="30px"
          />
        ) : (
          <img
            src="https://www.svgrepo.com/show/441008/quote-left.svg"
            alt="moon"
            width="30px"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: quote }} />
        <p>~Bahá’u’lláh</p>
      </div>
      {showTooltip && <div className="tooltip">Quote copied!</div>}
      <button
        className={`button ${darkMode ? "dark-mode" : ""}`}
        onClick={displayRandomQuote}
      >
        Next
      </button>
    </div>
  );
};

export default RandomQuoteGenerator;
