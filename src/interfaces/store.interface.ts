export type Type = {
    currency: string;
    price: number;
    category: string;
    type: string;
    title: string;
    required: boolean;
    depth: number;
    pow: number;
    allowBoosters: boolean;
    showLegend: boolean;
    infinityPos: number;
}

export interface ListOfTypes {
    types: Type[];
    opened: string[];
}

export interface Owner {
    id: number;
    fio: string;
    photo: string;
    photoHash: string;
}

export interface Matrix {
    id: number;
    owner: Owner;
    parent_matrix_id: number | null;
    filled: boolean;
    prev_type_matrix_id: number | null;
    is_bonus: boolean;
    is_booster: boolean;
    number: number;
    binstatus: ({ [key: string]: number })[];
}

export interface MatrixConfig {
    currency: string;
    price: number;
    category: string;
    type: string;
    title: string;
    required: boolean;
    depth: number;
    pow: number;
    allowBoosters: boolean;
    showLegend: boolean;
    infinityPos: number | null;
}

export interface FillReward {
    event: string;
    value: { type?: string; count?: number; } | string;
}

export interface Ceil {
    depth: number;
    pos: number;
    allowBuyClone: boolean;
    allowBuyBoost: boolean;
    fillRevard: FillReward[];
    isInfinity: boolean;
}

export interface CeilsCollection {
    [key: string]: {
        [key: string]: Ceil;
    };
}

export interface Ceils {
    [key: string]: Ceil
}

export interface ViewLastOwn {
    matrix: Matrix;
    matrixConfig: MatrixConfig;
    ceilsCollection: CeilsCollection;
}