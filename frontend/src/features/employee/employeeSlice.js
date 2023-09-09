import {apiSlice} from '../../app/api/apiSlice'

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees:builder.query({
            query:() => '/employees',
            keepUnusedDataFor:5, // default is 60
        })
    })
})

export const {useGetEmployeesQuery} = employeeSlice;