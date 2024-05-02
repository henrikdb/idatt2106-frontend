/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RedirectService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static consumeCallback({
        state,
    }: {
        state: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/redirect',
            query: {
                'state': state,
            },
        });
    }
}
