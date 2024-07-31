import { marketApi } from 'market/shared/api/marketApi';

interface Args {
    planetId: number,
    density: number
}
export type Point = [number, number, number]
export type ResponseData = Array<Array<[Point, Point, Point]>>

const plotsApi = marketApi.injectEndpoints({
    endpoints: (build) => ({
        drawPlots: build.mutation<ResponseData, Args & {points: Point[]}>({
            query: ({planetId, ...otherArgs}) => ({
                url: `planets/${planetId}/plots/draw`,
                body: otherArgs,
                method: "PUT"
            }),
        }),
        drawRandomPlots: build.query<ResponseData, Args & {count: number}>({
            query: ({planetId, ...otherArgs}) => ({
                url: `planets/${planetId}/plots/draw/random`,
                params: otherArgs,
                method: "PUT"
            }),
        }),
    }),
});

export const useDrawPlots = plotsApi.useDrawPlotsMutation;
export const useDrawRandowPlots = plotsApi.useDrawRandomPlotsQuery;
