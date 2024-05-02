/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDTO } from '../models/UserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FriendService {
    /**
     * Accept a friend request
     * Accepts a friend request from another user.
     * @returns any Friend request successfully accepted
     * @throws ApiError
     */
    public static acceptFriendRequest({
        friendId,
    }: {
        friendId: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/friends/{friendId}',
            path: {
                'friendId': friendId,
            },
            errors: {
                404: `Friend request not found`,
            },
        });
    }
    /**
     * Delete a friend or cancel a friend request
     * Deletes an existing friend from your friend list or cancels a received friend request.
     * @returns any Friend successfully deleted or friend request cancelled
     * @throws ApiError
     */
    public static deleteFriendOrFriendRequest({
        friendId,
    }: {
        friendId: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/friends/{friendId}',
            path: {
                'friendId': friendId,
            },
            errors: {
                404: `Friend or friend request not found`,
            },
        });
    }
    /**
     * Send a friend request
     * Sends a new friend request to another user. A notification is sent to this user
     * @returns any Friend request successfully created
     * @throws ApiError
     */
    public static addFriendRequest({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friends/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Get all friends
     * Returns a list of all friends.
     * @returns UserDTO Successfully retrieved list of friends
     * @throws ApiError
     */
    public static getFriends(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends',
        });
    }
    /**
     * Get friend requests
     * Returns a list of all users who have sent a friend request.
     * @returns UserDTO Successfully retrieved friend requests
     * @throws ApiError
     */
    public static getFriendRequests(): CancelablePromise<Array<UserDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends/requests',
        });
    }
}
