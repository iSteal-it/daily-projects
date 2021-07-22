import React from "react";
import Header from "./header";
import Card from "./card";
import emojipedias from "../emojipedia";

function CardEmoji(emojipedia) {
  return (
    <Card
      emoji={emojipedia.emoji}
      name={emojipedia.name}
      meaning={emojipedia.meaning}
    />
  );
}
function App() {
  return (
    <div>
      <Header />
      {emojipedias.map(CardEmoji)}
    </div>
  );
}

export default App;
