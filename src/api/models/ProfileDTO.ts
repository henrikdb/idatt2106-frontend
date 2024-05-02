/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PointDTO } from './PointDTO';
import type { StreakDTO } from './StreakDTO';
export type ProfileDTO = {
    id?: number;
    firstName?: string;
    lastName?: string;
    profileImage?: number;
    bannerImage?: number;
    createdAt?: string;
    point?: PointDTO;
    streak?: StreakDTO;
};

