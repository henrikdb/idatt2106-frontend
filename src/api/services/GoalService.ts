/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGoalDTO } from '../models/CreateGoalDTO';
import type { GoalDTO } from '../models/GoalDTO';
import type { MarkChallengeDTO } from '../models/MarkChallengeDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoalService {
    /**
     * Get goals
     * Get the goals of the authenticated user
     * @returns GoalDTO Successfully retrieved the goals
     * @throws ApiError
     */
    public static getGoals(): CancelablePromise<Array<GoalDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goals',
        });
    }
    /**
     * Create a goal
     * Create a new goal
     * @returns GoalDTO Successfully created a goal
     * @throws ApiError
     */
    public static createGoal({
        requestBody,
    }: {
        requestBody: CreateGoalDTO,
    }): CancelablePromise<GoalDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/goals',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a challenge
     * Update a challenge day as completed
     * @returns any Successfully updated the challenge
     * @throws ApiError
     */
    public static updateChallenge({
        requestBody,
    }: {
        requestBody: MarkChallengeDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/goals/update-challenge',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Day is already completed or day outside of range`,
            },
        });
    }
    /**
     * Update challenge saving amount
     * Update the challenge saving amount
     * @returns any Successfully updated the challenge
     * @throws ApiError
     */
    public static updateChallengeAmount({
        requestBody,
    }: {
        requestBody: MarkChallengeDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/goals/update-challenge-amount',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a challenge
     * Update a challenge day as completed
     * @returns any Successfully updated the challenge
     * @throws ApiError
     */
    public static getGoal({
        id,
    }: {
        id: number,
    }): CancelablePromise<GoalDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goals/{id}',
            query: {
                'id': id,
            },
        });
    }
}
