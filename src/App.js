import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState([]);

  // getting list of quotes on load
  useEffect(async () => {
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
  }, []);

  // returns random number from 0 to 100
  const randomIdx = Math.round(Math.random() * quotes.length);
  console.log({ randomIdx });

  return (
    <div id="quote-box">
      <div id="text">
        {/* randomly displaying a quote from the array */}
        {quotes && quotes[randomIdx] && quotes[randomIdx].quote}
      </div>
      <div id="author">
        {quotes && quotes[randomIdx] && quotes[randomIdx].author}
      </div>
      <a href="#" id="new-quote">
        new-quote
      </a>
      <a href="#" id="tweet-quote">
        tweet-quote
      </a>
    </div>
  );
};

export default App;
