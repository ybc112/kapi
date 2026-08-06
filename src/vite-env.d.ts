/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_TOKEN_ADDRESS?: string;
  readonly VITE_GAME_VAULT_ADDRESS?: string;
  readonly VITE_GAME_LEVEL_FEE?: string;
  readonly VITE_GAME_ITEM_FEE?: string;
  readonly VITE_GAME_WIN_REWARD?: string;
  readonly VITE_GAME_LEVELS_FOR_REWARD?: string;
  readonly VITE_GAME_SIGNER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
