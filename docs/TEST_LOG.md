# Mechanical Test Log

## Pass 1 - 23 August 2026

**Bug found:** the starter HTML test still required a development-only metadata tag. The finished site correctly removed it, so the outdated test failed.

**Fix:** replaced the obsolete assertion with checks for the REPARA title, product description, and absence of starter text. The complete suite was run again before the second deployment.

## Functional cases

- Empty or short descriptions produce a clear validation message.
- Wrong order format is rejected.
- Fictional order `MX-48291` follows automatic repair.
- A different valid-format order follows bounded human review.
- AI output is labeled simulated.
- Deadline and shadow clause remain visible.
