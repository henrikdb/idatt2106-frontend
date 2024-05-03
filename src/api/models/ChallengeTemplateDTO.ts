/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChallengeTemplateDTO = {
    id?: number;
    templateName?: string;
    text?: string;
    amount?: number;
    type?: ChallengeTemplateDTO.type;
};
export namespace ChallengeTemplateDTO {
    export enum type {
        NO_COFFEE = 'NO_COFFEE',
        NO_CAR = 'NO_CAR',
        SHORTER_SHOWER = 'SHORTER_SHOWER',
        SPEND_LESS_ON_FOOD = 'SPEND_LESS_ON_FOOD',
        BUY_USED_CLOTHES = 'BUY_USED_CLOTHES',
        LESS_SHOPPING = 'LESS_SHOPPING',
        DROP_SUBSCRIPTION = 'DROP_SUBSCRIPTION',
        SELL_SOMETHING = 'SELL_SOMETHING',
        BUY_USED = 'BUY_USED',
        EAT_PACKED_LUNCH = 'EAT_PACKED_LUNCH',
        STOP_SHOPPING = 'STOP_SHOPPING',
        ZERO_SPENDING = 'ZERO_SPENDING',
        RENT_YOUR_STUFF = 'RENT_YOUR_STUFF',
        MEATLESS = 'MEATLESS',
        SCREEN_TIME_LIMIT = 'SCREEN_TIME_LIMIT',
        UNPLUGGED_ENTERTAINMENT = 'UNPLUGGED_ENTERTAINMENT',
    }
}

