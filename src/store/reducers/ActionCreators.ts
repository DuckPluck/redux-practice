import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>('http://localhost:3000/users');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(`${e} - не удалось загрузить пользователей`);
        }
    }
)
