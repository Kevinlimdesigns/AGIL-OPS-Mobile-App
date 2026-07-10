# AGIL Mobile — Research & Credible Sources

Maps every design decision made so far to credible, public sources. Scope: components, sizing,
typography, colour/status, loading, and public-safety patterns. Target: Android (Kotlin/Compose),
dark theme, field/public-safety use.

## 1. Touch targets & button sizing
| Decision | Value | Source |
|---|---|---|
| Standard touch target | **≥ 48 dp** (Android) / 44 pt (iOS) | [Material 3 — Accessibility](https://m3.material.io/foundations/designing/structure) · [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Critical / field / gloved actions | **56–64 dp** (we use 56 critical, 64 PTT/SOS) | [Tap-target sizing — emergency/critical 60px+](https://blog.openreplay.com/improving-tap-targets-mobile-ux/) · [Target size guidance](https://www.flexy.global/resources/digital-product-design/master-digital-product-design-ux-tips-for-target-size) |
| Min spacing between targets | **≥ 8 dp** | Material 3 / Apple HIG |

## 2. Typography
| Decision | Value | Source |
|---|---|---|
| Body / primary content | **16 sp** (`text-base`) | [Material 3 type scale](https://m3.material.io/styles/typography/type-scale-tokens) · [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| Minimum legible size | **never < 12 sp**; 11 pt absolute floor | Apple HIG (≥ 11 pt) |
| Type ramp / hierarchy | AOH `text-xs…2xl` (Geist) | mirrors Material/ShadCN type scale |
| Command-&-control type guidance | Open Sans / Roboto / system | [Astro UXDS — Typography](https://cms.astrouxds.com/design-guidelines/typography) |

## 3. Colour & status
| Decision | Value | Source |
|---|---|---|
| Severity scale (info/normal/caution/serious/critical) | temperature scale, each = colour + symbol | [Astro UXDS — Status System](https://www.astrouxds.com/patterns/status-system/) (Critical #FF2A04, Serious #FFAF3D, Caution #FAD800, Normal #00E200, Standby #64D9FF) |
| Status must not rely on colour alone | colour **+ icon + label** | Astro Status System · [WCAG 2.2 (1.4.1 Use of Color)](https://www.w3.org/TR/WCAG22/) |
| Contrast | text ≥ 4.5:1, large/UI ≥ 3:1 | [WCAG 2.2 (1.4.3 / 1.4.11)](https://www.w3.org/TR/WCAG22/) |
| Dispatch palette (blue + gunmetal-gray, red for response) | — | Priority Dispatch 911 brand system |
| Dark mode — avoid pure black, surface variants | soft dark grays | [LogRocket — Dark mode best practices](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/) |

## 4. Loading states
| Decision | Value | Source |
|---|---|---|
| Skeleton for content; spinner for actions | per layout archetype | [NN/g — Skeleton screens](https://www.nngroup.com/articles/skeleton-screens/) · [Material 3 — Progress indicators](https://m3.material.io/components/progress-indicators) |
| Keep last-known state for real-time (PTT/live) | don't blank actionable info | FirstNet/field UX guidance |

## 5. Components & design-system method
| Decision | Source |
|---|---|
| Single source of truth, token-driven, reuse components | [Figma — Design systems best practices](https://www.figma.com/best-practices/) · ShadCN/Material token model |
| Mobile component sizing benchmarked to M3 | [Material 3 components](https://m3.material.io/components) |

## 6. Public-safety product benchmark (features)
- [Motorola CommandCentral Responder](https://www.motorolasolutions.com/en_us/products/command-center-software/public-safety-software/field-response-and-reporting/commandcentralresponder.html)
- [FirstNet — Apps for First Responders](https://firstnet.gov/network/TT/apps-first-responders) · [CivicEye](https://www.civiceye.com/mobile-public-safety-software/) · [Versaterm CAD](https://www.versaterm.com/solution/cad/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) · [Material 3](https://m3.material.io/) · [Astro UXDS](https://www.astrouxds.com/) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

> Note: links were gathered via web search and are credible primary/industry sources; vendor apps
> (Motorola/SYNCH-class) don't publish full design specs, so sizing/type/colour decisions are grounded
> in the open standards those products follow (Material, HIG, WCAG, Astro) plus category feature references.
