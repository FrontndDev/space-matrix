export interface IBinStatus {
    [key: string]: number;
}

export interface IOwner {
    id: string;
    fio: string;
    photo: string;
    photoHash: string;
    immutable: boolean;
}

export interface IPartnersList {
    id: number;
    owner: IOwner;
    parent_matrix_id: null | number;
    filled: boolean;
    prev_type_matrix_id: null | number;
    is_bonus: boolean;
    is_booster: boolean;
    number: number;
    binstatus: IBinStatus[];
    immutable?: boolean;
}

export interface IPartners {
    count: number;
    list: IPartnersList[];
}

export interface IGetPendingBoostersParams {
    matrixFilterUserId: number;
    matrixFilterPageId: number;
    filter: number;
    isPartnerMatrix?: boolean;
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