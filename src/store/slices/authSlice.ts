import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  isAdmin: boolean;
  isReviewer: boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  isReviewer: false,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserRole: (state, action: PayloadAction<{ isAdmin: boolean; isReviewer: boolean }>) => {
      state.isAdmin = action.payload.isAdmin;
      state.isReviewer = action.payload.isReviewer;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isReviewer = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setUserRole, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;