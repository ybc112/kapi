import { Contract, formatUnits, parseUnits, type Signer, type Provider } from "ethers";

export const CAPY_TOKEN_ADDRESS = "0x839578f40b9a79a3fe891dd96079f3083e6e7777";

export const GAME_VAULT_ADDRESS = String(import.meta.env.VITE_GAME_VAULT_ADDRESS ?? "").trim();

export const GAME_TOKEN_ADDRESS = String(import.meta.env.VITE_GAME_TOKEN_ADDRESS ?? CAPY_TOKEN_ADDRESS).trim();

export const TOKEN_DECIMALS = 18;

export const erc20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
] as const;

export const gameVaultAbi = [
  "function gameToken() view returns (address)",
  "function signer() view returns (address)",
  "function econ() view returns (uint256 ticket, uint256 reviveCost, uint256 itemCost, uint16 baseRewardBps, uint16 tierBonusBps, uint16 tierBonusCapBps)",
  "function nonces(address account) view returns (uint256)",
  "function nextTier(address account) view returns (uint256)",
  "function runs(address account) view returns (uint32 tier, uint32 ticketsPaid, uint64 startedAt, bool active)",
  "function rewardOf(uint256 tier) view returns (uint256)",
  "function levelRangeOf(uint256 tier) view returns (uint256 fromLevel, uint256 toLevel)",
  "function tierOfLevel(uint256 level) view returns (uint256 tier, bool paid)",
  "function playerState(address player) view returns (uint256 tierNext, tuple(uint32 tier, uint32 ticketsPaid, uint64 startedAt, bool active) run, uint256 reward, uint256 nonce, uint256 dailyUsed, uint256 pool, uint64 checkInExpiry, uint256 epoch)",
  "function currentEpoch() view returns (uint256)",
  "function leaderboardRewardCap(uint8 rank) view returns (uint16)",
  "function leaderboardClaimed(uint256 epochId, uint8 rank, address player) view returns (bool)",
  "function leaderboardDigest(address player, uint256 epochId, uint8 rank, uint256 amount, uint256 nonce, uint256 deadline) view returns (bytes32)",
  "function enterTier()",
  "function revive()",
  "function useItem()",
  "function abandonRun()",
  "function checkIn()",
  "function claimReward(uint256 tier, uint256 nonce, uint256 deadline, bytes calldata signature)",
  "function claimLeaderboardReward(uint256 epochId, uint8 rank, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature)",
  "function fundPool(uint256 amount)",
  "event TierEntered(address indexed player, uint256 indexed tier, uint256 ticket, uint256 fromLevel)",
  "event Revived(address indexed player, uint256 indexed tier, uint256 cost, uint32 ticketsPaid)",
  "event ItemUsed(address indexed player, uint256 cost, uint256 burned, uint256 toPool)",
  "event RewardClaimed(address indexed player, uint256 indexed tier, uint256 reward, uint32 ticketsPaid, uint256 nonce)",
  "event LeaderboardRewardClaimed(address indexed player, uint256 indexed epochId, uint8 indexed rank, uint256 amount, uint256 nonce)",
  "event CheckIn(address indexed player, uint256 cost, uint64 expiresAt)",
] as const;

export type VaultEconomics = {
  ticket: bigint;
  reviveCost: bigint;
  itemCost: bigint;
  baseRewardBps: number;
  tierBonusBps: number;
  tierBonusCapBps: number;
};

export type PlayerRun = {
  tier: number;
  ticketsPaid: number;
  startedAt: number;
  active: boolean;
};

export type PlayerState = {
  tierNext: number;
  run: PlayerRun;
  reward: bigint;
  nonce: bigint;
  dailyUsed: bigint;
  pool: bigint;
  checkInExpiry: number;
  epoch: number;
};

export type LeaderboardRewardSignature = {
  ok: boolean;
  player: string;
  epochId: number;
  rank: number;
  amount: string;
  nonce: string;
  deadline: number;
  signature: string;
};

export function parseGameAmount(value: string): bigint {
  return parseUnits(value || "0", TOKEN_DECIMALS);
}

export function formatGameAmount(value: bigint): string {
  // 只保留最多 4 位小数，别把 18 位尾数全显示出来
  const n = Number(formatUnits(value, TOKEN_DECIMALS));
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("zh-CN", { maximumFractionDigits: 4 });
}

export async function getTokenBalance(provider: Provider, account: string): Promise<bigint> {
  const token = new Contract(GAME_TOKEN_ADDRESS, erc20Abi, provider);
  return BigInt(await token.balanceOf(account));
}

