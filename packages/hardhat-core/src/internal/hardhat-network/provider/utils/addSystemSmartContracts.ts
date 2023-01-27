import getSystems from "graphitjs-smartcontracts/dist/system/getSystems";
import type { StateManager } from "@nomicfoundation/ethereumjs-statemanager";

export async function addSystemSmartContracts(stateManager: StateManager) {
  for (const smartContact of getSystems()) {
    await stateManager.putContractCode(smartContact.address, smartContact.code);
    if (smartContact.storage.length > 0) {
      for (const storage of smartContact.storage) {
        await stateManager.putContractStorage(
          smartContact.address,
          storage.key,
          storage.value
        );
      }
    }
  }
}
