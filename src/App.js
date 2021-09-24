import ReactGA from "react-ga";
import Rap from "./Components/Rap";

function App() {
  const trackingId = "G-726VB2HM34";
  ReactGA.initialize(trackingId);
  ReactGA.set({
    userId: auth.currentUserId(),
  });

  return <Rap />;
}

export default App;
