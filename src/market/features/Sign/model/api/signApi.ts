import { marketApi } from 'market/shared/api/marketApi';
import { Client } from 'market/models/client/types/Client';

export type RequestClient = Partial<Pick<Client, 'name' | 'password'>>

export const signApi = marketApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<Client, RequestClient>({
            query: (args) => {
                return {
                    url: '/client/sign/in',
                    method: 'POST',
                    credentials: 'include',
                    body: args,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
            },
        }),
        signUp: build.mutation<Client, RequestClient>({
            query: (args) => ({
                url: '/client/sign/up',
                method: 'POST',
                credentials: 'include',
                body: args,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        signOut: build.mutation<void, undefined>({
            query: () => ({
                url: '/client/sign/out',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        getMe: build.query<Client, undefined>({
            query: () => ({
                url: '/client/me',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        updateMe: build.mutation<Client, Partial<Client>>({
            query: (args) => ({
                url: '/client/me/update',
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(args),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        })
    }),
});

export const useSignIn = signApi.useSignInMutation;
export const useSignUp = signApi.useSignUpMutation;
export const useSignOut = signApi.useSignOutMutation;
export const useGetMe = signApi.useGetMeQuery;
export const useUpdateMe = signApi.useUpdateMeMutation;