/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImageService {
    /**
     * Upload an image
     * Upload an image to the server
     * @returns number Successfully uploaded the image
     * @throws ApiError
     */
    public static uploadImage({
        requestBody,
    }: {
        requestBody?: {
            file: Blob;
        },
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/image/upload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Retrieve an image
     * Retrieve an image from the server
     * @returns string Successfully retrieved the image
     * @throws ApiError
     */
    public static getImage({
        id,
    }: {
        id: number,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/image/{id}',
            path: {
                'id': id,
            },
        });
    }
}
