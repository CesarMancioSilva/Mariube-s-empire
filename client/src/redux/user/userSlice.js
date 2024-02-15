import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    error:null,
    // loading:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSucces:(state,action)=>{
            state.currentUser = action.payload;
            // state.loading = false;
            state.error = null
        },
        signInFailure: (state,action)=>{
            state.error = action.payload;
            // state.loading = false
        },
        signOut:(state)=>{
            state.currentUser = null
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null;
            // state.loading = false;
            state.error = null
        },
        deleteUserFailure:(state,action)=>{
            // state.loading = false;
            state.error = false
        }
    }
})

export const {signInStart, signInSucces,signInFailure,signOut,updateUserSuccess,deleteUserSuccess,deleteUserFailure} = userSlice.actions;
export default userSlice.reducer