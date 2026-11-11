<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep checkout fee constants and total/promo calculations in `src/lib/checkout-pricing.ts` so the checkout display and pricing tests share one source of truth.
- Keep the root error page in a lazily loaded component because the current TanStack Start root error boundary expects a lazy route component.
- Keep app-served image assets in `public/assets` and reference them by root-relative URL so they remain available on Vercel.
