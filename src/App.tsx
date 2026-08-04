import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import MintLaunch from "./pages/MintLaunch";
import MintLaunches from "./pages/MintLaunches";
import MemeLaunch from "./pages/MemeLaunch";

function App() {
  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <Header />
      <main className="min-h-screen bg-[#FFFBF0]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<MintLaunch />} />
          <Route path="/mint-launches" element={<MintLaunches />} />
          <Route path="/meme-launch" element={<MemeLaunch />} />
        </Routes>
      </main>
      <Toast />
    </div>
  );
}

export default App;
