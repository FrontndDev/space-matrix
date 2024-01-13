import {
  FillReward,
  Matrix
} from "./store.interface.ts";

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
  totalCount: number;
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