import { createSlice, PayloadAction } from "@reduxjs/toolkit";


//Employee
interface Employee{
    id: number,
    fullname: string,
    birthdate: string, 
    department: string,
    experience: string
}

//Employee state
interface EmployeeState{
    employees: Employee[];
}

// Fetch employees from localStorage or initialize as empty array if not present
const initialState: EmployeeState = {
    employees: JSON.parse(localStorage.getItem('employees') || '[]')
}

//Redux slice for managing employee data
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{

         // Push the new employee to the state
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
            localStorage.setItem('employees', JSON.stringify(state.employees));
          },

        // Update the employee data 
        editEmployee: (state, action: PayloadAction<Employee>) =>{
            const index = state.employees.findIndex(
                (e)=>e.id === action.payload.id
            );
            if(index !== -1){
                state.employees[index] = action.payload;
                localStorage.setItem('employees', JSON.stringify(state.employees));
            }
        },

        // Delete an existing employee
        deleteEmployee: (state, action: PayloadAction<number>) => {
            const index = state.employees.findIndex((e) => e.id === action.payload);
            if (index !== -1) {
              state.employees.splice(index, 1);
              localStorage.setItem("employees", JSON.stringify(state.employees));
            }
        },
    }
})

export const {addEmployee, editEmployee, deleteEmployee} = employeeSlice.actions
export default employeeSlice.reducer;