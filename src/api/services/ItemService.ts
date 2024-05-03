/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryDTO } from '../models/InventoryDTO';
import type { ItemDTO } from '../models/ItemDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ItemService {
    /**
     * Purchase an item
     * Performs a purchase of the item by the user. Points will be deducted from the user.
     * @returns any Item purchased and added to inventory successfully
     * @throws ApiError
     */
    public static buyItem({
        itemId,
    }: {
        itemId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/item/{itemId}',
            path: {
                'itemId': itemId,
            },
            errors: {
                403: `Insufficient points to purchase the item`,
            },
        });
    }
    /**
     * Get available store items
     * Retrieves all items available in the store and a flag indicating whether the user has purchased each item.
     * @returns ItemDTO List of store items fetched successfully
     * @throws ApiError
     */
    public static getStore(): CancelablePromise<Array<ItemDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/item/store',
        });
    }
    /**
     * Get the active user's inventory items
     * Retrieves a list of all items currently in the inventory of the active user.
     * @returns InventoryDTO List of inventory items fetched successfully
     * @throws ApiError
     */
    public static getInventory(): CancelablePromise<Array<InventoryDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/item/inventory',
        });
    }
    /**
     * Get user inventory items
     * Retrieves a list of all items currently in the inventory of the user.
     * @returns InventoryDTO List of inventory items fetched successfully
     * @throws ApiError
     */
    public static getInventoryByUserId({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<Array<InventoryDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/item/inventory/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
