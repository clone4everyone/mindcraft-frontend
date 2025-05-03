import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate,useParams } from 'react-router-dom';

export default function InstructionPage() {
    const navigate=useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const {userId,testId}=useParams();
  console.log()
  // Animation on mount
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleStart = () => {
    navigate(`/attempting-test/${userId}/${testId}`); // Redirect to the test page
  };

  const handleDoLater = () => {
   navigate('/'); // Redirect to home or any other page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div 
        className={`max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ease-in-out transform ${
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <Clock className="mr-2" size={24} />
            Test Instructions
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
         
          
          <div className={`transition-all duration-500 delay-200 transform ${
            isAnimating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CheckCircle className="mr-2 text-green-500" size={20} />
              Full Screen Mode
            </h3>
            <p className="mt-2 text-gray-600 pl-7">
              The test will be conducted in full-screen mode. Exiting full-screen 
              will automatically submit your test and show results.
            </p>
          </div>
          
          <div className={`transition-all duration-500 delay-300 transform ${
            isAnimating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="mr-2 text-amber-500" size={20} />
              Important Note
            </h3>
            <p className="mt-2 text-gray-600 pl-7">
              Please ensure you have a stable internet connection and enough time to 
              complete the test in one sitting. You cannot pause the test once started.
            </p>
          </div>
          
          <div className={`transition-all duration-500 delay-400 transform ${
            isAnimating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <XCircle className="mr-2 text-red-500" size={20} />
              Test Termination
            </h3>
            <p className="mt-2 text-gray-600 pl-7">
              Your test will be automatically submitted under the following conditions:
            </p>
            <ul className="mt-2 space-y-1 text-gray-600 pl-12 list-disc">
              <li>Time expires </li>
              <li>Exiting full-screen mode</li>
              <li>Closing or refreshing the browser tab</li>
            </ul>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t flex justify-between items-center space-x-4">
          <button
            onClick={handleDoLater}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
          >
            Do Later
          </button>
          
          <button
            onClick={()=>handleStart()}
            className={`px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-all duration-300 flex items-center ${
              isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Allow and Start
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}