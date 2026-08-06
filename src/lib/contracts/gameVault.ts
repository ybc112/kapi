import { Contract, formatUnits, parseUnits, type Signer, type Provider } from "ethers";

export const CAPY_TOKEN_ADDRESS = "0x7685ac3047ee9C95798E4DA688c890CD25Ff7777";

export const GAME_VAULT_ADDRESS = String(import.meta.env.VITE_GAME_VAULT_ADDRESS ?? "").trim();

export const GAME_TOKEN_ADDRESS = String(import.meta.env.VITE_GAME_TOKEN_ADDRESS ?? CAPY_TOKEN_ADDRESS).trim();

export const LEVEL_FEE_UNITS = String(import.meta.env.VITE_GAME_LEVEL_FEE ?? "100");
export const ITEM_FEE_UNITS = String(import.meta.env.VITE_GAME_ITEM_FEE ?? "50");
export const WIN_REWARD_UNITS = String(import.meta.env.VITE_GAME_WIN_REWARD ?? "500");
export const LEVELS_FOR_REWARD = Number(import.meta.env.VITE_GAME_LEVELS_FOR_REWARD ?? 5);

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
  "function levelFee() view returns (uint256)",
  "function itemFee() view returns (uint256)",
  "function winReward() view returns (uint256)",
  "function levelsForReward() view returns (uint256)",
  "function nonces(address account) view returns (uint256)",
  "function payLevel(uint256 levelNumber)",
  "function useItem()",
  "function claimReward(uint256 nonce, bytes calldata signature)",
  "function fundRewards(uint256 amount)",
  "event LevelPaid(address indexed player, uint256 amount, uint256 levelNumber)",
  "event ItemUsed(address indexed player, uint256 amount)",
  "event RewardClaimed(address indexed player, uint256 amount, uint256 nonce)",
] as const;

export function parseGameAmount(value: string): bigint {
  return parseUnits(value || "0", TOKEN_DECIMALS);
}

export function formatGameAmount(value: bigint): string {
  return formatUnits(value, TOKEN_DECIMALS);
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

export async function payLevel(signer: Signer, levelNumber: number): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const tx = await vault.payLevel(levelNumber);
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

export async function claimReward(signer: Signer, signature: string): Promise<string> {
  if (!GAME_VAULT_ADDRESS) throw new Error("游戏金库地址未配置");
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, signer);
  const signerAddr = await signer.getAddress();
  const nonce = await vault.nonces(signerAddr);
  const tx = await vault.claimReward(nonce, signature);
  await tx.wait();
  return tx.hash;
}

export async function fetchVaultFees(provider: Provider): Promise<{
  levelFee: bigint;
  itemFee: bigint;
  winReward: bigint;
  levelsForReward: bigint;
}> {
  if (!GAME_VAULT_ADDRESS) {
    return {
      levelFee: parseGameAmount(LEVEL_FEE_UNITS),
      itemFee: parseGameAmount(ITEM_FEE_UNITS),
      winReward: parseGameAmount(WIN_REWARD_UNITS),
      levelsForReward: BigInt(LEVELS_FOR_REWARD),
    };
  }
  const vault = new Contract(GAME_VAULT_ADDRESS, gameVaultAbi, provider);
  const [levelFee, itemFee, winReward, levelsForReward] = await Promise.all([
    vault.levelFee(),
    vault.itemFee(),
    vault.winReward(),
    vault.levelsForReward(),
  ]);
  return { levelFee, itemFee, winReward, levelsForReward };
}
