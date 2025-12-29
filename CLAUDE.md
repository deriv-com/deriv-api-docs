# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm run bootstrap      # Initial setup: install dependencies and build
npm run dev            # Start development server
npm run build          # Production build
npm run serve          # Serve production build locally
```

### Testing

```bash
npm test              # Run all tests with coverage
npm run typecheck     # Run TypeScript type checking
```

### Code Quality

```bash
npm run lint          # Lint JS/JSX/TS/TSX files
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
```

### Docusaurus

```bash
npm run clear         # Clear Docusaurus cache
npm run swizzle       # Customize Docusaurus theme components
```

## Architecture Overview

This is a **Docusaurus 3** application for Deriv's API documentation, featuring interactive API testing and token management. The backend team manages `/config/v3` via workflow (API schemas) — the frontend team should **not** modify this folder.

### Key Features

1. **API Explorer** (`/src/features/Apiexplorer/`)

   - Interactive playground for testing API endpoints in real-time
   - Dynamically imports JSON schemas from `/config/v3/{endpoint}/` (send.json, receive.json, example.json)
   - URL hash-based navigation for endpoint selection
   - Uses `useDynamicImportJSON` hook for loading schemas and examples

2. **Dashboard** (`/src/features/dashboard/`)

   - Tab-based interface for managing API tokens and applications
   - Five tabs: MANAGE_TOKENS, REGISTER_APP, MANAGE_APPS, UPDATE_APP, REGISTER_TOKENS
   - Token scopes management (read, trade, payments, trading_information, admin)

3. **Authentication Flow**

   - OAuth2 integration via `@deriv-com/auth-client`
   - Login → OAuth redirect → Callback page → Auto-authorize token
   - Alternative: URL parameter authentication (`?acct1=xxx&token1=yyy`)
   - Session storage for account persistence

4. **WebSocket Layer**
   - Singleton `ApiManager` wraps `@deriv/deriv-api` (DerivAPIBasic)
   - Ping/pong keep-alive (12s interval)
   - Auto-reconnect with exponential backoff (10 attempts)
   - Typed requests/responses via `@deriv/api-types`

### Context Hierarchy

All contexts are nested in `/src/theme/Root.tsx`:

```
Root
├─ OfficialContentsProvider  # Domain validation (official Deriv domains only)
├─ AuthProvider              # User auth state, WebSocket connection, session storage
├─ PlaygroundProvider        # API request/response history (max 5 items, FIFO)
├─ ApiTokenProvider          # User's API tokens (watches is_authorized)
└─ AppManagerContextProvider # Registered applications, dashboard tabs
```

**Context Interdependencies:**

- `ApiTokenProvider` and `AppManagerContextProvider` auto-fetch data when `AuthProvider.is_authorized` becomes true
- `PlaygroundProvider` stores responses from API requests (stateless history)

### WebSocket Hooks

**useWS<T>** - For one-off API requests:

- Returns: `{ send, data, full_response, is_loading, error, clear }`
- Auto-injects endpoint name into payload (unless `disableApiNameOnRequest` is true)
- Uses `apiManager.augmentedSend()`

**useSubscription<T>** - For streaming endpoints:

- Returns: `{ subscribe, unsubscribe, is_subscribed, data, full_response }`
- Uses RxJS Observable pattern via `apiManager.augmentedSubscribe()`
- Manages subscription lifecycle

### Environment Configuration

**App IDs:**

- Localhost: `35074` (default WebSocket: `ws.derivws.com`)
- Staging domains: `app_id=35075`
- Production domains: `app_id=35074`

**Environment Handling:**

- Multi-domain support: deriv.com, deriv.me, deriv.be (with staging variants)
- `getAppId()` and `getServerConfig()` utilities handle environment detection
- LocalStorage can override WebSocket/OAuth server URLs for testing

## AI Code Generation Rules

**CRITICAL:** All AI-generated code must be wrapped with `[AI]` and `[/AI]` markers using the appropriate comment syntax for the language. This is enforced by the ShiftAI pre-commit hook (`@deriv-com/shiftai-cli`).

**JavaScript/TypeScript:**

```javascript
function exampleFunction() {
  return 'AI generated code';
}
```

**HTML:**

```html
<!-- [AI] -->
<div>AI generated HTML</div>
```

**CSS/SCSS:**

```css
.ai-generated {
  color: blue;
}
```

**Anti-patterns (NEVER do these):**

- ❌ Do NOT nest `[AI]` markers inside existing AI blocks
- ❌ Do NOT add comments on the same line as markers: `// [AI] Updated Dashboard`
- ❌ Do NOT add AI markers to deleted/commented-out code

The pre-commit hook automatically strips these markers before commit. See [.cursorrules](.cursorrules) for full details.

## Testing

**Test Environment:** `jsdom` with `ts-jest`

**Custom Test Render:**

```typescript
import { render } from '@site/src/test-utils'; // Wraps with all providers + router
```

**Coverage Exclusions:**

- `src/configs/**` (WebSocket config)
- `src/pages/**` (Docusaurus pages - module naming issues)
- `src/theme/**` (Docusaurus theme - module naming issues)

**Test File Locations:**

- Adjacent `__tests__/` directories
- `*.test.tsx` files

**Mocked Globals:**

- `localStorage` / `sessionStorage` (jest-localstorage-mock)
- `window.location` (jest-location-mock)
- `ResizeObserver` (for Radix UI components)
- `window.matchMedia` (for responsive hooks)
- YAML parser (returns hardcoded endpoint list)

## Git Hooks

**Pre-commit:**

1. Runs `lint-staged` (ESLint auto-fix on staged JS files)
2. Runs ShiftAI hook to detect and strip `[AI]` markers

**Pre-push:**

- Custom validation (incomplete script in repo)

**Commit Messages:**

- Enforced by `commitlint` (conventional commits format)

## Key Utilities

- **getAppId()**: Environment-based app ID selection
- **getServerConfig()**: WebSocket/OAuth server URLs (with LocalStorage override)
- **getAccountsFromSearchParams()**: Parses OAuth callback parameters
- **scopesObjectToArray() / scopesArrayToObject()**: Token scope conversion
- **formatTokenScope()**: Human-readable scope formatting
- **getTmbConfigUrl()**: Firebase remote config URL (production vs staging)

## Important Notes

- The `/config/v3` folder is managed by the backend team via CI/CD workflow — do not manually edit
- Each endpoint directory contains: `send.json` (request schema), `receive.json` (response schema), `example.json` (sample payload)
- Session storage keys: `login-accounts`, `current-login-account`, `user`, `user-accounts`
- TypeScript types are generated from `@deriv/api-types` package
- Docusaurus version: 3.3.2 (do not use Docusaurus v2 syntax)
<!-- [/AI] -->
