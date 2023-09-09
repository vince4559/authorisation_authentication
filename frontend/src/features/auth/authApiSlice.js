// this can also be called the loginApiSlice

import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder => ({
        login:builder.mutation({
            query:Credentials => ({
                url: '/login',  //login //signUp
                method: 'POST',
                body:{...Credentials}
            })
        })
    })
});

export const {useLoginMutation} = authApiSlice