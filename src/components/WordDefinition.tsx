import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import "../App.module.css";
import styles from "./WordDefinition.module.css";

export default function WordDefinition({ solution, isWin }: any) {
  const [data, setData] = useState([] as any);
  const [ready, setReady] = useState(false);
  const [phonetic, setPhonetic] = useState([] as any);

  useEffect(() => {
    async function fetchWordDefinition() {
      const result = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${solution}`
      );
      setData(result.data[0]);
      setReady(true);
    }

    if (solution !== "") {
      fetchWordDefinition();
    }
  }, [solution]);

  useEffect(() => {
    if (!ready) return;
    let index = -1;
    let temporaryIndex = -1;
    console.log(data);
    data.phonetics.every((phonetic: any, i: number) => {
      if (phonetic.text !== "" && phonetic.audio !== "") {
        index = i;
        return false;
      } else if (phonetic.text !== "") {
        temporaryIndex = i;
      }
      return true;
    });
    setPhonetic(
      temporaryIndex !== index
        ? data.phonetics[index === -1 ? temporaryIndex : index]
        : null
    );
  }, [ready, data]);

  function playAudio() {
    if (!ready) return;
    new Audio(phonetic.audio).play();
  }

  return ready ? (
    <div
      className={
        styles.wordDefinition +
        " animate__animated animate__fadeIn animate__delay-3s"
      }
    >
      <div className={styles.overlay}></div>
      <div
        className={
          styles["definition-container"] +
          " " +
          (isWin ? styles.win : styles.lose)
        }
      >
        <div className={styles.title}>{data.word}</div>
        {phonetic !== null ? (
          <div className={styles.phonetics}>
            {phonetic.text}
            {phonetic.audio === "" ? (
              <span></span>
            ) : (
              <span className={styles.volume} onClick={playAudio}>
                <FontAwesomeIcon icon={faVolumeUp} />
              </span>
            )}
          </div>
        ) : (
          <div></div>
        )}

        <div className={styles["border-line"]}></div>

        {data.meanings.slice(0, 3).map((meaning: any, meaningIndex: number) => {
          return (
            <div key={meaningIndex}>
              <span>
                <em>{meaning.partOfSpeech}</em>
              </span>
              {meaning.definitions
                .slice(0, 3)
                .map((definition: any, definitionIndex: number) => {
                  return (
                    <div key={definitionIndex} className={styles.definition}>
                      <span>{definitionIndex + 1 + ". "}</span>
                      <div>
                        <div>{definition.definition}</div>
                        <div className={styles.definitionExample}>
                          <em>
                            {definition.example !== undefined
                              ? '    "' + definition.example + '"'
                              : ""}
                          </em>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}

        <button className={styles["try-again-button"]} type="button" onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
