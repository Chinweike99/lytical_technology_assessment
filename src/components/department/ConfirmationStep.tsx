import React from "react";
import { DepartmentFormData } from "../../utils/validation";
import { Role } from "../../types";
import Button from "../common/Button";

interface ConfirmationStepProps {
  departmentData: DepartmentFormData;
  selectedRoles: Role[];
  onConfirm: () => void;
  onBack: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  departmentData,
  selectedRoles,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="flex flex-col max-w-[1600px] max-h-[90vh] md:min-h-[70vh]">
      <div className="flex-1 space-y-6 pt-6">
        <div className="flex flex-col text-start rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Confirmation</h3>

          <div>
            <table className="w-full rounded-lg text-left">
              <tbody className="divide-y divide-gray-200">
                <tr className="border-none">
                  <td className="px-4 py-3 text-sm text-end text-gray-500">
                    Department Name
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {departmentData.name}
                  </td>
                </tr>

                <tr className="border-none">
                  <td className="px-4 py-3 text-sm text-end text-gray-500">
                    Department Info
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {departmentData.description}
                  </td>
                </tr>

                <tr className="border-none">
                    <td className="px-4 py-3  text-sm text-end text-gray-500 align-top">
                        Team Roles
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-700">
                        {selectedRoles.length > 0 ? (
                        <div>
                            <div>{selectedRoles[0].name}</div>

                            {selectedRoles.slice(1).length > 0 && (
                            <ul className="mt-1 space-y-1">
                                {selectedRoles.slice(1).map((role) => (
                                <li key={role.id}>{role.name}</li>
                                ))}
                            </ul>
                            )}
                        </div>
                        ) : (
                        <span className="text-gray-400">No roles selected</span>
                        )}
                    </td>
                    </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="mt-auto bg-white flex gap-4 items-center justify-end p-6 border-t border-gray-200">
        <Button
          variant="secondary"
          onClick={onBack}
          className="bg-white hover:bg-gray-50 text-gray-700"
        >
          BACK
        </Button>
        <Button onClick={onConfirm} className="cursor-pointer px-6 rounded-sm">
          FINISH
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
