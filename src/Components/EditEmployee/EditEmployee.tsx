import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../Store/store";
import { editEmployee } from "../../Slices/employeeSlice";
import "./EditEmployee.css";

function EditEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get parameters from the URL
  const { id } = useParams();
  const employeeId = id ? parseInt(id, 0) : undefined; // Parse employee ID from params

  // select data from the Redux store
  const employee = useSelector((state: RootState) =>
    employeeId
      ? state.employee.employees.find((e) => e.id === employeeId)
      : undefined
  );

  // State variables to manage form inputs
  const [fullname, setFullName] = useState(employee?.fullname || "");
  const [birthdate, setBirthdate] = useState(employee?.birthdate || "");
  const [department, setDepartment] = useState(employee?.department || "");
  const [experience, setExperience] = useState(employee?.experience || "");

   // state for error message
   const [errorMessage, setErrorMessage] = useState('');

    // Regular expression to match only alphabetic characters
    const alphabeticRegex = /^[A-Za-z ]+$/;
    
   // useEffect hook to populate form fields with employee data when component mounts
  useEffect(() => {
    if (employee) {
      setFullName(employee.fullname);
      setBirthdate(employee.birthdate);
      setDepartment(employee.department);
      setExperience(employee.experience);
    }
  }, [employee]);

  // function to handle edit employee form submission
  const handleEditEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fullname contains only alphabetic characters
    if (!alphabeticRegex.test(fullname)) {
      setErrorMessage("Please enter a valid full name containing only alphabetic characters.");
      return;
  }

    if (employeeId) {
      dispatch(
        editEmployee({
          id: employeeId,
          fullname,
          birthdate,
          department,
          experience,
        })
      );
      // navigate to list page
      navigate("/list");
    }
  };

    // Function to handle changes in the fullname input
    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the fullname state
      setFullName(e.target.value);

      // Check if fullname contains only alphabetic characters
      if (!alphabeticRegex.test(e.target.value)) {
          setErrorMessage("Please enter a valid full name containing only alphabetic characters.");
      } else {
          // Clear error message if fullname is valid
          setErrorMessage("");
      }
  };

      // Determine if the button should be disabled
      const isButtonDisabled = !!errorMessage || !fullname || !birthdate || !department || !experience;

  // Render
  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleEditEmployee}>
        {/* name */}
        <label htmlFor="fullname">Name<span className="star">*</span></label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your full name"
          value={fullname}
          onChange={handleFullNameChange}
          required
        />

        {/* Display error message if exists */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Date of birth */}
        <label htmlFor="dob">Date of birth<span className="star">*</span></label>
        <input
          type="date"
          id="dob"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        {/* Department */}
        <label htmlFor="department">Department<span className="star">*</span></label>
        <input
          type="text"
          id="department"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        {/* Experience */}
        <label htmlFor="experience">Experience<span className="star">*</span></label>
        <input
          type="number"
          id="experience"
          step="1"
          min="0"
          value={experience}
          placeholder="Enter your experience"
          onChange={(e) => setExperience(e.target.value)}
          required
        />
      
      {/* submit */}
        <input type="submit" className="submit-btn" value="Save Changes" disabled={isButtonDisabled}/>
      </form>
    </div>
  );
}

export default EditEmployee;
