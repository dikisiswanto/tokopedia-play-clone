import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from '@/components/ui/Toaster';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';

function App() {
  return (
    <HelmetProvider>
      <section className="bg-gray-800 text-slate-100 w-full font-inter">
        <div className="container max-w-6xl mx-auto w-full px-3 flex flex-col min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/video/:videoId" element={<Detail />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </section>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
