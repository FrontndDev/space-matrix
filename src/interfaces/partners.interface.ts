import {
    Matrix
} from "./store.interface.ts";

export interface IPartners {
    count: number;
    list: Matrix[];
}

export interface IGetPendingBoostersParams {
    filter?: number;
    isPartnerMatrix?: boolean;
    newTypeMatrix?: null | string;
}

export interface IPosition {
    depth: number;
    pos: number;
}

export interface IExposePartnerParams extends IPosition {
    matrix_id: number;
    child_id: number;
}

export interface ILineOfPartners {
    id: number;
    name: string;
}

export interface IInfinityPartnersParams {
    parentId: number;
    isPartnerMatrix: boolean;
}