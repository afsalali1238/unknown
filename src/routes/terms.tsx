import { createFileRoute, Link } from "@tanstack/react-router";
import { MicroLabel } from "@/components/MicroLabel";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms — ${APP_NAME}` },
      { name: "description", content: `Terms of use for ${APP_NAME}.` },
    ],
  }),
  component: TermsScreen,
});

function TermsScreen() {
  return (
    <article className="px-5 pt-8 pb-10">
      <Link to="/you" className="inline-flex items-center gap-2">
        <MicroLabel>← You</MicroLabel>
      </Link>
      <MicroLabel className="mt-6 block">Terms of use</MicroLabel>
      <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">The fine print, briefly</h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        Effective 10 September 2026
      </p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink">
        <section>
          <h2 className="font-serif text-xl text-ink">What this is</h2>
          <p className="mt-2 text-ink-soft">
            {APP_NAME} is a personal learning app: layered explanations of ideas, quizzes, spaced
            repetition, and links to further reading. It is provided for personal, non-commercial
            study.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Content</h2>
          <p className="mt-2 text-ink-soft">
            Explanations in the app are original summaries written for study purposes. Quoted and
            archived material is attributed to its source with a link to the original. External
            links lead to third-party sites we don't control. If you hold rights to material you
            believe is misused here, contact us and we will promptly review it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Your content</h2>
          <p className="mt-2 text-ink-soft">
            Notes, glossary terms, and progress you create stay on your device (see the Privacy
            policy). They are yours; we claim no rights over them because we never receive them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Acceptable use</h2>
          <p className="mt-2 text-ink-soft">
            Don't misuse the app: no scraping or bulk redistribution of its content, no attempts to
            disrupt the service, nothing unlawful. Automated access that degrades the service for
            others may be blocked.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">No warranty</h2>
          <p className="mt-2 text-ink-soft">
            The app and its content are provided "as is", without warranties of any kind. Study
            content may contain errors despite our review process; verify anything you rely on
            against the cited sources.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Liability</h2>
          <p className="mt-2 text-ink-soft">
            To the maximum extent permitted by law, we are not liable for any indirect or
            consequential loss arising from your use of the app.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Changes</h2>
          <p className="mt-2 text-ink-soft">
            These terms may change as the app evolves. Material changes will be noted in the app
            before they take effect. Continued use after a change means you accept the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink">Contact</h2>
          <p className="mt-2 text-ink-soft">
            {CONTACT_EMAIL ? (
              <>
                Questions about these terms:{" "}
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
