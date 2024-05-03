/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NotificationDTO = {
  id?: number
  message?: string
  unread?: boolean
  notificationType?: NotificationDTO.notificationType
  createdAt?: string
}
export namespace NotificationDTO {
  export enum notificationType {
    BADGE = 'BADGE',
    FRIEND_REQUEST = 'FRIEND_REQUEST',
    COMPLETED_GOAL = 'COMPLETED_GOAL'
  }
}
