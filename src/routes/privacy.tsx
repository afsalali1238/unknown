import { createFileRoute, Link } from "@tanstack/react-router";
import { MicroLabel } from "@/components/MicroLabel";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy — ${APP_NAME}` },
      {
        name: "description",
        content: `How ${APP_NAME} handles your data: everything stays on your device.`,
      },
    ],
  }),
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <article className="px-5 pt-8 pb-10">
      <Link to="/you" className="inline-flex items-center gap-2">
        <MicroLabel>← You</MicroLabel>
      </Link>
      <MicroLabel className="mt-6 block">Privacy policy</MicroLabel>
      <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">Your data stays with you</h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        Effective 10 September 2026
      </p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink">
        <section>
          <h2 className="font-serif text-xl text-ink">The short version</h2>
          <p className="mt-2 text-ink-soft">
            {APP_NAME} works fully offline and keeps everything on your device. There are no
            accounts, no analytics, no advertising, and no crash reporting in this version. We
            cannot see, sell, or leak your reading progress — we never receive it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">What is stored on your device</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
            <li>
              Learning progress: bookmarks, quiz answers, review schedule, streaks, daily goals.
            </li>
            <li>Your own content: glossary terms, scratchpad notes, interests, reading queue.</li>
            <li>Preferences: theme, narration speed and voice, dismissed hints.</li>
          </ul>
          <p className="mt-2 text-ink-soft">
            This lives in your browser's on-device storage (IndexedDB and Cache Storage). Deleting
            the app's site data — or using a browser "clear data" option — permanently removes it.
            The Export feature in the You tab lets you take a copy with you.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">What leaves your device</h2>
          <p className="mt-2 text-ink-soft">
            Loading the app fetches its pages, and your browser fetches fonts from Google Fonts.
            When it does, Google receives the standard connection details (such as IP address and
            browser type) under Google's own privacy policy. We are removing even this dependency so
            future versions make no third-party requests at all.
          </p>
          <p className="mt-2 text-ink-soft">
            Links you choose to open under "Further reading" take you to third-party websites, which
            have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Children</h2>
          <p className="mt-2 text-ink-soft">
            Because the app collects no personal data and requires no account, there is nothing to
            opt a child out of. The content is general educational material.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Changes to this policy</h2>
          <p className="mt-2 text-ink-soft">
            If a future version adds anything that touches your data — for example optional,
            privacy-respecting error reporting — this policy will be updated first, and the app will
            ask before enabling it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Contact</h2>
          <p className="mt-2 text-ink-soft">
            {CONTACT_EMAIL ? (
              <>
                Questions about this policy:{" "}
                <a className="underline hover:text-ink" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                .
              </>
            ) : (
              "Support contact details will be published here before the public launch."
            )}
          </p>
        </section>
      </div>
    </article>
  );
}
