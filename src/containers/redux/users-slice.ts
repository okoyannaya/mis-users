import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Интерфейс пользователя
export interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  gender: string;
  role: string;
}

// Интерфейс состояния
interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для загрузки всех пользователей
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    let allUsers: User[] = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      do {
        const response = await fetch(
          `https://reqres.in/api/users?page=${currentPage}&per_page=8`
        );

        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }

        const data = await response.json();
        allUsers = [...allUsers, ...data.data];
        totalPages = data.total_pages;
        currentPage++;
      } while (currentPage <= totalPages);

      return allUsers;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Неизвестная ошибка');
    }
  }
);

// Асинхронный thunk для удаления пользователя
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления пользователя');
      }

      return id; // Возвращаем id удаленного пользователя для обновления состояния
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Неизвестная ошибка');
    }
  }
);

// Слайс
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Для загрузки всех пользователей
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Для удаления пользователя
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Обновляем список пользователей, удаляя пользователя по id
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
