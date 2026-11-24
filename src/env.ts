import { defineEnvVars } from '@sveltejs/kit/env';

// SvelteKit 3: every env var must be declared here.
// `public: true`  -> importable in browser code via `$app/env/public`
// `static: true`  -> value inlined at build time (like the old `$env/static/public`)
export const variables = defineEnvVars({
	PUBLIC_SUPABASE_URL: { public: true, static: true },
	PUBLIC_SUPABASE_PUBLISHABLE_KEY: { public: true, static: true }
});
