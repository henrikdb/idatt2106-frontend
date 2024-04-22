/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardDTO } from '../models/LeaderboardDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardService {
    /**
     * @returns LeaderboardDTO OK
     * @throws ApiError
     */
    public static getLeaderboard({
        type,
        filter,
        entryCount = 10,
    }: {
        type: string,
        filter: string,
        entryCount?: number,
    }): CancelablePromise<LeaderboardDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leaderboard',
            query: {
                'type': type,
                'filter': filter,
                'entryCount': entryCount,
            },
        });
    }
    /**
     * @returns LeaderboardDTO OK
     * @throws ApiError
     */
    public static getSurrounding({
        type,
        filter,
        entryCount = 10,
    }: {
        type: string,
        filter: string,
        entryCount?: number,
    }): CancelablePromise<LeaderboardDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/leaderboard/surrounding',
            query: {
                'type': type,
                'filter': filter,
                'entryCount': entryCount,
            },
        });
    }
}
