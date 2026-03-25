import LegalPageTemplate from "@/components/legal/LegalPageTemplate";

const UPDATED_DATE = "24 March 2026";

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isGerman = locale === "de";

    const content = isGerman
        ? {
            title: "Nutzungsbedingungen",
            subtitle: "Bedingungen fuer die Nutzung der Website von Target International School Germany Branch.",
            updatedLabel: "Zuletzt aktualisiert",
            sections: [
                {
                    title: "1. Geltungsbereich",
                    paragraphs: [
                        "Diese Website dient der Information ueber Bildungsangebote, Sprachprogramme und Aufnahmeprozesse.",
                        "Mit der Nutzung dieser Website akzeptieren Sie diese Bedingungen.",
                    ],
                },
                {
                    title: "2. Inhalte und Verfuegbarkeit",
                    paragraphs: [
                        "Wir aktualisieren Inhalte regelmaessig, koennen jedoch keine jederzeitige Vollstaendigkeit, Fehlerfreiheit oder Verfuegbarkeit garantieren.",
                        "Angebote und Aufnahmebedingungen koennen sich je nach akademischem Jahr und gesetzlichen Rahmenbedingungen aendern.",
                    ],
                },
                {
                    title: "3. Zulassungs- und Beratungshinweise",
                    paragraphs: [
                        "Informationen zu Studium, Sprachkursen und Karrierepfaden stellen keine verbindliche Zusage auf Aufnahme, Visumserteilung oder Universitaetsplatz dar.",
                        "Individuelle Entscheidungen treffen zustaendige Institutionen und Behoerden.",
                    ],
                },
                {
                    title: "4. Geistiges Eigentum und Urheberrecht",
                    paragraphs: [
                        "Alle Inhalte dieser Website, einschliesslich Texte, Bilder, Grafiken, Logos, Layout und Markenelemente, sind urheberrechtlich geschuetzt.",
                        "Vervielfaeltigung, Verbreitung oder kommerzielle Nutzung beduerfen der vorherigen schriftlichen Zustimmung von Target International School.",
                    ],
                },
                {
                    title: "5. Haftung",
                    paragraphs: [
                        "Wir haften unbeschraenkt bei Vorsatz und grober Fahrlaessigkeit sowie bei Verletzung von Leben, Koerper oder Gesundheit.",
                        "Bei einfacher Fahrlaessigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und beschraenkt auf den vorhersehbaren Schaden.",
                    ],
                },
                {
                    title: "6. Externe Links",
                    paragraphs: [
                        "Diese Website kann Links zu externen Seiten enthalten. Fuer deren Inhalte und Datenschutzpraktiken sind ausschliesslich deren Betreiber verantwortlich.",
                    ],
                },
                {
                    title: "7. Anwendbares Recht",
                    paragraphs: [
                        "Es gilt das Recht der Bundesrepublik Deutschland, soweit dem keine zwingenden Verbraucherschutzvorschriften entgegenstehen.",
                    ],
                },
            ],
        }
        : {
            title: "Terms of Service",
            subtitle: "Terms for using the Target International School Germany Branch website.",
            updatedLabel: "Last updated",
            sections: [
                {
                    title: "1. Scope",
                    paragraphs: [
                        "This website provides information about education pathways, language programs, and admissions support.",
                        "By using this website, you agree to these terms.",
                    ],
                },
                {
                    title: "2. Content and Availability",
                    paragraphs: [
                        "We regularly update information, but we cannot guarantee uninterrupted availability or complete error-free content at all times.",
                        "Programs and admissions conditions may change by academic cycle and legal requirements.",
                    ],
                },
                {
                    title: "3. Admissions and Guidance Disclaimer",
                    paragraphs: [
                        "Information about study, language, and career pathways does not constitute a guaranteed offer of admission, visa approval, or university placement.",
                        "Final decisions are made by the relevant institutions and public authorities.",
                    ],
                },
                {
                    title: "4. Intellectual Property and Copyright",
                    paragraphs: [
                        "All website content, including text, images, graphics, logos, layout, and brand assets, is protected by copyright and related rights.",
                        "Reproduction, redistribution, or commercial use requires prior written permission from Target International School.",
                    ],
                },
                {
                    title: "5. Liability",
                    paragraphs: [
                        "We are fully liable for intent, gross negligence, and injury to life, body, or health.",
                        "For simple negligence, liability applies only to breach of essential obligations and is limited to foreseeable damage.",
                    ],
                },
                {
                    title: "6. External Links",
                    paragraphs: [
                        "This site may link to third-party websites. Their operators are solely responsible for their own content and privacy practices.",
                    ],
                },
                {
                    title: "7. Governing Law",
                    paragraphs: [
                        "German law applies unless mandatory consumer protection rules provide otherwise.",
                    ],
                },
            ],
        };

    return (
        <LegalPageTemplate
            locale={locale}
            title={content.title}
            subtitle={content.subtitle}
            updatedLabel={content.updatedLabel}
            updatedDate={UPDATED_DATE}
            sections={content.sections}
        />
    );
}

