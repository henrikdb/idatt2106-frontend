/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationDTO } from './ConfigurationDTO';
export type SignUpRequest = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    checkingAccountBBAN?: number;
    savingsAccountBBAN?: number;
    configuration: ConfigurationDTO;
};

