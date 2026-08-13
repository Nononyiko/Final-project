import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Dictionary defaultWord="sunset" />

        <footer>
          This project was coded by{" "}
          <strong>Tinyiko Malwane</strong>{" "}
          and is{" "}
          <a
            href="https://github.com/Nononyiko"
            target="_blank"
            rel="noopener noreferrer"
          >
            open sourced on GitHub
          </a>
          .
        </footer>
      </div>
    </div>
  );
}

export default App;