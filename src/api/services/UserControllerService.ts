/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileDTO } from '../models/ProfileDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * Update profile
     * Update the profile of the authenticated user
     * @returns UserDTO Successfully updated profile
     * @throws ApiError
     */
    public static update({
        requestBody,
    }: {
        requestBody: UserUpdateDTO,
    }): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user
     * Get user information
     * @returns UserDTO Successfully got user
     * @throws ApiError
     */
    public static getUser({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Get profile
     * Get user profile
     * @returns ProfileDTO Successfully got profile
     * @throws ApiError
     */
    public static getProfile({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<ProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}/profile',
            path: {
                'userId': userId,
            },
        });
    }
}
