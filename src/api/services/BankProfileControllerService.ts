/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankProfileDTO } from '../models/BankProfileDTO'
import type { BankProfileResponseDTO } from '../models/BankProfileResponseDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class BankProfileControllerService {
  /**
   * Create bank profile
   * Create a bank profile by providing a social security number
   * @returns BankProfileResponseDTO Successfully created a bank profile
   * @throws ApiError
   */
  public static createBankProfile({
    requestBody
  }: {
    requestBody: BankProfileDTO
  }): CancelablePromise<BankProfileResponseDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/bank/v1/profile/create-profile',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Could not create profile`
      }
    })
  }
}
