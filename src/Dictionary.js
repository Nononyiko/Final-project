import React, { useEffect, useState } from "react";

export default function Dictionary({ defaultWord }) {
  const [word, setWord] = useState(defaultWord);
  const [inputWord, setInputWord] = useState(defaultWord);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function searchWord(searchTerm) {
    const cleanWord = searchTerm.trim();

    if (!cleanWord) {
      return;
    }

    setLoading(true);
    setError(false);

    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        cleanWord
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Word not found");
        }

        return response.json();
      })
      .then((data) => {
        setWord(cleanWord);
        setResults(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setResults(null);
        setError(true);
        setLoading(false);
      });
  }

  useEffect(() => {
    searchWord(defaultWord);
  }, [defaultWord]);

  function handleSubmit(event) {
    event.preventDefault();
    searchWord(inputWord);
  }

  return (
    <div className="Dictionary">
      <section className="search-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            What word do you want to look up?
          </label>

          <input
            id="search"
            type="search"
            placeholder="Search for a word"
            value={inputWord}
            onChange={(event) => setInputWord(event.target.value)}
          />
        </form>

        <small className="hint">
          i.e. paris, wine, yoga, coding
        </small>
      </section>

      {loading && <p className="loading">Searching...</p>}

      {error && (
        <p>
          Sorry, we couldn't find the word <strong>{inputWord}</strong>.
          Please try another word.
        </p>
      )}

      {!loading && results && (
        <div className="Result">
          <section className="word-section">
            <h1>{word}</h1>

            {results.phonetic && (
              <div className="Phonetic">
                <h2>{results.phonetic}</h2>
              </div>
            )}

            {results.phonetics &&
              results.phonetics.find((item) => item.audio) && (
                <button
                  type="button"
                  onClick={() => {
                    const audio = results.phonetics.find(
                      (item) => item.audio
                    );
                    new Audio(audio.audio).play();
                  }}
                >
                  🔊 Listen
                </button>
              )}
          </section>

          {results.meanings.map((meaning, index) => (
            <section className="Meaning" key={index}>
              <h3>{meaning.partOfSpeech}</h3>

              {meaning.definitions.map((definition, definitionIndex) => (
                <div key={definitionIndex}>
                  <p>{definition.definition}</p>

                  {definition.example && (
                    <em>{definition.example}</em>
                  )}
                </div>
              ))}

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="Synonyms">
                  <strong>Similar:</strong>

                  <ul>
                    {meaning.synonyms.map((synonym, synonymIndex) => (
                      <li key={synonymIndex}>{synonym}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}