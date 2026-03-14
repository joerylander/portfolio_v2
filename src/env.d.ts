/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly LARAVEL_API_URL: string
  readonly LARAVEL_API_TOKEN: string
  readonly RESEND_API_KEY: string
  readonly VERCEL_DEPLOY_HOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
