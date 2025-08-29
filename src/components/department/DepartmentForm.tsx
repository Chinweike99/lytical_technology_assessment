import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { departmentSchema, DepartmentFormData } from '../../utils/validation';
import Button from '../common/Button';
import Input from '../common/Input';

interface DepartmentFormProps {
  onSubmit: (data: DepartmentFormData) => void;
  defaultValues?: Partial<DepartmentFormData>;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit, defaultValues }) => {
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
    defaultValues,
  });

  const description = watch('description', '');
  

  const wordCount = description.trim() === '' 
    ? 0 
    : description.trim().split(/\s+/).length;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[1600px] max-h-[90vh] md:min-h-[60vh]"
    >
      <div className="flex-1 space-y-6 p-6 overflow-y-auto">
        <h1 className="font-semibold text-2xl">Name & Description</h1>
        <div className="max-w-[400px] space-y-4">
          <Input
            label="Department Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Department Name"
            className="h-12 bg-gray-10"
          />
          <div className="relative">
            {isTextareaFocused && (
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 z-10">
                Department Info
              </label>
            )}
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-300"
              placeholder="Department Info"
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={() => setIsTextareaFocused(false)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
            <p className="ml-2 text-sm text-gray-500">{wordCount}/100</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto bg-white flex gap-4 items-center justify-end p-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          className="bg-white hover:bg-white text-gray-700"
          disabled={true}
        >
          BACK
        </Button>
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={!isValid}
        >
          NEXT
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;