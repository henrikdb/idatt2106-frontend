/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from './Account';
import type { Badge } from './Badge';
import type { Configuration } from './Configuration';
import type { GrantedAuthority } from './GrantedAuthority';
import type { Point } from './Point';
import type { Streak } from './Streak';
export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    checkingAccount?: Account;
    savingsAccount?: Account;
    password?: string;
    createdAt?: string;
    role?: User.role;
    badges?: Array<Badge>;
    point?: Point;
    streak?: Streak;
    configuration?: Configuration;
    enabled?: boolean;
    authorities?: Array<GrantedAuthority>;
    username?: string;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
};
export namespace User {
    export enum role {
        USER = 'USER',
        ADMIN = 'ADMIN',
    }
}

