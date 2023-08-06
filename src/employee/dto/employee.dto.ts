// import joi from 'joi';

// export const employeeCreateSchema = Joi.object({
//   id: Joi.number().required(),
//   name: Joi.string().required(),
//   age: Joi.number().required(),
// });

export class EmployeeDTO {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: string;
  jobId: string;
  managerId: number;
  salary: number;
  departmentId: number;
}
