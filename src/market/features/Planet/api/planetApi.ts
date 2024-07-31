import { marketApi } from "src/market/shared/api/marketApi";

interface Args {
    from: number,
    to: number
    search: string
}

export interface Planet {
    id: number,
    name: string
}

const planetApi = marketApi.injectEndpoints({
    endpoints: (build) => ({
        getPlanets: build.query<Planet[], Args>({
            query: (args) => ({
                url: '/planets',
                params: args,
            }),
        }),
        getPlanet: build.query<Planet, number>({
            query: (id) => ({
                url: `/planets/${id}`,
            }),
        }),
    }),
});

export const useGetPlanets = planetApi.useGetPlanetsQuery;
export const useGetPlanet = planetApi.useGetPlanetQuery;
