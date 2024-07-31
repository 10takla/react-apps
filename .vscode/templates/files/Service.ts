import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface {fileNameUpper}Props {
}

interface ResponseData {

}

export const {fileNameLower} = createAsyncThunk<
    ResponseData,
    {fileNameUpper}Props,
    ThunkConfig<string>
>(
    '/{fileNameLower}',
    async (requestData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;
        
        try {
            const response = await extra.api.post<ResponseData>('', requestData);

            if (!response.data) {
                throw new Error();
            }
            
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
