import React from 'react';
import { Department } from '../../types';
import Button from '../common/Button';

interface DepartmentModalProps {
  department: Department;
  onClose: () => void;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ department, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Department Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Department Name</h3>
            <p className="mt-1 text-lg font-semibold">{department.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900">{department.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Roles ({department.roles.length})</h3>
            <ul className="mt-2 space-y-2">
              {department.roles.map(role => (
                <li key={role.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-gray-500">On {role.department}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Members</h3>
            <p className="mt-1 text-gray-900">{department.members} team members</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">

          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;