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
        }
    }
})

export const {signInStart, signInSucces,signInFailure,signOut,updateUserSuccess} = userSlice.actions;
export default userSlice.reducer