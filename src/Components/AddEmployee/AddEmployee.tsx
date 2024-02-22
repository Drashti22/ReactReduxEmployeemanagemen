import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../Slices/employeeSlice";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

     // State variables for form inputs
    const [fullname, setFullName] = useState('')
    const [birthdate, setBirthdate] = useState('');
    const [department, setDepartment] = useState('');
    const [experience, setExperience] = useState('');

    // state for error message
    const [errorMessage, setErrorMessage] = useState('');

    // Regular expression to match only alphabetic characters
    const alphabeticRegex = /^[A-Za-z ]+$/;

    // Function to handle form submission for add employee
    const handleAddEmployee = (event: React.FormEvent) => {
        event.preventDefault();

        // Check if there's an error message or if any of the required fields are empty
        if (errorMessage || !fullname || !birthdate || !department || !experience) {
            return; // Disable form submission
        }

         // Dispatch addEmployee action with employee data
        dispatch(
            addEmployee({
                id: Date.now(), // Generate unique ID using current timestamp
                fullname,
                birthdate,
                department,
                experience
            }
            )
        )

        // clear input fields after submission
        setFullName("");
        setBirthdate("");
        setDepartment("");
        setExperience("");

        // Clear error message
        setErrorMessage("");

        // navigate to the list page after submission
        navigate('/list')
    }

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

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee} >
                {/* name */}
                <label htmlFor="fullname"> Name<span className="star">*</span></label>
                <input 
                    type="text" 
                    id="fullname" 
                    placeholder="Enter your full name" 
                    value={fullname} 
                    onChange={handleFullNameChange}
                    required/>

                 {/* Display error message if exists */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Date of Birth */}
                <label htmlFor="dob">Date of birth<span className="star">*</span></label>
                <input type="date" 
                    id="dob"
                    value={birthdate}
                    onChange={(e)=>setBirthdate(e.target.value)}
                    required />

                {/* Department */}
                <label htmlFor="department">Department<span className="star">*</span></label>
                <input 
                    type="text" 
                    id="department" 
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                    required />

                {/* Experience */}
                <label htmlFor="experience">Experience<span className="star">*</span></label>
                <input type="number" 
                        id="experience" 
                        step="1" 
                        min="0"
                        value={experience}
                        placeholder="Enter your experience"
                        onChange={(e)=>setExperience(e.target.value)}
                        required />

                {/* submit */}
                <input type="submit" className="submit-btn" disabled={isButtonDisabled} />
            </form>
        </div>
    )
}

export default AddEmployee;