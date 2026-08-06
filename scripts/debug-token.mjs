import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://bsc-rpc.publicnode.com");
const token = "0x7685ac3047ee9C95798E4DA688c890CD25Ff7777";
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const PCS_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const ROUTER_FACTORY = "0x55BEcE79cA9a9a6a86b92b023e82D97137fCC57f"; // 简单官网 default factory

const ERC20_ABI = ["function name() view returns (string)", "function symbol() view returns (string)", "function decimals() view returns (uint8)", "function totalSupply() view returns (uint256)", "function balanceOf(address) view returns (uint256)"];
const TOKEN_ABI = [
  ...ERC20_ABI,
  "function launchVault() view returns (address)",
  "function liquidityPair() view returns (address)",
  "function automatedMarketMakerPairs(address) view returns (bool)",
  "function taxExempt(address) view returns (bool)",
  "function factory() view returns (address)",
];
const VAULT_ABI = [
  "function factory() view returns (address)",
  "function token() view returns (address)",
  "function pairedAsset() view returns (address)",
  "function mintPrice() view returns (uint256)",
  "function totalMints() view returns (uint256)",
  "function mintedCount() view returns (uint256)",
  "function whitelistMintLimit() view returns (uint256)",
  "function publicMintLimit() view returns (uint256)",
  "function whitelistMintCount() view returns (uint256)",
  "function publicMintCount() view returns (uint256)",
  "function whitelistAccount(address) view returns (bool)",
  "function mintOpen() view returns (bool)",
  "function whitelistActive() view returns (bool)",
  "function launchFinalized() view returns (bool)",
];
const PAIR_ABI = ["function getReserves() view returns (uint112,uint112,uint32)", "function token0() view returns (address)", "function token1() view returns (address)", "function totalSupply() view returns (uint256)", "function balanceOf(address) view returns (uint256)"];
const FACTORY_ABI = ["function getPair(address,address) view returns (address)"];

async function main() {
  const t = new ethers.Contract(token, TOKEN_ABI, provider);
  console.log("=== Token ===");
  console.log("address:", token);
  try { console.log("name:", await t.name()); } catch (e) { console.log("name error:", e.shortMessage || e.message); }
  try { console.log("symbol:", await t.symbol()); } catch (e) { console.log("symbol error:", e.shortMessage || e.message); }
  try { console.log("decimals:", await t.decimals()); } catch (e) { console.log("decimals error:", e.shortMessage || e.message); }
  try { console.log("totalSupply:", (await t.totalSupply()).toString()); } catch (e) { console.log("totalSupply error:", e.shortMessage || e.message); }

  let vault;
  try {
    vault = await t.launchVault();
    console.log("launchVault:", vault);
  } catch (e) { console.log("launchVault error:", e.shortMessage || e.message); }

  try { console.log("liquidityPair:", await t.liquidityPair()); } catch (e) { console.log("liquidityPair error:", e.shortMessage || e.message); }
  try { console.log("token factory:", await t.factory()); } catch (e) { console.log("token factory error:", e.shortMessage || e.message); }

  if (!vault) return;
  const v = new ethers.Contract(vault, VAULT_ABI, provider);
  console.log("\n=== Vault ===");
  console.log("address:", vault);
  const calls = [
    ["factory", v.factory()],
    ["token", v.token()],
    ["pairedAsset", v.pairedAsset()],
    ["mintPrice", v.mintPrice()],
    ["totalMints", v.totalMints()],
    ["mintedCount", v.mintedCount()],
    ["whitelistMintLimit", v.whitelistMintLimit()],
    ["publicMintLimit", v.publicMintLimit()],
    ["whitelistMintCount", v.whitelistMintCount()],
    ["publicMintCount", v.publicMintCount()],
    ["mintOpen", v.mintOpen()],
    ["whitelistActive", v.whitelistActive()],
    ["launchFinalized", v.launchFinalized()],
  ];
  for (const [label, promise] of calls) {
    try { const r = await promise; console.log(label+":", r.toString ? r.toString() : r); } catch (e) { console.log(label+" error:", e.shortMessage || e.message); }
  }

  // Check pair state
  const vaultFactoryAddr = await v.factory().catch(() => null);
  const paired = await v.pairedAsset().catch(() => WBNB);
  const factoryAddr = vaultFactoryAddr || ROUTER_FACTORY;
  console.log("\n=== Pair lookup ===");
  console.log("factory used:", factoryAddr);
  const factory = new ethers.Contract(factoryAddr, FACTORY_ABI, provider);
  const pair = await factory.getPair(token, paired);
  console.log("pair:", pair);
  if (pair && pair !== ethers.ZeroAddress) {
    const p = new ethers.Contract(pair, PAIR_ABI, provider);
    try {
      const [r0, r1, ts] = await p.getReserves();
      const t0 = await p.token0();
      const t1 = await p.token1();
      console.log("token0:", t0);
      console.log("token1:", t1);
      console.log("reserve0:", r0.toString());
      console.log("reserve1:", r1.toString());
      console.log("pair totalSupply:", (await p.totalSupply()).toString());
      console.log("pair balance of vault:", (await p.balanceOf(vault)).toString());
    } catch (e) { console.log("pair read error:", e.shortMessage || e.message); }
  }

  // Also check PancakeSwap canonical factory
  console.log("\n=== PancakeSwap canonical pair ===");
  const pcsFactory = new ethers.Contract(PCS_FACTORY, FACTORY_ABI, provider);
  const pcsPair = await pcsFactory.getPair(token, WBNB);
  console.log("pcsPair:", pcsPair);
  if (pcsPair && pcsPair !== ethers.ZeroAddress) {
    const p = new ethers.Contract(pcsPair, PAIR_ABI, provider);
    try {
      const [r0, r1] = await p.getReserves();
      console.log("reserve0:", r0.toString());
      console.log("reserve1:", r1.toString());
    } catch (e) { console.log("pcs pair read error:", e.shortMessage || e.message); }
  }

  // Vault token balance
  console.log("\n=== Balances ===");
  try { console.log("vault token balance:", (await t.balanceOf(vault)).toString()); } catch (e) {}
  try { console.log("vault BNB balance:", (await provider.getBalance(vault)).toString()); } catch (e) {}
}

main().catch(console.error);
