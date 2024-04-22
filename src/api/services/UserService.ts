/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PasswordResetDTO } from '../models/PasswordResetDTO';
import type { ProfileDTO } from '../models/ProfileDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Initiate a password reset
     * Send a password reset mail to the user with the specified email
     * @returns any Successfully initiated a password reset
     * @throws ApiError
     */
    public static resetPassword({
        requestBody,
    }: {
        requestBody: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/reset-password',
            body: requestBody,
            mediaType: 'text/plain',
        });
    }
    /**
     * Confirm a password reset
     * Confirms a password reset using a token and a new password
     * @returns void
     * @throws ApiError
     */
    public static confirmPasswordReset({
        requestBody,
    }: {
        requestBody: PasswordResetDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/confirm-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Invalid token`,
            },
        });
    }
    /**
     * Update a profile
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
     * Get a profile
     * Get the profile of a user
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
    /**
     * Get the authenticated user
     * Get all user information for the authenticated user
     * @returns UserDTO Successfully got user
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }
}
