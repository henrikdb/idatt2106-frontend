/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChallengeTemplateDTO } from './ChallengeTemplateDTO'
import type { ProgressDTO } from './ProgressDTO'
export type ChallengeDTO = {
  id?: number
  amount?: number
  points?: number
  checkDays?: number
  totalDays?: number
  startDate?: string
  endDate?: string
  challengeTemplate?: ChallengeTemplateDTO
  progressList?: Array<ProgressDTO>
}
