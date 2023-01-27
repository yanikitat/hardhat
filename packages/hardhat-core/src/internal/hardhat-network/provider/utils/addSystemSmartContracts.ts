import { SYSTEM_SMART_CONTRACTS } from "precompiled_smart_contracts";
import { StateManager } from "@nomicfoundation/ethereumjs-statemanager";

export async function addSystemSmartContracts(stateManager: StateManager) {
  for (const smartContact of SYSTEM_SMART_CONTRACTS) {
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
