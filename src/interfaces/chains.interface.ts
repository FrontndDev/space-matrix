import {
  FillReward,
  IOwner,
  Matrix
} from "./store.interface";

export type TInitiator = {
  id: string;
  fio: string;
  photo: string;
  photoHash: string;
  lvl_insystem: string;
};

export interface IChains {
  id: number;
  start: string;
  end: string;
  profit: {
    currency: string;
    amount: number;
  };
  price: {
    currency: string;
    amount: number;
  };
  count_links: number;
  is_teleport: boolean;
  initiator: TInitiator;
}

export interface IChainsList {
  totalCount: number;IChains
  currentPage: number;
  totalPages: number;
  list: IChains[];
}

export interface IChainDetails {
  list: Matrix[];
  price: {
    amount: number;
    currency: string;
  };
  rewards: FillReward[];
}

export interface ITeleports {
  owner: IOwner;
  profit: {
    amount: number;
    currency: string;
  };
  startMatrix: string;
}

export interface ITeleportList {
  currentPage: number;
  list: ITeleports[];
  totalCount: number;
  totalPages: number;
}

export interface ITeleportPartnerParams {
  partnerId: number;
}