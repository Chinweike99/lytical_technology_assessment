import React, { useState } from 'react';
import { Department } from '../../types';
import Button from '../common/Button';
import DepartmentModal from './DepartmentModal';
import { ArrowDown, ChevronDown, ChevronLeftIcon, Search } from 'lucide-react';

interface DepartmentTableProps {
  departments: Department[];
  loading: boolean;
  onAddDepartment: () => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ 
  departments, 
  loading, 
  onAddDepartment 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const departmentOptions = Array.from(new Set(departments.map(dept => dept.name))).sort();

  const handleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterSelect = (filterValue: string) => {
    setDepartmentFilter(filterValue);
    setFilterDropdownOpen(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setFilterDropdownOpen(false);
  };

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !departmentFilter || dept.name === departmentFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleManage = (department: Department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleBackNavigation = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 border-gray-600 border-8 p-4 md:p-8 max-w-[1600px] max-h-[90vh] md:min-h-[80vh] ">
      <div className="flex flex-col items-center py-4 border-b border-gray-300 sm:flex-row gap-4 justify-between">
        <div className="flex flex-col justify-start gap-1">
          <div 
            className="flex items-center gap-3 text-gray-600 font-medium hover:cursor-pointer hover:text-gray-800 transition-colors" 
            onClick={handleBackNavigation}
          >
            <ChevronLeftIcon className="h-4 w-4"/>
            <span className="text-sm">BACK</span>
          </div>
          <h2 className="text-2xl font-semibold">Department Management</h2>
        </div>
        <Button onClick={onAddDepartment} className="rounded-sm uppercase">
          Add Department
        </Button>
      </div>
      <div className="flex flex-col ">
        
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <div className='flex justify-between  w-full'>
                <div 
              className="w-[150px] flex border border-gray-300 rounded-md px-3 py-2 items-center justify-between hover:cursor-pointer hover:border-gray-400 transition-colors"
              onClick={handleFilterDropdown}
            >
              <span className="text-sm text-gray-600 truncate">
                {departmentFilter || 'Filter'}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 `}/>
            </div>

            <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="text-gray-400 text-xs md:text-sm border-gray-300 hover:border-gray-400 "
          >
            RESET FILTERS
          </Button>
            </div>

            <div className="flex items-center gap-3 border-b border-b-gray-300  px-3 py-2 max-w-[250px] mt-2">
          <Search className="h-4 w-4 text-gray-400"/>
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none focus:ring-0 shadow-none outline-none text-sm"
          />

          
        </div>
        <p className="mt-6 text-xl font-semibold text-gray-600">
            {departments.length} Department(s)
        </p>

            {filterDropdownOpen && (
              <div className="absolute top-10 mt-1 w-full max-w-[250px] bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="py-1 ">
                  <div className="flex items-center gap-3  rounded-md px-3 py-2 max-w-[250px] mt-2">
                    <Search className="h-4 w-4 text-gray-400"/>
                    <input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border-none focus:ring-0 shadow-none outline-none text-sm"
                    />
                    </div>
                    <hr className='bg-gray-300 text-gray-200'/>
                    <p className='px-2 py-2'>On Department</p>
                  
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {(searchTerm || departmentFilter) && (
        <div className="text-sm text-gray-600">
          Showing {filteredDepartments.length} of {departments.length} departments
          {searchTerm && ` matching "${searchTerm}"`}
          {departmentFilter && ` in "${departmentFilter}"`}
        </div>
      )}

      {/* Department Table */}
      <div className="overflow-x-auto mb-6">
  <table className="min-w-full border-collapse divide-y divide-gray-200">
    {/* ---------- HEADERS ---------- */}
    <thead className="">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide">
          <div className="flex items-center gap-1">
            <span>Name</span>
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide">
          <div className="flex items-center gap-1">
            <span>Department Info</span>
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide">
          <div className="flex items-center gap-1">
            <span>Roles</span>
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide">
          <div className="flex items-center gap-1">
            <span>Members</span>
            <ArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide">
          Action
        </th>
      </tr>
    </thead>

    {/* ---------- BODY ---------- */}
    <tbody className="divide-y divide-gray-200">
      {filteredDepartments.map((department) => (
        <tr
          key={department.id}
          className="hover:bg-gray-50 transition-colors"
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="font-medium text-gray-900">{department.name}</div>
          </td>
          <td className="px-6 py-4">
            <div
              className="text-sm text-gray-700 line-clamp-2"
              title={department.description}
            >
              {department.description}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {department.roles?.length || 0}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {department.members || 0}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              onClick={() => handleManage(department)}
              className="rounded-md cursor-pointer border border-blue-600 px-3 py-2 text-xs font-semibold uppercase text-blue-600 hover:bg-blue-100 transition-colors"
            >
              Manage
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

    {filteredDepartments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
        {searchTerm || departmentFilter
            ? "No departments found matching your criteria"
            : "No departments found"}
        </div>
    )}
    </div>

      {isModalOpen && selectedDepartment && (
        <DepartmentModal 
          department={selectedDepartment} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default DepartmentTable;