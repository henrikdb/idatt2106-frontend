/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BudgetRequestDTO } from '../models/BudgetRequestDTO'
import type { BudgetResponseDTO } from '../models/BudgetResponseDTO'
import type { ExpenseRequestDTO } from '../models/ExpenseRequestDTO'
import type { ExpenseResponseDTO } from '../models/ExpenseResponseDTO'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class BudgetService {
  /**
   * Updates a budget
   * Updates a budget based on the budget request
   * @returns any Successfully updated budget
   * @throws ApiError
   */
  public static updateBudget({
    budgetId,
    requestBody
  }: {
    budgetId: number
    requestBody: BudgetRequestDTO
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/budget/update/{budgetId}',
      path: {
        budgetId: budgetId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Budget is not found`
      }
    })
  }
  /**
   * Created/Updates an expense
   * Creates/Updates a budget based on the budget request
   * @returns any Successfully updated budget
   * @throws ApiError
   */
  public static updateExpense({
    budgetId,
    requestBody
  }: {
    budgetId: number
    requestBody: ExpenseRequestDTO
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/budget/update/expense/{budgetId}',
      path: {
        budgetId: budgetId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Error updating expense`
      }
    })
  }
  /**
   * Create a new budget
   * Create a new budget with based on the budget request
   * @returns any Successfully created new budget
   * @throws ApiError
   */
  public static createBudget({
    requestBody
  }: {
    requestBody: BudgetRequestDTO
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/budget/create',
      body: requestBody,
      mediaType: 'application/json'
    })
  }
  /**
   * Get the list of budgets
   * Get all budgets related to the authenticated user
   * @returns BudgetResponseDTO Successfully got budgets
   * @throws ApiError
   */
  public static getBudgetsByUser(): CancelablePromise<Array<BudgetResponseDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget'
    })
  }
  /**
   * Get the budget
   * Get budget by its id
   * @returns BudgetResponseDTO Successfully got budget
   * @throws ApiError
   */
  public static getBudget({
    budgetId
  }: {
    budgetId: number
  }): CancelablePromise<BudgetResponseDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget/{budgetId}',
      path: {
        budgetId: budgetId
      },
      errors: {
        500: `Budget is not found`
      }
    })
  }
  /**
   * Get the list of budgets
   * Get all budgets related to the authenticated user
   * @returns ExpenseResponseDTO Successfully got expenses
   * @throws ApiError
   */
  public static getExpenses({
    budgetId
  }: {
    budgetId: number
  }): CancelablePromise<Array<ExpenseResponseDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget/expenses/{budgetId}',
      path: {
        budgetId: budgetId
      }
    })
  }
  /**
   * Get the expense
   * Get expense by its id
   * @returns ExpenseResponseDTO Successfully got expense
   * @throws ApiError
   */
  public static getExpense({
    expenseId
  }: {
    expenseId: number
  }): CancelablePromise<ExpenseResponseDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget/expense/{expenseId}',
      path: {
        expenseId: expenseId
      },
      errors: {
        500: `Expense is not found`
      }
    })
  }
  /**
   * Deletes a budget
   * Deletes a budget based on provided budget id
   * @returns any Successfully deleted budget
   * @throws ApiError
   */
  public static deleteBudget({
    budgetId
  }: {
    budgetId: number
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget/delete/{budgetId}',
      path: {
        budgetId: budgetId
      },
      errors: {
        500: `Budget is not found`
      }
    })
  }
  /**
   * Deletes an expense
   * Deletes an expense based on provided expense id
   * @returns any Successfully deleted expense
   * @throws ApiError
   */
  public static deleteExpense({
    expenseId
  }: {
    expenseId: number
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/budget/delete/expense/{expenseId}',
      path: {
        expenseId: expenseId
      },
      errors: {
        500: `Expense is not found`
      }
    })
  }
}
