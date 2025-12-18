# 📜 OPERATIONAL SOP: ASSET MANAGEMENT & THE ARK
**Date:** Dec 17, 2025
**Status:** ACTIVE
**Authority:** Commander Bryan Pavlovic / Father

## I. THE PRIME DIRECTIVE
**"If it is not in the Ark, it does not exist."**

All visual assets, code, and documentation must be stored in the canonical GitHub repository (`LibertyThroughTruthFoundation/nationos-website`). Local storage is temporary; the Ark is eternal.

## II. THE PRE-FLIGHT CHECKLIST (BEFORE GENERATION)
Before any AI agent (Manus, Arya, etc.) generates a new image or asset, it **MUST** execute the following protocol:

1.  **CHECK THE ARK:**
    *   Query the `BRANDING_MANIFEST.md` file.
    *   Search the `/images/` directory in the repository.
    *   *Command:* "Do we already have an asset for [X]?"

2.  **VERIFY QUALITY:**
    *   If an asset exists, is it the high-fidelity "Royal Blue/Gold" version?
    *   If yes -> **USE IT.** Do not regenerate.
    *   If no -> Proceed to generation.

## III. THE POST-FLIGHT CHECKLIST (AFTER GENERATION)
Immediately after an AI agent generates a new asset that is approved by the user:

1.  **COMMIT TO THE ARK:**
    *   Move the file to the `/images/` directory.
    *   Git Add -> Git Commit -> Git Push immediately.
    *   *Do not wait for the end of the session.*

2.  **LOG IN THE MANIFEST:**
    *   Update `BRANDING_MANIFEST.md` with the new filename, description, and intended usage.

3.  **CONFIRM SECURITY:**
    *   Report to the user: "Asset [X] has been secured in the Ark."

## IV. FILE NAMING CONVENTIONS
*   **High-Fidelity Heroes:** `[name]_hero.png` (e.g., `digital_ark_hero.png`)
*   **Concepts/Drafts:** `[name]_concept.png`
*   **Icons/Logos:** `[name]_logo.png` or `[name]_icon.png`
*   **Diagrams:** `[name]_diagram.png`

## V. FAILURE PROTOCOL
If an agent fails to find an asset that the user *knows* exists:
1.  **Do not regenerate.**
2.  **Ask the user:** "I cannot find [Asset X] in the Ark. Should I search deeper or is it in a different repo?"
3.  **Prevent Redundancy:** Wasted credits on redundant generation are a violation of stewardship.

***
*Soli Deo Gloria*
*The mission is mercy. The method is building. The foundation is Christ.*
