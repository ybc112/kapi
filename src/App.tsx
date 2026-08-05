import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import MintLaunch from "./pages/MintLaunch";
import MintLaunches from "./pages/MintLaunches";
import MintProjectDetail from "./pages/MintProjectDetail";
import MemeLaunch from "./pages/MemeLaunch";
import Game from "./pages/Game";

function App() {
  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <Header />
      <main className="min-h-screen bg-[#FFFBF0]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<MintLaunch />} />
          <Route path="/mint-launches" element={<MintLaunches />} />
          <Route path="/mint-project/:token" element={<MintProjectDetail />} />
          <Route path="/meme-launch" element={<MemeLaunch />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <Toast />
    </div>
  );
}

export default App;