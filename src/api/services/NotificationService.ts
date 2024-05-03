/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationDTO } from '../models/NotificationDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class NotificationService {
  /**
   * Updates a notification
   * Updates a notification based on the request
   * @returns any Successfully updated notification
   * @throws ApiError
   */
  public static updateNotification({
    requestBody
  }: {
    requestBody: NotificationDTO
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/notification/update',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `User is not found`
      }
    })
  }
  /**
   * Get the list of notifications
   * Get all notifications to a user
   * @returns NotificationDTO Successfully got notifications
   * @throws ApiError
   */
  public static getNotificationByUser(): CancelablePromise<Array<NotificationDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/notification'
    })
  }
  /**
   * Get the notification
   * Get notification by its id
   * @returns NotificationDTO Successfully got notification
   * @throws ApiError
   */
  public static getNotification({
    notificationId
  }: {
    notificationId: number
  }): CancelablePromise<NotificationDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/notification/{notificationId}',
      path: {
        notificationId: notificationId
      },
      errors: {
        500: `Notification is not found`
      }
    })
  }
  /**
   * Get the list of unread notifications
   * Get all unread notifications to a user
   * @returns NotificationDTO Successfully got notifications
   * @throws ApiError
   */
  public static getUnreadNotificationByUser(): CancelablePromise<Array<NotificationDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/notification/unread'
    })
  }
}
