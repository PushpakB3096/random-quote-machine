import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomIdx, setRandomIdx] = useState(Math.round(Math.random() * 100));

  // getting list of quotes on load
  useEffect(() => {
    // async f
    async function getQuotes() {
      try {
        const resp = await axios.get(
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        );
        // setting quotes to local state after we receive it
        if (resp.data.quotes.length) {
          setQuotes(resp.data.quotes);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getQuotes();
  }, []);

  // generates a random quote index
  const getNewQuote = () => {
    setRandomIdx(Math.round(Math.random() * quotes.length));
  };

  return (
    <div>
      <div id="quote-box">
        <span id="text">
          {/* randomly displaying a quote from the array */}
          <i className="fa fa-quote-left">&nbsp;</i>
          {quotes && quotes[randomIdx] && quotes[randomIdx].quote}
        </span>
        <div id="author">
          - {quotes && quotes[randomIdx] && quotes[randomIdx].author}
        </div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
              '"' +
                (quotes && quotes[randomIdx] && quotes[randomIdx].quote) +
                '" - ' +
                (quotes && quotes[randomIdx] && quotes[randomIdx].author)
            )}`}
          >
            Tweet
          </a>
          <button className="button" id="new-quote" onClick={getNewQuote}>
            New Quote
          </button>
        </div>
      </div>
      <div className="footer">
        by{" "}
        <a
          href="https://www.linkedin.com/in/pushpak-bhattacharya/"
          target="_blank"
          rel="noreferrer"
        >
          Pushpak Bhattacharya
        </a>
      </div>
    </div>
  );
};

export default App;
