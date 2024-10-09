import { BalancesType } from "@/@types/balances";

export type PageTokensType = {
  token: string | undefined;
  nft: string | undefined;
  chain: string | undefined;
};

export default class Balance {
  public balances: BalancesType[];

  constructor(balances: BalancesType[]) {
    this.balances = balances;
  }

  get total(): number {
    return this.balances.reduce((prev, curr) => {
      return prev + Number(curr.balanceUsd);
    }, 0);
  }

  findbalance(id: string): BalancesType | undefined {
    const balance = this.balances.find(
      (balance) => balance.id.toLocaleLowerCase() === id.toLocaleLowerCase()
    );

    return balance;
  }
}
