/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChallengeDTO } from './ChallengeDTO'
import type { UserDTO } from './UserDTO'
export type GoalDTO = {
  id?: number
  name?: string
  description?: string
  targetAmount?: number
  targetDate?: string
  createdAt?: string
  challenges?: Array<ChallengeDTO>
  user?: UserDTO
}
