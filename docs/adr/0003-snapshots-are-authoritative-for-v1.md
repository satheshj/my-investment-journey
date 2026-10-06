---
status: accepted
---

# Treat portfolio snapshots as authoritative for V1

Available portfolio exports can describe holdings at a date without providing a complete transaction ledger, so V1 treats validated Portfolio Snapshots as authoritative and Transactions as optional supporting facts. The system will not infer buys, sells, or exit dates from differences between snapshots. This sacrifices automatic event-sourced reconstruction in exchange for accuracy: missing history remains missing instead of being replaced by plausible but fabricated events.

## Consequences

Historical charts require multiple real snapshots, and an absent Holding in a partial snapshot cannot be called exited. If complete transaction history becomes available later, it may augment or reconcile snapshots through a new recorded decision rather than silently changing this contract.