export async function getTokenAllowance(provider: Provider, owner: string, spender: string): Promise<bigint> {
  const token = new Contract(GAME_TOKEN_ADDRESS, erc20Abi, provider);
  return BigInt(await token.allowance(owner, spender));
}

export async function approveToken(signer: Signer, spender: string, amount: bigint): Promise<string> {
  const token = new Contract(GAME_TOKEN_ADDRESS, erc20Abi, signer);
  const tx = await token.approve(spender, amount);
  await tx.wait();
  return tx.hash;
}

export async function enterTier(signer: Signer): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.enterTier();
  await tx.wait();
  return tx.hash;
}

export async function revive(signer: Signer): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.revive();
  await tx.wait();
  return tx.hash;
}

export async function useItem(signer: Signer): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.useItem();
  await tx.wait();
  return tx.hash;
}

export async function abandonRun(signer: Signer): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.abandonRun();
  await tx.wait();
  return tx.hash;
}

export async function checkIn(signer: Signer): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.checkIn();
  await tx.wait();
  return tx.hash;
}

export async function claimReward(
  signer: Signer,
  tier: number,
  nonce: bigint,
  deadline: number,
  signature: string
): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.claimReward(tier, nonce, deadline, signature);
  await tx.wait();
  return tx.hash;
}

export async function claimLeaderboardReward(
  signer: Signer,
  epochId: number,
  rank: number,
  amount: bigint,
  nonce: bigint,
  deadline: number,
  signature: string
): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.claimLeaderboardReward(epochId, rank, amount, nonce, deadline, signature);
  await tx.wait();
  return tx.hash;
}

export async function fetchVaultEconomics(provider: Provider): Promise<VaultEconomics> {
  if (!GAME_VAULT_ADDRESS) {
    return {
      ticket: parseGameAmount("20000"),
      reviveCost: parseGameAmount("20000"),
      itemCost: parseGameAmount("5000"),
      baseRewardBps: 18000,
      tierBonusBps: 1000,
      tierBonusCapBps: 2000,
    };
  }
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  const econ = await vault.econ();
  return {
    ticket: BigInt(econ.ticket),
    reviveCost: BigInt(econ.reviveCost),
    itemCost: BigInt(econ.itemCost),
    baseRewardBps: Number(econ.baseRewardBps),
    tierBonusBps: Number(econ.tierBonusBps),
    tierBonusCapBps: Number(econ.tierBonusCapBps),
  };
}

export async function fetchPlayerState(provider: Provider, player: string): Promise<PlayerState> {
  if (!GAME_VAULT_ADDRESS) {
    return {
      tierNext: 0,
      run: { tier: 0, ticketsPaid: 0, startedAt: 0, active: false },
      reward: 0n,
      nonce: 0n,
      dailyUsed: 0n,
      pool: 0n,
      checkInExpiry: 0,
      epoch: 0,
    };
  }
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  const state = await vault.playerState(player);
  return {
    tierNext: Number(state.tierNext),
    run: {
      tier: Number(state.run.tier),
      ticketsPaid: Number(state.run.ticketsPaid),
      startedAt: Number(state.run.startedAt),
      active: Boolean(state.run.active),
    },
    reward: BigInt(state.reward),
    nonce: BigInt(state.nonce),
    dailyUsed: BigInt(state.dailyUsed),
    pool: BigInt(state.pool),
    checkInExpiry: Number(state.checkInExpiry),
    epoch: Number(state.epoch),
  };
}

export async function fetchRewardOf(provider: Provider, tier: number): Promise<bigint> {
  if (!GAME_VAULT_ADDRESS) return 0n;
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  return BigInt(await vault.rewardOf(tier));
}

export async function fetchCurrentEpoch(provider: Provider): Promise<number> {
  if (!GAME_VAULT_ADDRESS) return 0;
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  return Number(await vault.currentEpoch());
}

export async function fetchLeaderboardRewardCap(provider: Provider, rank: number): Promise<number> {
  if (!GAME_VAULT_ADDRESS) return 0;
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  return Number(await vault.leaderboardRewardCap(rank));
}

export function levelRangeOf(tier: number): { fromLevel: number; toLevel: number } {
  const fromLevel = 2 + tier * 10;
  return { fromLevel, toLevel: fromLevel + 10 - 1 };
}

export function tierOfLevel(level: number): { tier: number; paid: boolean } {
  if (level <= 1) return { tier: 0, paid: false };
  return { tier: Math.floor((level - 2) / 10), paid: true };
}

export function rewardForTier(econ: VaultEconomics, tier: number): bigint {
  const bonusBps = Math.min(tier * econ.tierBonusBps, econ.tierBonusCapBps);
  return (econ.ticket * BigInt(econ.baseRewardBps + bonusBps)) / 10000n;
}
