import { IPosition } from "./partners.interface.ts";

export interface IObject {
    [key: string]: string
}

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
    teamOpened: {
        [key: string]: number
    };
}

export interface IOwner {
    id: number;
    fio: string;
    photo: string;
    photoHash: string;
    lvl_insystem: string;
    immutable?: boolean;
}

export interface IBinStatus {
    [key: string]: number;
}

export interface Matrix {
    id: number;
    owner: IOwner;
    parent_matrix_id: number | null;
    filled: boolean;
    prev_type_matrix_id: number | null;
    type: string;
    is_bonus: boolean;
    is_booster: boolean;
    number: number;
    ceils: {
        [key: string]: {
            [key: string]: string;
        };
    };
    binstatus: IBinStatus[];
    immutable?: boolean;
}

export interface MatrixConfig {
    currency: string;
    category: string;
    showLegend: boolean;
    infinityPos: number;
    type: string;
    title: string;
    price: number;
    activationPrice: number;
    required: boolean;
    depth: number;
    pow: number;
}

export interface FillReward {
    event: string;
    value: {
        type?: string;
        count?: number;
        amount?: number;
        title?: string;
    } & string;
}

export interface Ceil {
    depth: number;
    pos: number;
    queueId: number | null;
    matrix?: Matrix | null;
    allowBuyClone: boolean;
    allowSniper: boolean;
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

export interface IMatrix {
    ctaText?: string;
    in_queue?: boolean;
    matrix: Matrix | null;
    matrixConfig: MatrixConfig;
    ceilsCollection?: CeilsCollection;
    allowTop: boolean | undefined;
    countInInfinity: number;
}

export interface IBuyBoosterParams extends IPosition {
    matrix_id: number;
    chainMode?: string;
}

export interface IWallet {
    id: string;
    currency: string;
    amount: number;
    amount_string: string;
    address: string | null;
    type: string | number;
}

export interface IFeePercent {
    USD: Record<string, never>;
    TON: Record<string, never>;
    JETON: Record<string, never>;
    USDT: Record<string, never>;
}

export interface IMinWithdrawal {
    USD: number;
    TON: number;
    USDT: number;
}

export interface IBalance {
    wallets: IWallet[];
    min_withdrawal: IMinWithdrawal;
    fee_percent: IFeePercent;
}