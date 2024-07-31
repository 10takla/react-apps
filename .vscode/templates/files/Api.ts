import { rtkApi } from 'src/shared/api/rtkApi';

interface Args {
}

interface ResponseData {
}

const {fileNameLower}Api = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRequest: build.query<ResponseData, Args>({
            query: (args) => ({
                url: '/',
                params: args,
            }),
        }),
        postRequest: build.mutation<void, Args>({
            query: (arg) => ({
                url: '/',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetRequest = {fileNameLower}Api.useGetRequestQuery;
export const usePostRequest = {fileNameLower}Api.usePostRequestMutation;
