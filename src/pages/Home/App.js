import "./styles.css";

import Header from "./components/Header";
import Tips from "./components/Tips";
import MiddleContent from "./MiddleContent";

export default function App() {
  return (
    <div className="App">
      <Header />
      <MiddleContent />
      <Tips />
    </div>
  );
}
