import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Stepper from '../components/common/Stepper';
import ResumeDropzone from '../features/resume/ResumeDropzone';
import FilePreviewCard from '../features/resume/FilePreviewCard';
import AnalysisProgressCard from '../features/resume/AnalysisProgressCard';
import ResumeResultView from '../features/resume/ResumeResultView';

const ResumeUploadPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (fileData) => {
    setSelectedFile(fileData);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    setCurrentStep(2);
  };

  const handleAnalysisComplete = () => {
    setCurrentStep(3);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col justify-between bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-1 overflow-hidden">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
          {/* Centered Stepper */}
          <div className="w-full max-w-xl mx-auto">
            <Stepper
              currentStep={currentStep}
              steps={['Upload', 'Analyze', currentStep === 2 ? 'Configure' : 'Results']}
            />
          </div>

          {/* STEP 1: UPLOAD */}
          {currentStep === 1 && (
            <div className="w-full max-w-xl mx-auto bg-white border border-gray-200/80 rounded-2xl p-6 md:p-7 shadow-xs mt-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 stroke-[2]" />
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center tracking-tight mb-1 font-sans">
                Upload your resume
              </h1>
              <p className="text-xs text-gray-500 text-center mb-4">
                Provide your resume to tailor the interview environment.
              </p>

              <ResumeDropzone onFileSelect={handleFileSelect} />

              {selectedFile && (
                <FilePreviewCard
                  fileName={selectedFile.name}
                  fileSize={selectedFile.size}
                  onRemove={handleRemoveFile}
                />
              )}

              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={!selectedFile}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-xs font-geist transition-colors shadow-xs mt-4 flex items-center justify-center"
              >
                Continue to Analysis
              </button>
            </div>
          )}

          {/* STEP 2: ANALYZE */}
          {currentStep === 2 && (
            <div className="w-full max-w-xl mx-auto">
              <AnalysisProgressCard
                fileName={selectedFile?.name}
                fileSize={selectedFile?.size}
                onCancel={() => setCurrentStep(1)}
                onComplete={handleAnalysisComplete}
              />
            </div>
          )}

          {/* STEP 3: RESULTS */}
          {currentStep === 3 && (
            <div className="w-full max-w-5xl mx-auto">
              <ResumeResultView
                onRetry={() => setCurrentStep(1)}
                onStartInterview={() => navigate('/interview/preparation')}
              />
            </div>
          )}

          {/* Back Action (Only on Step 1) */}
          {currentStep === 1 && (
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer tagline={currentStep === 1 ? "Engineered for precision." : "Built for engineers."} />
    </div>
  );
};

export default ResumeUploadPage;
