/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { BankAccountDTO } from '../models/BankAccountDTO';
import type { Budget } from '../models/Budget';
import type { BudgetRequestDTO } from '../models/BudgetRequestDTO';
import type { BudgetResponseDTO } from '../models/BudgetResponseDTO';
import type { ExpenseRequestDTO } from '../models/ExpenseRequestDTO';
import type { ExpenseResponseDTO } from '../models/ExpenseResponseDTO';
import type { PasswordResetDTO } from '../models/PasswordResetDTO';
import type { PasswordUpdateDTO } from '../models/PasswordUpdateDTO';
import type { ProfileDTO } from '../models/ProfileDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Initiate a password reset
     * Send a password reset mail to the user with the specified email
     * @returns any Successfully initiated a password reset
     * @throws ApiError
     */
    public static resetPassword({
        requestBody,
    }: {
        requestBody: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/reset-password',
            body: requestBody,
            mediaType: 'text/plain',
        });
    }
    /**
     * Confirm a password reset
     * Confirms a password reset using a token and a new password
     * @returns void
     * @throws ApiError
     */
    public static confirmPasswordReset({
        requestBody,
    }: {
        requestBody: PasswordResetDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/confirm-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Invalid token`,
            },
        });
    }
    /**
     * Updates a budget
     * Updates a budget based on the budget request
     * @returns any Successfully updated budget
     * @throws ApiError
     */
    public static updateBudget({
        budgetId,
        requestBody,
    }: {
        budgetId: number,
        requestBody: BudgetRequestDTO,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/budget/update/{budgetId}',
            path: {
                'budgetId': budgetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Budget is not found`,
            },
        });
    }
    /**
     * Created/Updates an expense
     * Creates/Updates a budget based on the budget request
     * @returns any Successfully updated budget
     * @throws ApiError
     */
    public static updateExpense({
        budgetId,
        requestBody,
    }: {
        budgetId: number,
        requestBody: ExpenseRequestDTO,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/budget/update/expense/{budgetId}',
            path: {
                'budgetId': budgetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Error updating expense`,
            },
        });
    }
    /**
     * Create a new budget
     * Create a new budget with based on the budget request
     * @returns Budget Successfully created new budget
     * @throws ApiError
     */
    public static createBudget({
        requestBody,
    }: {
        requestBody: BudgetRequestDTO,
    }): CancelablePromise<Budget> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/budget/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a profile
     * Update the profile of the authenticated user
     * @returns UserDTO Successfully updated profile
     * @throws ApiError
     */
    public static update({
        requestBody,
    }: {
        requestBody: UserUpdateDTO,
    }): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a user's bank account
     * Changes either a user's checking account or savings account
     * @returns Account OK
     * @throws ApiError
     */
    public static selectBankAccount({
        requestBody,
    }: {
        requestBody: BankAccountDTO,
    }): CancelablePromise<Account> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/update-account',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a password
     * Update the password of the authenticated user
     * @returns UserDTO Successfully updated password
     * @throws ApiError
     */
    public static updatePassword({
        requestBody,
    }: {
        requestBody: PasswordUpdateDTO,
    }): CancelablePromise<UserDTO> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a profile
     * Get the profile of a user
     * @returns ProfileDTO Successfully got profile
     * @throws ApiError
     */
    public static getProfile({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<ProfileDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}/profile',
            path: {
                'userId': userId,
            },
        });
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
            url: '/api/users/me',
        });
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
            url: '/api/budget',
        });
    }
    /**
     * Get the budget
     * Get budget by its id
     * @returns BudgetResponseDTO Successfully got budget
     * @throws ApiError
     */
    public static getBudget({
        budgetId,
    }: {
        budgetId: number,
    }): CancelablePromise<BudgetResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/budget/{budgetId}',
            path: {
                'budgetId': budgetId,
            },
            errors: {
                500: `Budget is not found`,
            },
        });
    }
    /**
     * Get the list of budgets
     * Get all budgets related to the authenticated user
     * @returns ExpenseResponseDTO Successfully got expenses
     * @throws ApiError
     */
    public static getExpenses({
        budgetId,
    }: {
        budgetId: number,
    }): CancelablePromise<Array<ExpenseResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/budget/expenses/{budgetId}',
            path: {
                'budgetId': budgetId,
            },
        });
    }
    /**
     * Get the expense
     * Get expense by its id
     * @returns ExpenseResponseDTO Successfully got expense
     * @throws ApiError
     */
    public static getExpense({
        expenseId,
    }: {
        expenseId: number,
    }): CancelablePromise<ExpenseResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/budget/expense/{expenseId}',
            path: {
                'expenseId': expenseId,
            },
            errors: {
                500: `Expense is not found`,
            },
        });
    }
    /**
     * Deletes a budget
     * Deletes a budget based on provided budget id
     * @returns any Successfully deleted budget
     * @throws ApiError
     */
    public static deleteBudget({
        budgetId,
    }: {
        budgetId: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/budget/delete/{budgetId}',
            path: {
                'budgetId': budgetId,
            },
            errors: {
                500: `Budget is not found`,
            },
        });
    }
    /**
     * Deletes an expense
     * Deletes an expense based on provided expense id
     * @returns any Successfully deleted expense
     * @throws ApiError
     */
    public static deleteExpense({
        expenseId,
    }: {
        expenseId: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/budget/delete/expense/{expenseId}',
            path: {
                'expenseId': expenseId,
            },
            errors: {
                500: `Expense is not found`,
            },
        });
    }
}
