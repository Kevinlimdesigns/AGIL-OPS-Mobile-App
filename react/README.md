# Responder App — React reference source

Reference implementation only. The build target is Kotlin / Jetpack Compose;
this source exists so behaviour is specified precisely and can be exercised.

```
npm install
npm run dev      # http://localhost:5173
npm test         # selection-model unit tests
```

Design tokens are mirrored from `../DESIGN.md` into `src/design/tokens.js` and
exposed as CSS custom properties — components read the variables, never raw hex.
Both themes ship (`data-theme="dark"` / `"light"` on `<html>`).
