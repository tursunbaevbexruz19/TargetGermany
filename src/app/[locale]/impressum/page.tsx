import LegalPageTemplate from "@/components/legal/LegalPageTemplate";

const UPDATED_DATE = "24 March 2026";

export default async function ImpressumPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isGerman = locale === "de";

    const content = isGerman
        ? {
            title: "Impressum",
            subtitle: "Anbieterkennzeichnung gemaess deutschen Informationspflichten.",
            updatedLabel: "Zuletzt aktualisiert",
            sections: [
                {
                    title: "1. Anbieter",
                    paragraphs: [
                        "Target International School, Germany Branch",
                        "Berlin, Deutschland",
                        "E-Mail: info@target-germany.de | Telefon: +49 30 1234 5678",
                    ],
                },
                {
                    title: "2. Vertretungsberechtigte Personen",
                    paragraphs: [
                        "Geschaeftsleitung: Target International School Management Team",
                        "Bei Unternehmensregister- oder USt-IdNr.-Angaben bitte vor Produktionsstart die finalen Werte ergaenzen.",
                    ],
                },
                {
                    title: "3. Inhaltlich verantwortlich",
                    paragraphs: [
                        "Verantwortlich fuer journalistisch-redaktionelle Inhalte: Target International School, Germany Branch",
                    ],
                },
                {
                    title: "4. Urheberrecht",
                    paragraphs: [
                        "Die auf dieser Website veroeffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht.",
                        "Jede Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des Rechteinhabers.",
                    ],
                },
                {
                    title: "5. Haftung fuer Inhalte und Links",
                    paragraphs: [
                        "Wir sind fuer eigene Inhalte nach den allgemeinen Gesetzen verantwortlich.",
                        "Bei externen Links haben wir keinen dauerhaften Einfluss auf die Inhalte verlinkter Seiten; fuer diese sind ausschliesslich deren Betreiber verantwortlich.",
                    ],
                },
            ],
        }
        : {
            title: "Imprint",
            subtitle: "Provider identification according to German legal notice requirements.",
            updatedLabel: "Last updated",
            sections: [
                {
                    title: "1. Provider",
                    paragraphs: [
                        "Target International School, Germany Branch",
                        "Berlin, Germany",
                        "Email: info@target-germany.de | Phone: +49 30 1234 5678",
                    ],
                },
                {
                    title: "2. Authorized Representatives",
                    paragraphs: [
                        "Management: Target International School Management Team",
                        "Before production launch, add final commercial register and VAT identification details where applicable.",
                    ],
                },
                {
                    title: "3. Editorial Responsibility",
                    paragraphs: [
                        "Responsible for editorial content: Target International School, Germany Branch",
                    ],
                },
                {
                    title: "4. Copyright",
                    paragraphs: [
                        "Content and works published on this website are protected by German copyright law.",
                        "Any use beyond statutory copyright limits requires prior written permission from the rights holder.",
                    ],
                },
                {
                    title: "5. Liability for Content and Links",
                    paragraphs: [
                        "We are responsible for our own content under general law.",
                        "For external links, responsibility for linked content rests solely with the respective third-party operators.",
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

