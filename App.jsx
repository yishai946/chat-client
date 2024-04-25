import Navigation from "./Navigation";
import { AppProvider } from "./AppContext";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
