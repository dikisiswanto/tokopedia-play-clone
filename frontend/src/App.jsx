import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Toaster } from '@/components/ui/Toaster';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <section className="bg-gray-800 text-slate-100 w-full font-inter overflow-x-hidden">
        <div className="container max-w-6xl mx-auto w-full px-3 flex flex-col min-h-screen">
          <AnimatePresence mode="wait" initial={true} onExitComplete={() => window.scrollTo(0, 0)}>
            <Routes location={location} key={location.pathname}>
              <Route path="/video/:videoId" element={<Detail />}></Route>
              <Route path="/" exact element={<Home />}></Route>
            </Routes>
          </AnimatePresence>
        </div>
      </section>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
