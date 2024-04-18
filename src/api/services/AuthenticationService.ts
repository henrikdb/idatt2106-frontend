/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticationResponse } from '../models/AuthenticationResponse';
import type { LoginRequest } from '../models/LoginRequest';
import type { SignUpRequest } from '../models/SignUpRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * User Signup
     * Sign up a new user
     * @returns AuthenticationResponse Successfully signed up
     * @throws ApiError
     */
    public static signup({
        requestBody,
    }: {
        requestBody: SignUpRequest,
    }): CancelablePromise<AuthenticationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Email already exists`,
            },
        });
    }
    /**
     * User Login
     * Log in with an existing user
     * @returns AuthenticationResponse Successfully logged in
     * @throws ApiError
     */
    public static login({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<AuthenticationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
                404: `User not found`,
            },
        });
    }
}
