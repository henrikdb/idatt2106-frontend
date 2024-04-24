/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGoalDTO } from '../models/CreateGoalDTO';
import type { GoalDTO } from '../models/GoalDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoalService {
    /**
     * @returns GoalDTO OK
     * @throws ApiError
     */
    public static createGoal({
        requestBody,
    }: {
        requestBody: CreateGoalDTO,
    }): CancelablePromise<GoalDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/goal/createGoal',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GoalDTO OK
     * @throws ApiError
     */
    public static getGoals(): CancelablePromise<Array<GoalDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goal/getGoals',
        });
    }
    /**
     * @returns GoalDTO OK
     * @throws ApiError
     */
    public static getGoal(): CancelablePromise<GoalDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goal/getGoal',
        });
    }
}
