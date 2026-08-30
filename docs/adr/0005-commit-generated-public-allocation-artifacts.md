---
title: Commit generated public allocation artifacts
status: accepted
date: 2026-08-30
---

# Commit generated public allocation artifacts

Private portfolio exports and normalized monetary candidates remain local and ignored by Git. A deterministic importer converts a reviewed dated snapshot into a committed Published Allocation Snapshot containing public instrument facts, allocation percentages, calculation-basis metadata, and source fingerprints. This keeps static builds reproducible without placing account-scale facts in the repository, at the cost of requiring local source files to regenerate or audit a publication.
