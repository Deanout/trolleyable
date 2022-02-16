import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { User } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthState {
  currentUser: any;
  loading: boolean;
  error: any;
}

interface UserPayload {
  user: User | null;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  email: string;
}

interface UpdatePasswordPayload {
  password: string;
}

const initialState: AuthState = {
  currentUser: null,
  loading: true,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: UserLoginData) => {
    const response = await auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
    return response;
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (payload: UserLoginData) => {
    const response = await auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: ResetPasswordPayload) => {
    const response = await auth.sendPasswordResetEmail(payload.email);
    return response;
  }
);

export const updateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (payload: ResetPasswordPayload) => {
    const response = await auth.currentUser?.updateEmail(payload.email);
    return response;
  }
);
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (payload: UpdatePasswordPayload) => {
    const response = await auth.currentUser?.updatePassword(payload.password);
    return response;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await auth.signOut();
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return produce(state, (draftState) => {
        draftState.currentUser = action.payload.user;
        draftState.loading = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
          draftState.error = null;
        });
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.currentUser = action.payload.user;
          draftState.loading = false;
          draftState.error = null;
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        return produce(state, (draftState) => {
          draftState.currentUser = null;
          draftState.loading = false;
          draftState.error = action.payload;
        });
      })
      .addCase(logoutUser.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
        });
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.currentUser = null;
          draftState.loading = false;
        });
      })
      .addCase(logoutUser.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(signUpUser.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
        });
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.currentUser = action.payload.user;
          draftState.loading = false;
        });
      })
      .addCase(signUpUser.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(resetPassword.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
        });
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(resetPassword.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(updateUserEmail.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
        });
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(updateUserEmail.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(updateUserPassword.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = true;
        });
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      })
      .addCase(updateUserPassword.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.loading = false;
        });
      });
  },
});

export const { setCurrentUser } = authSlice.actions;

export const selectUser = (state: RootState) =>
  state.auth?.currentUser as User | null;

export const selectLoading = (state: RootState) => state.auth?.loading;

export const selectErrorMessage = (state: RootState) => state.auth?.error;

export default authSlice.reducer;
