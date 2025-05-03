import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import UserLayout from './pages/UserLayout';
import NewTest from './pages/NewTest';
import Collection from './pages/Collection';
import ProtectRoute from './components/ProtectRoute';
import InstructionPage from './pages/InstructionPage';
import { ToastContainer } from 'react-toastify';
import TestProtected from './components/TestProtected';
import AttemptingTest from './pages/AttemptingTest';
import NotFound from './pages/NotFound';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-4">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-md"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="relative bg-white dark:bg-dark-900 text-dark-900 dark:text-white h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  MC
                </div>
              </div>
              <motion.h1
                className="text-2xl font-bold text-dark-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                MindCraft
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={
            <ProtectRoute><UserLayout /></ProtectRoute>}>
            <Route path="new" element={
              <NewTest />} />
            <Route path="collection" element={<Collection />} />

          </Route>
          <Route path='/test-instruction/:userId/:testId' element={
            <TestProtected>
              <InstructionPage />
            </TestProtected>
          } />

          <Route path='/attempting-test/:userId/:testId' element={
            <TestProtected>
              <AttemptingTest />
            </TestProtected>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;