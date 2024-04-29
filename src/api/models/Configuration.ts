/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Configuration = {
    id?: number;
    commitment?: Configuration.commitment;
    experience?: Configuration.experience;
    challengeTypes?: Array<'NO_COFFEE' | 'NO_CAR' | 'SHORTER_SHOWER' | 'SPEND_LESS_ON_FOOD' | 'BUY_USED_CLOTHES' | 'LESS_SHOPPING' | 'DROP_SUBSCRIPTION' | 'SELL_SOMETHING' | 'BUY_USED' | 'EAT_PACKED_LUNCH' | 'STOP_SHOPPING' | 'ZERO_SPENDING' | 'RENT_YOUR_STUFF' | 'MEATLESS' | 'SCREEN_TIME_LIMIT' | 'UNPLUGGED_ENTERTAINMENT'>;
};
export namespace Configuration {
    export enum commitment {
        LITTLE = 'LITTLE',
        SOME = 'SOME',
        MUCH = 'MUCH',
    }
    export enum experience {
        NONE = 'NONE',
        SOME = 'SOME',
        EXPERT = 'EXPERT',
    }
}

