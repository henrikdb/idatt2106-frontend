/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionDTO } from '../models/TransactionDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class TransactionControllerService {
  /**
   * Transfer to account
   * Transfer money from a users account to another account of the same user
   * @returns TransactionDTO No accounts associated with a bank user
   * @throws ApiError
   */
  public static transferToSelf({
    requestBody
  }: {
    requestBody: TransactionDTO
  }): CancelablePromise<TransactionDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/bank/v1/transaction/norwegian-domestic-payment-to-self',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Bank profile id does not exist`
      }
    })
  }
}
