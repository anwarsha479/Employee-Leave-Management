import { useEffect, useState } from 'react';

interface DepartmentFormProps {
  onSubmit: (
    name: string,
    description: string,
  ) => void;

  department?: any;
}

function DepartmentForm({
  onSubmit,
  department,
}: DepartmentFormProps) {
  const [name, setName] =
    useState('');

  const [description, setDescription] =
    useState('');

  useEffect(() => {
    if (department) {
      setName(department.name);

      setDescription(
        department.description,
      );
    }
  }, [department]);

  const handleSubmit = (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    onSubmit(
      name,
      description,
    );

    setName('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mb-4"
    >
      <h4>
        {department
          ? 'Edit Department'
          : 'Create Department'}
      </h4>

      <div className="mb-3">
        <label className="form-label">
          Department Name
        </label>

        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Description
        </label>

        <textarea
          className="form-control"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value,
            )
          }
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        {department
          ? 'Update Department'
          : 'Save Department'}
      </button>
    </form>
  );
}

export default DepartmentForm;