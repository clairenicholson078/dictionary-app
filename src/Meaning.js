import React from "react";
import Synonyms from "./Synonyms";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      {props.meaning.definitions.map(function (definition, index) {
        let number = index + 1;
        return (
          <div key={index}>
            <br />
            <div className="definition">
              {number}. <i> ({props.meaning.partOfSpeech}) </i> &nbsp;
              {definition.definition}
            </div>

            <div className="example">{definition.example}</div>
            <Synonyms synonyms={definition.synonyms} />
            <br />
          </div>
        );
      })}
    </div>
  );
}
