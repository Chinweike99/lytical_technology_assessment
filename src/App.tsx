import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDepartments } from './hooks/useDepartments';
import { DepartmentFormData } from './utils/validation';
import { Role } from './types';
import DepartmentTable from './components/department/DepartmentTable';
import Button from './components/common/Button';
import CreateDepartmentWizard from './components/department/CreateDepartment';

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { departments, loading, error, addDepartment } = useDepartments();

  const handleCreateDepartment = async (data: DepartmentFormData, roles: Role[]) => {
    await addDepartment({
      ...data,
      roles,
      members: 0,
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Department Management</h1>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DepartmentTable
            departments={departments}
            loading={loading}
            onAddDepartment={() => setIsCreateModalOpen(true)}
          />
        </motion.div>
      </main>

      {isCreateModalOpen && (
        <CreateDepartmentWizard
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateDepartment}
        />
      )}
    </div>
  );
}

export default App;