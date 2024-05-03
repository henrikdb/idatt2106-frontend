/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account'
import type { AccountRequestDTO } from '../models/AccountRequestDTO'
import type { AccountResponseDTO } from '../models/AccountResponseDTO'
import type { BalanceDTO } from '../models/BalanceDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class AccountControllerService {
  /**
   * Create account
   * Create account with random balance
   * @returns AccountResponseDTO Successfully created account
   * @throws ApiError
   */
  public static createAccount({
    requestBody
  }: {
    requestBody: AccountRequestDTO
  }): CancelablePromise<AccountResponseDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/bank/v1/account/create-account',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Provided bank profile id could not be found`
      }
    })
  }
  /**
   * Create account
   * Create account with random balance
   * @returns BalanceDTO Successfully created account
   * @throws ApiError
   */
  public static getAccountsByBban({ bban }: { bban: number }): CancelablePromise<BalanceDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/bank/v1/account/balance/{bban}',
      path: {
        bban: bban
      },
      errors: {
        404: `Provided bban could not be found`
      }
    })
  }
  /**
   * Get user accounts
   * Get accounts associated with a user by providing their social security number
   * @returns Account No accounts associated with a bank user
   * @throws ApiError
   */
  public static getAccountsBySsn({ ssn }: { ssn: number }): CancelablePromise<Array<Account>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/bank/v1/account/accounts/ssn/{ssn}',
      path: {
        ssn: ssn
      },
      errors: {
        404: `Social security number does not exist`
      }
    })
  }
  /**
   * Get user accounts
   * Get accounts associated with a user by providing their bank profile id
   * @returns Account No accounts associated with a bank user
   * @throws ApiError
   */
  public static getAccounts({
    bankProfileId
  }: {
    bankProfileId: number
  }): CancelablePromise<Array<Account>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/bank/v1/account/accounts/profile/{bankProfileId}',
      path: {
        bankProfileId: bankProfileId
      },
      errors: {
        404: `Bank profile id does not exist`
      }
    })
  }
}
