/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedbackRequestDTO } from '../models/FeedbackRequestDTO'
import type { FeedbackResponseDTO } from '../models/FeedbackResponseDTO'
import type { PasswordResetDTO } from '../models/PasswordResetDTO'
import type { PasswordUpdateDTO } from '../models/PasswordUpdateDTO'
import type { ProfileDTO } from '../models/ProfileDTO'
import type { UserDTO } from '../models/UserDTO'
import type { UserUpdateDTO } from '../models/UserUpdateDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class UserService {
  /**
   * Update User Subscription Level
   * Updates the subscription level of the current user
   * @returns any Subscription level updated successfully
   * @throws ApiError
   */
  public static updateSubscriptionLevel({
    subscriptionLevel
  }: {
    subscriptionLevel: string
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/users/subscription/{subscriptionLevel}',
      path: {
        subscriptionLevel: subscriptionLevel
      }
    })
  }
  /**
   * Send feedback
   * Send feedback from an email.
   * @returns any Success
   * @throws ApiError
   */
  public static sendFeedback({
    requestBody
  }: {
    requestBody: FeedbackRequestDTO
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/send-feedback',
      body: requestBody,
      mediaType: 'application/json'
    })
  }
  /**
   * Initiate a password reset
   * Send a password reset mail to the user with the specified email
   * @returns any Successfully initiated a password reset
   * @throws ApiError
   */
  public static resetPassword({ requestBody }: { requestBody: string }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/reset-password',
      body: requestBody,
      mediaType: 'text/plain'
    })
  }
  /**
   * Confirm a password reset
   * Confirms a password reset using a token and a new password
   * @returns void
   * @throws ApiError
   */
  public static confirmPasswordReset({
    requestBody
  }: {
    requestBody: PasswordResetDTO
  }): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/confirm-password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `Invalid token`
      }
    })
  }
  /**
   * Update a profile
   * Update the profile of the authenticated user
   * @returns UserDTO Successfully updated profile
   * @throws ApiError
   */
  public static update({
    requestBody
  }: {
    requestBody: UserUpdateDTO
  }): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users',
      body: requestBody,
      mediaType: 'application/json'
    })
  }
  /**
   * Update a password
   * Update the password of the authenticated user
   * @returns UserDTO Successfully updated password
   * @throws ApiError
   */
  public static updatePassword({
    requestBody
  }: {
    requestBody: PasswordUpdateDTO
  }): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/password',
      body: requestBody,
      mediaType: 'application/json'
    })
  }
  /**
   * Get a profile
   * Get the profile of a user
   * @returns ProfileDTO Successfully got profile
   * @throws ApiError
   */
  public static getProfile({ userId }: { userId: number }): CancelablePromise<ProfileDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{userId}/profile',
      path: {
        userId: userId
      }
    })
  }
  /**
   * Search for users by name and filter
   * Returns a list of users whose names contain the specified search term and match the filter.
   * @returns UserDTO Successfully retrieved list of users
   * @throws ApiError
   */
  public static getUsersByNameAndFilter({
    searchTerm,
    filter
  }: {
    searchTerm: string
    filter: string
  }): CancelablePromise<Array<UserDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/search/{searchTerm}/{filter}',
      path: {
        searchTerm: searchTerm,
        filter: filter
      }
    })
  }
  /**
   * Get X amount of random users
   * Get X amount of random users that fit the filter
   * @returns UserDTO Successfully retrieved list of users
   * @throws ApiError
   */
  public static getRandomUsers({
    amount,
    filter
  }: {
    amount: number
    filter: string
  }): CancelablePromise<Array<UserDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/search/random/{amount}/{filter}',
      path: {
        amount: amount,
        filter: filter
      }
    })
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
      url: '/api/users/me'
    })
  }
  /**
   * Delete the authenticated user
   * Delete the authenticated user
   * @returns any Successfully deleted user
   * @throws ApiError
   */
  public static deleteUser(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/users/me'
    })
  }
  /**
   * Send feedback
   * Send feedback from a user.
   * @returns FeedbackResponseDTO Success
   * @throws ApiError
   */
  public static getFeedback(): CancelablePromise<Array<FeedbackResponseDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/get-feedback'
    })
  }
}
