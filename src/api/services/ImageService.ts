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
        formData,
    }: {
        formData?: {
            file: Blob;
        },
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/images',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Retrieve an image
     * Retrieve an image from the server
     * @returns binary Successfully retrieved the image
     * @throws ApiError
     */
    public static getImage({
        id,
    }: {
        id: number,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/images/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Image not found`,
            },
        });
    }
}
