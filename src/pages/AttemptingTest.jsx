import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, HelpCircle, AlertCircle, X, ArrowLeft, Eye, Award } from 'lucide-react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import API from '../utils/API';
export default function AttemptingTest() {
    const {testId} = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showingResults, setShowingResults] = useState(false);
  const [viewingSolution, setViewingSolution] = useState(null);
  const containerRef = useRef(null);
  let initialtime;
  // Fetch test data
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setIsLoading(true);
        const response = await API.post(`/api/v1/gemini/getTestById`,{
            testId: testId
        });
        console.log(response.data.test)
        setTestData(response.data.test);
        setTimeLeft(response.data.test.durationSeconds)
        initialtime=response.data.test.durationSeconds;
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => setFadeIn(true), 100);
        }, 1000);
      } catch (err) {
        console.error("Error fetching test data:", err);
        setError("Failed to load test. Please try again later.");
        setIsLoading(false);
      }
    };

    if (testId) {
      fetchTestData();
    }
  }, [testId]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isDocFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isDocFullscreen);
      
      // If exited fullscreen and test was in progress (not viewing results), submit the test
      if (!isDocFullscreen && !isLoading && !testCompleted) {
        handleSubmitTest();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isLoading, testCompleted]);

  // Request fullscreen when component mounts and not loading
  useEffect(() => {
    if (!isLoading && !testCompleted) {
      requestFullscreen();
    }
  }, [isLoading, testCompleted]);

  // Timer effect
  useEffect(() => {
    if (isLoading || !isFullscreen || testCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isLoading, isFullscreen, testCompleted]);

  const requestFullscreen = async () => {
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Error attempting to enable full-screen mode:", error);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    const answerKey = String.fromCharCode(65 + answerIndex); // Convert to A, B, C, D
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerKey
    }));
  };

  const handleSubmitTest = () => {
    // Exit fullscreen
    exitFullscreen();
    
    // Calculate results
    if (testData && testData.moduleData) {
      const results = calculateResults(answers, testData.moduleData);
      setTestResults(results);
      setTestCompleted(true);
      
      // Save results to backend (optional)
      // saveResultsToBackend(results);
    }
  };

  const calculateResults = (userAnswers, questions) => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    const detailedResults = questions.map(q => {
      const userAnswer = userAnswers[q._id];
      const isCorrect = userAnswer === q.answer;
      
      if (!userAnswer) {
        unattempted++;
        return { question: q, userAnswer: null, isCorrect: false };
      } else if (isCorrect) {
        correct++;
        return { question: q, userAnswer, isCorrect: true };
      } else {
        incorrect++;
        return { question: q, userAnswer, isCorrect: false };
      }
    });
    
    return {
      score: correct,
      totalQuestions: questions.length,
      correct,
      incorrect,
      unattempted,
      detailedResults,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.moduleData.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setFadeIn(true);
      }, 300);
    }
  };

  const restartTest = () => {
    setAnswers({});
    setTimeLeft(initialtime);
    setTestCompleted(false);
    setShowingResults(false);
    setViewingSolution(null);
    setCurrentQuestionIndex(0);
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100);
  };

  const viewDetailedResults = () => {
    setShowingResults(true);
  };

  const closeDetailedResults = () => {
    setShowingResults(false);
    setViewingSolution(null);
  };

  const viewSolution = (index) => {
    setViewingSolution(index);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div ref={containerRef} className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Preparing your test...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h2 className="text-xl font-semibold mt-4">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Make sure we have test data
  if (!testData || !testData.moduleData || testData.moduleData.length === 0) {
    return (
      <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <HelpCircle className="mx-auto text-gray-400" size={48} />
          <h2 className="text-xl font-semibold mt-4">Test Not Found</h2>
          <p className="mt-2 text-gray-600">The test data could not be loaded. Please try again later.</p>
          <button 
            onClick={() => window.location.href = '/tests'} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Return to Test Collection
          </button>
        </div>
      </div>
    );
  }

  // Test Results screen
  if (testCompleted && !showingResults) {
    return (
      <div ref={containerRef} className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
          <div className="font-medium text-gray-700 flex items-center">
            <ArrowLeft 
              className="mr-2 cursor-pointer hover:text-indigo-600" 
              size={20} 
              onClick={() => window.location.href = '/'} 
            />
            {testData.moduleName} - Test Results
          </div>
        </div>

        <div className="flex-grow p-6 md:p-8 flex flex-col max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                testResults.percentage >= 70 
                  ? 'bg-green-100' 
                  : testResults.percentage >= 40 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
              }`}>
                <Award 
                  size={48} 
                  className={`${
                    testResults.percentage >= 70 
                      ? 'text-green-600' 
                      : testResults.percentage >= 40 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`} 
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Test Complete!
              </h2>
              <p className="text-gray-600 mt-1">
                You've completed the {testData.moduleName} test
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-2xl font-bold">{testResults.percentage}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-green-600">Correct</p>
                <p className="text-2xl font-bold text-green-700">{testResults.correct}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-sm text-red-600">Incorrect</p>
                <p className="text-2xl font-bold text-red-700">{testResults.incorrect}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Unattempted</p>
                <p className="text-2xl font-bold text-gray-700">{testResults.unattempted}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
              <button
                onClick={viewDetailedResults}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Eye size={18} className="mr-2" />
                View Detailed Results
              </button>
              <button
                onClick={restartTest}
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                Retake Test
              </button>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-medium text-indigo-800 mb-2">Performance Analysis</h3>
            <p className="text-gray-700 text-sm">
              {testResults.percentage >= 80 
                ? "Excellent performance! You've mastered this subject matter."
                : testResults.percentage >= 70 
                  ? "Great job! You have a solid understanding of the material."
                  : testResults.percentage >= 60 
                    ? "Good effort. With a bit more practice, you'll improve your score."
                    : testResults.percentage >= 40 
                      ? "You're on the right track, but need more practice to strengthen your understanding."
                      : "More study is needed to improve your understanding of this material."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Detailed Results View
  if (testCompleted && showingResults) {
    return (
      <div ref={containerRef} className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
          <div className="font-medium text-gray-700 flex items-center">
            <ArrowLeft 
              className="mr-2 cursor-pointer hover:text-indigo-600" 
              size={20} 
              onClick={closeDetailedResults}
            />
            {testData.moduleName} - Detailed Results
          </div>
        </div>

        <div className="flex-grow p-6 md:p-8 flex flex-col max-w-4xl mx-auto w-full">
          {viewingSolution !== null ? (
            // Solution View
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {viewingSolution + 1} Solution
                </h3>
                <button 
                  onClick={() => setViewingSolution(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded">
                    {testResults.detailedResults[viewingSolution].question.level.toUpperCase()}
                  </span>
                  {testResults.detailedResults[viewingSolution].question.previousUsage && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded ml-2">
                      {testResults.detailedResults[viewingSolution].question.previousUsage}
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">
                  {testResults.detailedResults[viewingSolution].question.question}
                </h4>

                {/* Options with correct/incorrect highlighting */}
                <div className="space-y-3 mb-6 text-black">
                  {testResults.detailedResults[viewingSolution].question.options.map((option, index) => {
                    const optionKey = String.fromCharCode(65 + index); // A, B, C, D
                    const isUserAnswer = testResults.detailedResults[viewingSolution].userAnswer === optionKey;
                    const isCorrectAnswer = testResults.detailedResults[viewingSolution].question.answer === optionKey;
                    
                    let borderClass = "border-gray-200";
                    let bgClass = "";
                    
                    if (isCorrectAnswer) {
                      borderClass = "border-green-600";
                      bgClass = "bg-green-50";
                    } else if (isUserAnswer) {
                      borderClass = "border-red-600";
                      bgClass = "bg-red-50";
                    }
                    
                    return (
                      <div 
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg ${borderClass} ${bgClass}`}
                      >
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-3 ${
                          isCorrectAnswer 
                            ? 'border-green-600 bg-green-600 text-white' 
                            : isUserAnswer 
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-300'
                        }`}>
                          {(isCorrectAnswer || isUserAnswer) && <CheckCircle size={14} />}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium mr-2">{optionKey}.</span>
                          <span dangerouslySetInnerHTML={{ __html: option }} />
                        </div>
                        {isCorrectAnswer && (
                          <span className="text-green-600 text-sm font-medium ml-2">Correct Answer</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="text-red-600 text-sm font-medium ml-2">Your Answer</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation (if available - this would require adding an explanation field to your Test schema) */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-1">Explanation</h5>
                  <p className="text-gray-700 text-sm">
                    {testResults.detailedResults[viewingSolution].question.explanation || 
                     `The correct answer is ${testResults.detailedResults[viewingSolution].question.answer}. 
                      ${testResults.detailedResults[viewingSolution].question.options[
                        testResults.detailedResults[viewingSolution].question.answer.charCodeAt(0) - 65
                      ]}`}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setViewingSolution(prev => Math.max(0, prev - 1))}
                  disabled={viewingSolution === 0}
                  className={`px-4 py-2 flex items-center ${viewingSolution === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-600 hover:bg-indigo-50'} rounded transition-colors`}
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Previous Solution
                </button>
                <button
                  onClick={() => setViewingSolution(prev => Math.min(testResults.detailedResults.length - 1, prev + 1))}
                  disabled={viewingSolution === testResults.detailedResults.length - 1}
                  className={`px-4 py-2 flex items-center ${viewingSolution === testResults.detailedResults.length - 1
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-600 hover:bg-indigo-50'} rounded transition-colors`}
                >
                  Next Solution
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            // Results List View
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Question-by-Question Results
              </h3>
              
              <div className="divide-y">
                {testResults.detailedResults.map((result, index) => (
                  <div key={index} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        result.isCorrect 
                          ? 'bg-green-100 text-green-700' 
                          : result.userAnswer === null
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="max-w-xl">
                        <p className="text-gray-800 font-medium truncate">
                          {result.question.question}
                        </p>
                        <div className="flex items-center text-sm mt-1">
                          <span className="text-gray-500 mr-2">Your answer:</span>
                          <span className={`font-medium ${
                            result.isCorrect 
                              ? 'text-green-600' 
                              : result.userAnswer === null
                                ? 'text-gray-400 italic'
                                : 'text-red-600'
                          }`}>
                            {result.userAnswer || 'Not answered'}
                          </span>
                          {!result.isCorrect && result.userAnswer && (
                            <span className="text-green-600 ml-2">
                              Correct: {result.question.answer}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => viewSolution(index)}
                      className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      View Solution
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={closeDetailedResults}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Back to Summary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Test Taking view (default)
  const currentQuestion = testData.moduleData[currentQuestionIndex];
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      {/* Header with timer and progress */}
      <div className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <div className="font-medium text-gray-700">
          {testData.moduleName}
        </div>
        
        <div className="flex space-x-6 items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Question:</span>
            <span className="font-semibold">{currentQuestionIndex + 1}/{testData.moduleData.length}</span>
          </div>
          
          <div className={`flex items-center ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
            <Clock className="mr-1" size={18} />
            <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
          </div>
          
          <button
            onClick={handleSubmitTest}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
          >
            Submit Test
          </button>
        </div>
      </div>
      
      {/* Question area */}
      <div className="flex-grow p-6 md:p-8 flex flex-col max-w-5xl mx-auto w-full">
        <div 
          className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-opacity duration-300 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Question text */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded">
                {currentQuestion.level.toUpperCase()}
              </span>
              {currentQuestion.previousUsage && (
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded ml-2">
                  {currentQuestion.previousUsage}
                </span>
              )}
            </div>
            <h3 className="text-xl font-medium text-gray-800">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h3>
          </div>
          
          {/* Options */}
          <div className="space-y-3 text-black">
            {currentQuestion.options.map((option, index) => {
              const optionKey = String.fromCharCode(65 + index); // A, B, C, D
              const isSelected = answers[currentQuestion._id] === optionKey;
              
              return (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion._id, index)}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'}`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-3 ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-600 text-white' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckCircle size={14} />}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium mr-2">{optionKey}.</span>
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="bg-white border-t p-4 flex justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 flex items-center ${currentQuestionIndex === 0 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-indigo-600 hover:bg-indigo-50'} rounded transition-colors`}
        >
          <ChevronLeft size={20} className="mr-1" />
          Previous
        </button>
        
        <div className="flex space-x-1 overflow-x-auto max-w-md pb-1">
          {Array.from({ length: testData.moduleData.length }).map((_, index) => {
            const isAnswered = !!answers[testData.moduleData[index]._id];
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={index}
                onClick={() => {
                  setFadeIn(false);
                  setTimeout(() => {
                    setCurrentQuestionIndex(index);
                    setFadeIn(true);
                  }, 300);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  isCurrent 
                    ? 'bg-indigo-600 text-white' 
                    : isAnswered 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === testData.moduleData.length - 1}
          className={`px-4 py-2 flex items-center ${currentQuestionIndex === testData.moduleData.length - 1
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-indigo-600 hover:bg-indigo-50'} rounded transition-colors`}
        >
          Next
          <ChevronRight size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
}