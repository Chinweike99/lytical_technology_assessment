import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from '../../types';
import { DepartmentFormData } from '../../utils/validation';
import { Role } from '../../types';
import StepIndicator from '../common/StepIndicator';
import DepartmentForm from './DepartmentForm';
import RoleManagement from './RoleManagement';
import ConfirmationStep from './ConfirmationStep';
import Button from '../common/Button';

import { useRoles } from '../../hooks/userRoles';

interface CreateDepartmentWizardProps {
  onClose: () => void;
  onSubmit: (data: DepartmentFormData, roles: Role[]) => Promise<void>;
}

const CreateDepartmentWizard: React.FC<CreateDepartmentWizardProps> = ({ onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [departmentData, setDepartmentData] = useState<DepartmentFormData | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { roles: availableRoles, loading: rolesLoading } = useRoles();

  const steps = [
    { number: 1 as Step, title: 'Name & Description' },
    { number: 2 as Step, title: 'Add Roles' },
    { number: 3 as Step, title: 'Confirmation' },
  ];

  const handleDepartmentSubmit = (data: DepartmentFormData) => {
    setDepartmentData(data);
    setCurrentStep(2);
  };

  const handleAddRole = (role: Role) => {
    if (!selectedRoles.find(r => r.id === role.id)) {
      setSelectedRoles(prev => [...prev, role]);
    }
  };

  const handleRemoveRole = (roleId: string) => {
    setSelectedRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const handleFinish = async () => {
    if (!departmentData) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(departmentData, selectedRoles);
      onClose();
    } catch (error) {
      console.error('Failed to create department:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep((currentStep + 1) as Step);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step);
  };

  const stepComponents = {
    1: <DepartmentForm onSubmit={handleDepartmentSubmit} />,
    2: (
      <RoleManagement
        availableRoles={availableRoles}
        selectedRoles={selectedRoles}
        onAddRole={handleAddRole}
        onRemoveRole={handleRemoveRole}
      />
    ),
    3: (
      <ConfirmationStep
        departmentData={departmentData!}
        selectedRoles={selectedRoles}
        onConfirm={handleFinish}
        onBack={prevStep}
      />
    ),
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white border-8 shadow-xl w-full max-w-[1600px] max-h-[90vh] md:min-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header - Fixed at top */}
        <div className="px-6 pt-8 pb-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="font-semibold text-gray-600 text-2xl">
            {currentStep === 3 ? "Create Team" : "Create Department"}
        </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-[12px]">CANCEL</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <StepIndicator currentStep={currentStep} steps={steps} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: currentStep > 1 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentStep > 1 ? -50 : 50 }}
                transition={{ duration: 0.3 }}
              >
                {stepComponents[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


        {currentStep === 2 && (
  <div className="flex-shrink-0 bg-white flex gap-4 items-center justify-end p-6 border-t border-gray-200">
    <Button 
      variant="secondary" 
      className="bg-white hover:bg-white text-gray-700"
      onClick={prevStep}
    >
      BACK
    </Button>
    
    <Button 
      onClick={nextStep}
      disabled={selectedRoles.length === 0 || isSubmitting}
      className="cursor-pointer"
    >
      NEXT
    </Button>
  </div>
)}

      </motion.div>
    </div>
  );
};

export default CreateDepartmentWizard;