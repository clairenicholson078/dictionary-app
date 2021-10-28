import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import pen from "./pen.png";
import gnome from "./gnome.png";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    // documentation: https://dictionaryapi.dev/e
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleDictionResponse);

    let pexelsApiKey =
      "563492ad6f91700001000001fdd29f0808df42bd90c33f42e128fa89";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <br />
          <img src={pen} alt="pen" class="pen" />
          <h1 className="header">Claire's dictionary</h1> <br />
          <hr className="lookupword" />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleKeywordChange}
              defaultValue="gorilla"
            />
          </form>
          <div className="hint">
            try these words: sunset, gorilla, cat;
            <br /> <br />
          </div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
        <hr className="lookupword" />
        <footer>
          <img src={gnome} width="80px" alt="gnome" />
          This project was coded by{" "}
          <a
            href="https://www.clairenicholsondigital.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer"
          >
            Claire Nicholson
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/shecodesio/dictionary"
            target="_blank"
            rel="noopener noreferrer"
            class="footer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://shecodes-dictionary.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
