import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ListEmployee.css";
import { deleteEmployee } from "../../Slices/employeeSlice";

function ListEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
   // Select employees from Redux store
  const employees = useSelector((state: RootState) => state.employee.employees);

  // Function to handle edit button click
  const handleEditClick = (employeeId: number) => {
    navigate(`/edit/${employeeId}`);
  };

  // Function to handle delete button click
  const handleDeleteClick = (employeeId: number, employeeName: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${employeeName}?`);
    if (isConfirmed) {
      // Dispatch delete action if confirmed
      dispatch(deleteEmployee(employeeId));
    }
  };

  // table rows for each employee
  const employeeTableRows = employees.map(employee => (
    <tr key={employee.id}>
      <td>{employee.fullname}</td>
      <td>{employee.department}</td>
      <td>{employee.experience} years</td>
      <td className="action">
        <button className="edit" onClick={() => handleEditClick(employee.id)}><FontAwesomeIcon icon={faPenSquare} /></button>
        <button className="delete" onClick={() => handleDeleteClick(employee.id, employee.fullname)}><FontAwesomeIcon icon={faTrash} /></button>
      </td>
    </tr>
  ));

  // Render
  return (
    <div>
      <h2>List of Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeTableRows}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployee;
