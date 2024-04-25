/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChallengeDTO } from './ChallengeDTO';
import type { ParticipantDTO } from './ParticipantDTO';
export type GoalDTO = {
    id?: number;
    goalName?: string;
    description?: string;
    targetAmount?: number;
    targetDate?: string;
    completedAt?: string;
    createdAt?: string;
    challenges?: Array<ChallengeDTO>;
    participants?: Array<ParticipantDTO>;
};

