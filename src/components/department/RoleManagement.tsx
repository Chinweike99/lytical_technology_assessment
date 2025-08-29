import React, { useState } from 'react';
import { Role } from '../../types';
import Button from '../common/Button';
import { ArrowDown, ChevronDown, Search, Trash } from 'lucide-react';
import { assets } from '../../assets/assets';

interface RoleManagementProps {
  availableRoles: Role[];
  selectedRoles: Role[];
  onAddRole: (role: Role) => void;
  onRemoveRole: (roleId: string) => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({
  availableRoles,
  selectedRoles,
  onAddRole,
  onRemoveRole,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  }

  const filteredAvailableRoles = availableRoles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter ? role.department === departmentFilter : true;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(availableRoles.map(role => role.department)));

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartmentFilter(department);
    setSearchModalOpen(false);
  };

  return (
    <div className="space-y-6">
        <h1 className='text-2xl font-bold'>Add Roles</h1>
      <div className="flex justify-between gap-2 items-start sm:items-center">
       <div className='flex flex-col gap-3'>
        <div className=' border-b-3 p-2 border-gray-200 flex justify-between gap-3 items-center max-w-[250px]'>
        <Search className='h-4 w-4'/>
         <input
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border-none focus:ring-0 shadow-none outline-none"
        />
       </div>
        
        <div className='flex justify-between w-full'>
          <div className='relative'>
            <div 
              className='w-[150px] flex border border-gray-300 rounded-md px-3 py-2 items-center justify-between hover:cursor-pointer hover:border-gray-400 transition-colors bg-white'
              onClick={handleSearchModal}
            >
              <span className='text-sm text-gray-600'>
                {departmentFilter || 'Filter'}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 `}/>
            </div>

            {searchModalOpen && (
              <div className='absolute top-full mt-1 w-[250px] flex flex-col shadow-lg z-50 bg-white rounded-lg border border-gray-200'>
                <div className='px-4 py-3 border-b border-gray-200 flex gap-3 items-center'>
                  <Search className='h-4 w-4 text-gray-400'/>
                  <input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border-none focus:ring-0 shadow-none outline-none text-sm"
                  />
                </div>
                <hr className='border-gray-200'/>
                <span className='px-4 py-3 text-gray-500'>On Department</span>
                
              </div>
            )}
          </div>
        </div>
       </div>
          <Button variant="outline" onClick={resetFilters} className='border-none text-gray-200 text-[12px] md:text-base'>
            RESET FILTERS
            </Button>
      </div>

      {searchModalOpen && (
        <div 
          className='fixed inset-0 z-40' 
          onClick={() => setSearchModalOpen(false)}
        />
      )}

      <div className="grid md:grid-cols-2 gap-[90px] md:gap-5 mb-5 w-full">
        <div className="rounded-lg">
          <h3 className="flex flex-col font-semibold text-lg mb-4">
            <span>Available</span>
            <span className='text-gray-400 text-[14px]'>{filteredAvailableRoles.length} Roles</span>
          </h3>
          
          <div className='border border-gray-300 rounded-t-lg h-full '>
          {filteredAvailableRoles.length > 0 ? (
            <div className="mx-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        Role <ArrowDown className='h-4 w-4' />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className=" flex items-center gap-2">
                        On Department(s) <ArrowDown className='h-4 w-4'/>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAvailableRoles.map(role => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{role.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{role.department}</td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => onAddRole(role)}
                          className="text-[12px] md:text-sm p-2 focus:border-none border-none text-white rounded-md bg-blue-700"
                        >
                          ADD
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No roles found</p>
          )}
          </div>
        </div>

        <div className="rounded-lg">
          <h3 className="flex flex-col font-semibold text-lg mb-4">
            <span>In Product Department </span>
            <span className='text-gray-400 text-[14px]'>{selectedRoles.length} Role(s)</span>
          </h3>
          
          <div className='border border-gray-300 rounded-t-lg h-full'>
          {selectedRoles.length > 0 ? (
            <div className="overflow-x-auto ">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        Name <ArrowDown className='h-4 w-4'/>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        On Department(s) <ArrowDown className='h-4 w-4'/>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedRoles.map(role => (
                    <tr key={role.id} className="hover:bg-blue-25">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{role.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{role.department}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onRemoveRole(role.id)}
                          className="text-gray-500 hover:text-gray-600 p-1"
                          title="Remove role"
                        >
                          <Trash className='h-4 w-4'/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center justify-center text-gray-500">
                <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        Name <ArrowDown className='h-4 w-4'/>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        On Department(s) <ArrowDown className='h-4 w-4'/>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedRoles.map(role => (
                    <tr key={role.id} className="hover:bg-blue-25">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{role.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{role.department}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onRemoveRole(role.id)}
                          className="text-gray-500 hover:text-gray-600 p-1"
                          title="Remove role"
                        >
                          <Trash className='h-4 w-4'/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex flex-col justify-center items-center gap-4 mt-10 md:mt-[10rem] text-gray-400'>
              <img src={assets.file} alt="file" />
              <p>You currently don't have any roles in the department.</p>
              </div>
            </div>
          )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoleManagement;