import Home from "@/pages/Home";
import Detail from "@/pages/Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/Toaster";

function App() {
  return (
    <>
      <section className="bg-gray-800 text-slate-100 w-full font-inter">
        <div className="container max-w-6xl mx-auto w-full px-3 flex flex-col min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/video/:videoId" element={<Detail />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </section>
      <Toaster />
    </>
  );
}

export default App;
