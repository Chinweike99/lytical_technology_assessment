import React from 'react';
import { motion } from 'framer-motion';
import { Step } from '../../types';

interface StepIndicatorProps {
  currentStep: Step;
  steps: { number: Step; title: string }[];
  onStepClick?: (step: Step) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps, onStepClick }) => {
  return (
    <div className="flex w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLastStep = index === steps.length - 1;
        const isClickable = isCompleted && onStepClick;

        const isVisibleOnSmall = isActive;

        return (
          <div
            key={step.number}
            className={`flex items-center ${!isLastStep ? 'flex-1' : ''} 
              ${isVisibleOnSmall ? 'flex' : 'hidden'} md:flex`}
          >
            {/* Step circle + text */}
            <div className="flex items-center gap-2 z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? '#2563eb' : isCompleted ? '#10b981' : '#e5e7eb',
                  color: isActive || isCompleted ? 'white' : '#6b7280',
                }}
                className={`w-4 h-4 rounded-full flex items-center justify-center font-semibold transition-colors duration-300 ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
                onClick={() => isClickable && onStepClick(step.number)}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 bg-blue-500 rounded-full text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[10px] font-semibold"
                  >
                    {step.number}
                  </motion.span>
                )}
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm font-medium ${
                  isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-500'
                } ${isClickable ? 'cursor-pointer' : ''}`}
                onClick={() => isClickable && onStepClick(step.number)}
              >
                {step.title}
              </motion.span>
            </div>

            {!isLastStep && (
              <div className="hidden md:flex flex-1 items-center">
                <div
                  className={`h-0.5 w-full ml-1 transition-colors duration-500 ${
                    isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
