import { Link } from "@/i18n/routing";

type Section = {
    title: string;
    paragraphs: string[];
};

type LegalPageTemplateProps = {
    locale: string;
    title: string;
    subtitle: string;
    updatedLabel: string;
    updatedDate: string;
    sections: Section[];
};

export default function LegalPageTemplate({
    locale,
    title,
    subtitle,
    updatedLabel,
    updatedDate,
    sections,
}: LegalPageTemplateProps) {
    const backLabel = locale === "de" ? "Zur Startseite" : "Back to home";

    return (
        <main className="relative min-h-screen bg-[#0a0f1e] px-4 py-24 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.1),transparent_45%)]" />
            <div className="relative mx-auto max-w-4xl">
                <div className="rounded-[30px] border border-white/10 bg-[#08101d]/88 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-8">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72 hover:bg-white/[0.08] hover:text-white"
                    >
                        {backLabel}
                    </Link>

                    <h1 className="mt-6 font-[family-name:var(--font-outfit)] text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm leading-7 text-white/56">{subtitle}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                        {updatedLabel}: {updatedDate}
                    </p>

                    <div className="mt-8 space-y-6">
                        {sections.map((section) => (
                            <section
                                key={section.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5"
                            >
                                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                                <div className="mt-3 space-y-3">
                                    {section.paragraphs.map((paragraph, index) => (
                                        <p key={`${section.title}-${index}`} className="text-sm leading-7 text-white/62">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

