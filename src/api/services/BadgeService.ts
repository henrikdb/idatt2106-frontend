/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BadgeDTO } from '../models/BadgeDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class BadgeService {
  /**
   * Get the list of badges
   * Get all badges stored in the database
   * @returns BadgeDTO Successfully got badges
   * @throws ApiError
   */
  public static getAllBadges(): CancelablePromise<Array<BadgeDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge'
    })
  }
  /**
   * Get the budget
   * Get budget by its id
   * @returns BadgeDTO Successfully got budget
   * @throws ApiError
   */
  public static getBadge({ badgeId }: { badgeId: number }): CancelablePromise<BadgeDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge/{badgeId}',
      path: {
        badgeId: badgeId
      },
      errors: {
        500: `Badge is not found`
      }
    })
  }
  /**
   * Updates unlocked badges
   * Checks if a user has met the criteria for unlocking badges
   * @returns any Successfully updated badges
   * @throws ApiError
   */
  public static updateUnlockedBadges(): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge/update'
    })
  }
  /**
   * Get the list of badges
   * Get all badges unlocked by the user
   * @returns BadgeDTO Successfully got badges
   * @throws ApiError
   */
  public static getBadgesUnlockedByActiveUser(): CancelablePromise<Array<BadgeDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge/unlocked'
    })
  }
  /**
   * Get the list of badges
   * Get all badges unlocked by the user
   * @returns BadgeDTO Successfully got badges
   * @throws ApiError
   */
  public static getBadgesUnlockedByUser({
    userId
  }: {
    userId: number
  }): CancelablePromise<Array<BadgeDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge/unlocked/{userId}',
      path: {
        userId: userId
      }
    })
  }
  /**
   * Get the list of badges
   * Get all badges not unlocked by the user
   * @returns BadgeDTO Successfully got badges
   * @throws ApiError
   */
  public static getBadgesNotUnlockedByActiveUser(): CancelablePromise<Array<BadgeDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/badge/locked'
    })
  }
}
