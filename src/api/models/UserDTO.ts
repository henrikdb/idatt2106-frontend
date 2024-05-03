/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationDTO } from './ConfigurationDTO';
import type { PointDTO } from './PointDTO';
import type { StreakDTO } from './StreakDTO';
export type UserDTO = {
    id?: number;
    firstName?: string;
    lastName?: string;
    profileImage?: number;
    bannerImage?: number;
    email?: string;
    createdAt?: string;
    role?: string;
    subscriptionLevel?: string;
    checkingAccountBBAN?: number;
    savingsAccountBBAN?: number;
    point?: PointDTO;
    streak?: StreakDTO;
    configuration?: ConfigurationDTO;
};

