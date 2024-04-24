/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParticipantUserDTO } from './ParticipantUserDTO';
export type ParticipantDTO = {
    role?: ParticipantDTO.role;
    user?: ParticipantUserDTO;
};
export namespace ParticipantDTO {
    export enum role {
        CREATOR = 'CREATOR',
        CONTRIBUTOR = 'CONTRIBUTOR',
    }
}

