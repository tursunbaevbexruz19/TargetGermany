import LegalPageTemplate from "@/components/legal/LegalPageTemplate";

const UPDATED_DATE = "24 March 2026";

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isGerman = locale === "de";

    const content = isGerman
        ? {
            title: "Datenschutzerklaerung",
            subtitle:
                "Informationen zur Verarbeitung personenbezogener Daten gemaess DSGVO und BDSG.",
            updatedLabel: "Zuletzt aktualisiert",
            sections: [
                {
                    title: "1. Verantwortlicher",
                    paragraphs: [
                        "Target International School, Germany Branch",
                        "E-Mail: info@target-germany.de | Telefon: +49 30 1234 5678",
                        "Bei Fragen zum Datenschutz kontaktieren Sie uns ueber die oben genannten Kontaktwege.",
                    ],
                },
                {
                    title: "2. Verarbeitungszwecke und Rechtsgrundlagen",
                    paragraphs: [
                        "Wir verarbeiten Daten fuer die Beantwortung von Anfragen, die Vorbereitung von Aufnahmeprozessen sowie den sicheren Betrieb der Website.",
                        "Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), lit. b DSGVO (vorvertragliche Massnahmen) und lit. f DSGVO (berechtigtes Interesse an einem sicheren Webbetrieb).",
                    ],
                },
                {
                    title: "3. Kategorien verarbeiteter Daten",
                    paragraphs: [
                        "Kontakt- und Anfragedaten: Name, E-Mail, Telefonnummer und freiwillige Angaben aus Formularen.",
                        "Technische Daten: Browser- und Geraeteinformationen, Logdaten zur Sicherheit und Fehleranalyse.",
                    ],
                },
                {
                    title: "4. Speicherdauer",
                    paragraphs: [
                        "Wir speichern personenbezogene Daten nur so lange, wie es fuer den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
                        "Anfragedaten werden in der Regel innerhalb von 24 Monaten geloescht, sofern keine laengere gesetzliche Pflicht oder aktive Bewerbung besteht.",
                    ],
                },
                {
                    title: "5. Cookies und Einwilligungsmanagement",
                    paragraphs: [
                        "Notwendige Cookies werden fuer grundlegende Funktionen und den Nachweis Ihrer Einwilligung verwendet.",
                        "Optionale Analyse- und Marketing-Cookies werden erst nach aktiver Zustimmung gesetzt und koennen jederzeit ueber Cookie-Einstellungen angepasst werden.",
                    ],
                },
                {
                    title: "6. Betroffenenrechte",
                    paragraphs: [
                        "Sie haben das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Datenuebertragbarkeit und Widerspruch gemaess Art. 15-21 DSGVO.",
                        "Sie koennen eine erteilte Einwilligung jederzeit mit Wirkung fuer die Zukunft widerrufen.",
                        "Zusaetzlich besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehoerde.",
                    ],
                },
                {
                    title: "7. Datensicherheit",
                    paragraphs: [
                        "Wir verwenden technische und organisatorische Sicherheitsmassnahmen, um Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schuetzen.",
                    ],
                },
            ],
        }
        : {
            title: "Privacy Policy",
            subtitle: "Information about personal data processing under GDPR principles.",
            updatedLabel: "Last updated",
            sections: [
                {
                    title: "1. Data Controller",
                    paragraphs: [
                        "Target International School, Germany Branch",
                        "Email: info@target-germany.de | Phone: +49 30 1234 5678",
                        "For privacy requests, please contact us through the channels above.",
                    ],
                },
                {
                    title: "2. Purposes and Legal Bases",
                    paragraphs: [
                        "We process data to answer inquiries, support admissions workflows, and maintain secure operation of the website.",
                        "Legal bases include consent (Art. 6(1)(a) GDPR), pre-contractual or contractual necessity (Art. 6(1)(b)), and legitimate interest for secure operation (Art. 6(1)(f)).",
                    ],
                },
                {
                    title: "3. Categories of Data",
                    paragraphs: [
                        "Contact and inquiry data: name, email, phone number, and voluntary information from forms.",
                        "Technical data: browser and device metadata, security logs, and diagnostic information.",
                    ],
                },
                {
                    title: "4. Retention Periods",
                    paragraphs: [
                        "Personal data is stored only as long as needed for the relevant purpose or legal retention duties.",
                        "Inquiry records are typically deleted within 24 months unless longer retention is required by law or an active admissions process.",
                    ],
                },
                {
                    title: "5. Cookies and Consent",
                    paragraphs: [
                        "Required cookies are used for core functionality and for storing your consent choices.",
                        "Optional analytics and marketing cookies are activated only after explicit opt-in and can be changed at any time via cookie settings.",
                    ],
                },
                {
                    title: "6. Your Rights",
                    paragraphs: [
                        "You may request access, rectification, erasure, restriction, portability, and objection under Articles 15-21 GDPR.",
                        "You can withdraw consent at any time with future effect.",
                        "You also have the right to lodge a complaint with a competent supervisory authority.",
                    ],
                },
                {
                    title: "7. Security",
                    paragraphs: [
                        "We apply technical and organizational safeguards to protect data against unauthorized access, loss, and misuse.",
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

