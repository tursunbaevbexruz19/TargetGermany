/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const locales = {
    en: {
        "Navbar": {
            "home": "Home",
            "about": "About Us",
            "academics": "Academics",
            "curriculum": "Curriculum",
            "campus": "Campuses",
            "admissions": "Admissions",
            "results": "Results",
            "applyNow": "Apply Now"
        },
        "Hero": {
            "title": "Unlock Your Path to Excellence",
            "subtitle": "Where Innovation Meets Education",
            "description": "At Target International School, we provide a comprehensive education with a profound focus on Business and IT, preparing students from grades 1-11 for successful global university admissions.",
            "cta": "Start Your Journey"
        },
        "Stats": {
            "students": "Students Educated",
            "branches": "International Campuses",
            "acceptances": "Top College Acceptances",
            "years": "Years of Excellence"
        },
        "Academics": {
            "title": "Academic Rigor",
            "description": "Our comprehensive SAT and IELTS preparation programs consistently yield scores in the top percentiles globally, ensuring direct entry into top-tier universities.",
            "apTutor": "Official AP Tutor",
            "apTutorDesc": "Accredited teaching for the Advanced Placement standard.",
            "satCenter": "Official SAT Center",
            "satCenterDesc": "A recognized testing location offering comprehensive quantitative reasoning.",
            "rigor": "High Rigor & Discipline",
            "rigorDesc": "We demand excellence and foster critical thinking."
        },
        "About": {
            "title": "Shaping Tomorrow's Leaders",
            "subtitle": "Target International School Profile",
            "description1": "We pursue the highest standards in all aspects of education, challenging our students to achieve their full potential. Our vision is to develop the whole person, inspiring confident and compassionate leaders.",
            "description2": "Guided by core values of Excellence, Innovation, Integrity, Respect, Responsibility, and Global Citizenship, we foster an environment where diversity is valued and accountability is paramount.",
            "highlightsTitle": "Our Leadership Team",
            "highlight1": "Bekhzod Jalilov, CEO. Elevating global standards.",
            "highlight2": "Javohir Ruziyev, Head of Marketing. Aligning professional digital presence.",
            "highlight3": "Feruza Sotiboldiyeva, Counselor. Ensuring emotional and academic support.",
            "highlight4": "Naimov Diyorbek, Head of Academic Trainings. Specializing in advanced teaching methodology."
        },
        "Curriculum": {
            "title": "Specialized Curriculum",
            "description": "Deeply focused on Business, IT, and STEM. We offer rigorous academic modules designed to mold global leaders.",
            "business": "Business & Finance",
            "businessDesc": "Comprehensive financial literacy and core business studies to forge commercial acumen.",
            "it": "Advanced IT",
            "itDesc": "Cutting-edge Information Technology, coding, and systems architecture.",
            "math": "Mathematics (SAT)",
            "mathDesc": "Intense quantitative reasoning tailored for perfect SAT scores.",
            "english": "English (IELTS)",
            "englishDesc": "Mastery of the English language with rigorous IELTS preparation.",
            "ap": "AP & A-Levels",
            "apDesc": "Global standard college-preparatory coursework.",
            "logic": "Logic & Critical Thinking",
            "logicDesc": "A foundational course developing deep analytical skills.",
            "sport": "Sports",
            "sportDesc": "Balancing mental rigor with elite sports programs."
        },
        "Results": {
            "title": "Outstanding Academic Results",
            "description": "Our students routinely secure placements in the world's most elite universities across the USA, Europe, and Asia.",
            "ivy": "Harvard, Stanford, MIT",
            "ivyDesc": "Consistent admissions to the top Ivy League and US tech institutions.",
            "europe": "Oxford & Cambridge",
            "europeDesc": "Securing spots in the UK's finest, alongside ETH Zurich and Sorbonne.",
            "asia": "NUS & Tokyo",
            "asiaDesc": "Dominating placements in top Asian and Australian universities.",
            "achievements": "Achievement Gallery",
            "wsc": "World Scholars Cup",
            "wscDesc": "Gold and Silver medals, 1st place overall in debate.",
            "mathAsian": "Mental Arithmetic ASIAN CUP",
            "mathAsianDesc": "6 Gold, 8 Silver, 7 Bronze medals globally.",
            "robotics": "National Robotics",
            "roboticsDesc": "Sweeping Gold, Silver, and Bronze at the National Robotics Competition.",
            "techAward": "President Tech Award",
            "techAwardDesc": "2nd Place Nationally with the innovative 'Speaklish' project.",
            "wamas": "WAMAS 2024",
            "wamasDesc": "Student Zulayho received the Gold Trophy among 500+ participants from 24 countries."
        },
        "Campus": {
            "title": "Our Network",
            "description": "State-of-the-art computer labs, business innovation centers, and modern dormitories globally.",
            "germany": "Germany Campus",
            "germanyDesc": "The new European Flagship Campus.",
            "istirohat": "Istirohat",
            "istirohatDesc": "STEM Innovation Core.",
            "tinchlik": "Tinchlik",
            "tinchlikDesc": "Business & IT Laboratories.",
            "yunusabad": "Yunusabad",
            "yunusabadDesc": "Academic Excellence Center.",
            "sergeli": "Sergeli",
            "sergeliDesc": "Elite Athletics Complex."
        },
        "Footer": {
            "aboutText": "Target International School is committed to providing a transformative education focused on Business and IT.",
            "quickLinks": "Explore",
            "contactUs": "Contact",
            "rights": "All rights reserved. Target International School.",
            "privacy": "Privacy",
            "terms": "Terms"
        }
    },
    de: {
        "Navbar": { "home": "Startseite", "about": "Über uns", "academics": "Akademiker", "curriculum": "Lehrplan", "campus": "Campus", "admissions": "Zulassung", "results": "Ergebnisse", "applyNow": "Bewerben" },
        "Hero": { "title": "Ihr Weg zur Exzellenz", "subtitle": "Wo Innovation auf Bildung trifft", "description": "Die Target International School bietet eine umfassende Ausbildung mit Schwerpunkt auf Business und IT.", "cta": "Reise Beginnen" },
        "Stats": { "students": "Schüler", "branches": "Campus", "acceptances": "Zulassungen", "years": "Jahre" },
        "Academics": { "title": "Akademische Strenge", "description": "Umfassende Vorbereitung", "apTutor": "Offizieller AP-Tutor", "apTutorDesc": "Akkreditierter Unterricht", "satCenter": "Offizielles SAT-Zentrum", "satCenterDesc": "Anerkannter Teststandort", "rigor": "Hohe Disziplin", "rigorDesc": "Wir fordern Exzellenz" },
        "About": { "title": "Führungskräfte von morgen", "subtitle": "Target Profil", "description1": "Wir verfolgen die höchsten Standards.", "description2": "Geleitet von Kernwerten wie Exzellenz und Integrität.", "highlightsTitle": "Unser Führungsteam", "highlight1": "Bekhzod Jalilov, CEO", "highlight2": "Javohir Ruziyev, Marketing", "highlight3": "Feruza Sotiboldiyeva, Beraterin", "highlight4": "Naimov Diyorbek, Akademisches Training" },
        "Curriculum": { "title": "Spezialisierter Lehrplan", "description": "Fokus auf IT und Business.", "business": "Business", "businessDesc": "Wirtschaft", "it": "IT", "itDesc": "Informatik", "math": "Mathematik", "mathDesc": "SAT", "english": "Englisch", "englishDesc": "IELTS", "ap": "AP", "apDesc": "A-level", "logic": "Logik", "logicDesc": "Kritisches Denken", "sport": "Sport", "sportDesc": "Athletik" },
        "Results": { "title": "Herausragende Ergebnisse", "description": "Elite-Universitäten", "ivy": "Harvard, Stanford", "ivyDesc": "Ivy League", "europe": "Oxford & Cambridge", "europeDesc": "UK & Europa", "asia": "Singapur & Tokio", "asiaDesc": "Asien", "achievements": "Galerie", "wsc": "World Scholars", "wscDesc": "Gold", "mathAsian": "Mental Arithmetic", "mathAsianDesc": "Medaillen", "robotics": "Robotics", "roboticsDesc": "Tech", "techAward": "President Tech Award", "techAwardDesc": "Speaklish", "wamas": "WAMAS", "wamasDesc": "Zulayho" },
        "Campus": { "title": "Netzwerk", "description": "Einrichtungen", "germany": "Deutschland", "germanyDesc": "Neu", "istirohat": "Istirohat", "istirohatDesc": "STEM", "tinchlik": "Tinchlik", "tinchlikDesc": "IT", "yunusabad": "Yunusabad", "yunusabadDesc": "Exzellenz", "sergeli": "Sergeli", "sergeliDesc": "Sport" },
        "Footer": { "aboutText": "Target International School", "quickLinks": "Links", "contactUs": "Kontakt", "rights": "Rechte vorbehalten", "privacy": "Datenschutz", "terms": "Bedingungen" }
    },
    uz: {
        "Navbar": { "home": "Asosiy", "about": "Biz haqimizda", "academics": "Akademiklar", "curriculum": "Dastur", "campus": "Kampuslar", "admissions": "Qabul", "results": "Natijalar", "applyNow": "Topshirish" },
        "Hero": { "title": "Mukammallik sari yo'lingizni oching", "subtitle": "Innovatsiya ta'lim bilan uchrashadigan joy", "description": "Target xalqaro maktabida biznes va IT ustuvor yo'nalish hisoblanadi.", "cta": "Boshlash" },
        "Stats": { "students": "O'quvchilar", "branches": "Filiallar", "acceptances": "Top universitetlar", "years": "Yillar" },
        "Academics": { "title": "Akademik qat'iylik", "description": "SAT va IELTS", "apTutor": "AP", "apTutorDesc": "AP", "satCenter": "SAT markazi", "satCenterDesc": "SAT", "rigor": "Intizom", "rigorDesc": "Mukammallik" },
        "About": { "title": "Kelajak liderlari", "subtitle": "Profil", "description1": "Yuqori standartlar.", "description2": "Asosiy qadriyatlar.", "highlightsTitle": "Rahbariyat", "highlight1": "Bekhzod Jalilov", "highlight2": "Javohir Ruziyev", "highlight3": "Feruza Sotiboldiyeva", "highlight4": "Naimov Diyorbek" },
        "Curriculum": { "title": "Dastur", "description": "Biznes va IT", "business": "Biznes", "businessDesc": "Biznes", "it": "IT", "itDesc": "IT", "math": "Matematika", "mathDesc": "Matematika", "english": "Ingliz tili", "englishDesc": "IELTS", "ap": "AP", "apDesc": "AP", "logic": "Mantiq", "logicDesc": "Mantiq", "sport": "Sport", "sportDesc": "Sport" },
        "Results": { "title": "Zo'r natijalar", "description": "AQSh, Yevropa, Osiyo.", "ivy": "Garvard, Stenford", "ivyDesc": "AQSh", "europe": "Oksford, Kembrij", "europeDesc": "Yevropa", "asia": "Singapur, Tokio", "asiaDesc": "Osiyo", "achievements": "Yutuqlar", "wsc": "World Scholars", "wscDesc": "Oltin", "mathAsian": "Mental arifmetika", "mathAsianDesc": "Osiyo kubogi", "robotics": "Robototexnika", "roboticsDesc": "Medallar", "techAward": "Prezident Sovrini", "techAwardDesc": "Speaklish loyihasi", "wamas": "WAMAS", "wamasDesc": "Zulayho" },
        "Campus": { "title": "Kampuslar", "description": "Infratuzilma", "germany": "Germaniya", "germanyDesc": "Yevropa", "istirohat": "Istirohat", "istirohatDesc": "STEM", "tinchlik": "Tinchlik", "tinchlikDesc": "IT", "yunusabad": "Yunusobod", "yunusabadDesc": "Ta'lim", "sergeli": "Sirg'ali", "sergeliDesc": "Sport" },
        "Footer": { "aboutText": "Target School", "quickLinks": "Havolalar", "contactUs": "Aloqa", "rights": "Barcha huquqlar himoyalangan", "privacy": "Maxfiylik", "terms": "Shartlar" }
    },
    ru: {
        "Navbar": { "home": "Главная", "about": "О нас", "academics": "Академика", "curriculum": "Программа", "campus": "Кампусы", "admissions": "Поступление", "results": "Результаты", "applyNow": "Подать заявку" },
        "Hero": { "title": "Откройте путь к совершенству", "subtitle": "Инновации встречаются с образованием", "description": "Международная школа Target предоставляет обучение с акцентом на бизнес и IT.", "cta": "Начать" },
        "Stats": { "students": "Ученики", "branches": "Филиалы", "acceptances": "Поступления", "years": "Лет" },
        "Academics": { "title": "Академическая строгость", "description": "SAT и IELTS", "apTutor": "AP Центр", "apTutorDesc": "AP", "satCenter": "SAT Центр", "satCenterDesc": "SAT", "rigor": "Дисциплина", "rigorDesc": "Совершенство" },
        "About": { "title": "Лидеры завтрашнего дня", "subtitle": "Профиль", "description1": "Высокие стандарты.", "description2": "Наши ценности.", "highlightsTitle": "Руководство", "highlight1": "Бехзод Жалилов", "highlight2": "Жавохир Рузиев", "highlight3": "Феруза Сотиболдиева", "highlight4": "Наимов Диёрбек" },
        "Curriculum": { "title": "Специализированная программа", "description": "IT и Бизнес.", "business": "Бизнес", "businessDesc": "Бизнес", "it": "IT", "itDesc": "IT", "math": "Математика", "mathDesc": "Математика", "english": "Английский", "englishDesc": "IELTS", "ap": "AP", "apDesc": "AP", "logic": "Логика", "logicDesc": "Критическое мышление", "sport": "Спорт", "sportDesc": "Спорт" },
        "Results": { "title": "Потрясающие результаты", "description": "Гарвард и Оксфорд", "ivy": "Гарвард, Стэнфорд", "ivyDesc": "США", "europe": "Оксфорд", "europeDesc": "Европа", "asia": "Сингапур", "asiaDesc": "Азия", "achievements": "Достижения", "wsc": "World Scholars", "wscDesc": "Золото", "mathAsian": "Менталь. арифметика", "mathAsianDesc": "Медали", "robotics": "Робототехника", "roboticsDesc": "Победа", "techAward": "President Tech Award", "techAwardDesc": "Speaklish", "wamas": "WAMAS 2024", "wamasDesc": "Зулайхо" },
        "Campus": { "title": "Наши Кампусы", "description": "Инфраструктура", "germany": "Германия", "germanyDesc": "Новый", "istirohat": "Истирохат", "istirohatDesc": "STEM", "tinchlik": "Тинчлик", "tinchlikDesc": "IT", "yunusabad": "Юнусабад", "yunusabadDesc": "Учеба", "sergeli": "Сергели", "sergeliDesc": "Спорт" },
        "Footer": { "aboutText": "Target School", "quickLinks": "Ссылки", "contactUs": "Контакты", "rights": "Все права защищены", "privacy": "Конфиденциальность", "terms": "Условия" }
    },
    fr: {
        "Navbar": { "home": "Accueil", "about": "À propos", "academics": "Programmes", "curriculum": "Programme", "campus": "Campus", "admissions": "Admissions", "results": "Résultats", "applyNow": "Postuler" },
        "Hero": { "title": "Débloquez l'excellence", "subtitle": "L'innovation", "description": "Target International School.", "cta": "Commencer" },
        "Stats": { "students": "Étudiants", "branches": "Campus", "acceptances": "Universités", "years": "Années" },
        "Academics": { "title": "Rigueur", "description": "SAT/IELTS", "apTutor": "AP", "apTutorDesc": "AP", "satCenter": "SAT", "satCenterDesc": "SAT", "rigor": "Discipline", "rigorDesc": "Rigueur" },
        "About": { "title": "Leaders", "subtitle": "Profil", "description1": "Excellence.", "description2": "Valeurs.", "highlightsTitle": "Équipe", "highlight1": "Bekhzod", "highlight2": "Javohir", "highlight3": "Feruza", "highlight4": "Diyorbek" },
        "Curriculum": { "title": "Programme", "description": "Business IT.", "business": "Business", "businessDesc": "Finance", "it": "IT", "itDesc": "IT", "math": "Math", "mathDesc": "SAT", "english": "Anglais", "englishDesc": "IELTS", "ap": "AP", "apDesc": "AP", "logic": "Logique", "logicDesc": "Logique", "sport": "Sport", "sportDesc": "Sport" },
        "Results": { "title": "Résultats", "description": "Élite.", "ivy": "Harvard", "ivyDesc": "USA", "europe": "Oxford", "europeDesc": "Europe", "asia": "Asie", "asiaDesc": "Asie", "achievements": "Galerie", "wsc": "WSC", "wscDesc": "Or", "mathAsian": "Math", "mathAsianDesc": "Or", "robotics": "Robot", "roboticsDesc": "Or", "techAward": "Tech", "techAwardDesc": "Tech", "wamas": "WAMAS", "wamasDesc": "Or" },
        "Campus": { "title": "Campus", "description": "Installations", "germany": "Allemagne", "germanyDesc": "Nouveau", "istirohat": "Istirohat", "istirohatDesc": "STEM", "tinchlik": "Tinchlik", "tinchlikDesc": "IT", "yunusabad": "Yunusabad", "yunusabadDesc": "Excellence", "sergeli": "Sergeli", "sergeliDesc": "Sport" },
        "Footer": { "aboutText": "Target School", "quickLinks": "Liens", "contactUs": "Contact", "rights": "Droits", "privacy": "Confidentialité", "terms": "Termes" }
    },
    es: {
        "Navbar": { "home": "Inicio", "about": "Nosotros", "academics": "Académico", "curriculum": "Currículo", "campus": "Campus", "admissions": "Admisión", "results": "Resultados", "applyNow": "Aplicar" },
        "Hero": { "title": "Excelencia", "subtitle": "Innovación", "description": "Target International School.", "cta": "Comenzar" },
        "Stats": { "students": "Estudiantes", "branches": "Campus", "acceptances": "Universidades", "years": "Años" },
        "Academics": { "title": "Rigor", "description": "SAT/IELTS", "apTutor": "AP", "apTutorDesc": "AP", "satCenter": "SAT", "satCenterDesc": "SAT", "rigor": "Disciplina", "rigorDesc": "Rigor" },
        "About": { "title": "Líderes", "subtitle": "Perfil", "description1": "Excelencia.", "description2": "Valores.", "highlightsTitle": "Equipo", "highlight1": "Bekhzod", "highlight2": "Javohir", "highlight3": "Feruza", "highlight4": "Diyorbek" },
        "Curriculum": { "title": "Currículo", "description": "Negocios y TI.", "business": "Negocios", "businessDesc": "Finanzas", "it": "TI", "itDesc": "IT", "math": "Matemática", "mathDesc": "SAT", "english": "Inglés", "englishDesc": "IELTS", "ap": "AP", "apDesc": "AP", "logic": "Lógica", "logicDesc": "Lógica", "sport": "Deporte", "sportDesc": "Deporte" },
        "Results": { "title": "Resultados", "description": "Élite.", "ivy": "Harvard", "ivyDesc": "USA", "europe": "Oxford", "europeDesc": "Europa", "asia": "Asia", "asiaDesc": "Asia", "achievements": "Premios", "wsc": "WSC", "wscDesc": "Oro", "mathAsian": "Matemática", "mathAsianDesc": "Oro", "robotics": "Robótica", "roboticsDesc": "Oro", "techAward": "Tech", "techAwardDesc": "Tech", "wamas": "WAMAS", "wamasDesc": "Oro" },
        "Campus": { "title": "Campus", "description": "Instalaciones", "germany": "Alemania", "germanyDesc": "Nuevo", "istirohat": "Istirohat", "istirohatDesc": "STEM", "tinchlik": "Tinchlik", "tinchlikDesc": "TI", "yunusabad": "Yunusabad", "yunusabadDesc": "Académico", "sergeli": "Sergeli", "sergeliDesc": "Deporte" },
        "Footer": { "aboutText": "Target School", "quickLinks": "Enlaces", "contactUs": "Contacto", "rights": "Derechos", "privacy": "Privacidad", "terms": "Términos" }
    },
    ar: {
        "Navbar": { "home": "الرئيسية", "about": "عنا", "academics": "أكاديميون", "curriculum": "منهج", "campus": "حرم", "admissions": "قبول", "results": "نتائج", "applyNow": "قدم" },
        "Hero": { "title": "التميز", "subtitle": "الابتكار", "description": "Target International School.", "cta": "ابدأ" },
        "Stats": { "students": "الطلاب", "branches": "الفروع", "acceptances": "الجامعات", "years": "سنوات" },
        "Academics": { "title": "صرامة", "description": "SAT/IELTS", "apTutor": "AP", "apTutorDesc": "AP", "satCenter": "SAT", "satCenterDesc": "SAT", "rigor": "انضباط", "rigorDesc": "تميز" },
        "About": { "title": "القادة", "subtitle": "الملف", "description1": "التميز.", "description2": "القيم.", "highlightsTitle": "الفريق", "highlight1": "Bekhzod", "highlight2": "Javohir", "highlight3": "Feruza", "highlight4": "Diyorbek" },
        "Curriculum": { "title": "منهج", "description": "أعمال", "business": "أعمال", "businessDesc": "تمويل", "it": "تقنية", "itDesc": "تقنية", "math": "رياضيات", "mathDesc": "SAT", "english": "لغة إنجليزية", "englishDesc": "IELTS", "ap": "AP", "apDesc": "AP", "logic": "منطق", "logicDesc": "منطق", "sport": "رياضة", "sportDesc": "رياضة" },
        "Results": { "title": "النتائج", "description": "نخبة", "ivy": "هارفارد", "ivyDesc": "USA", "europe": "أكسفورد", "europeDesc": "أوروبا", "asia": "آسيا", "asiaDesc": "آسيا", "achievements": "جوائز", "wsc": "WSC", "wscDesc": "ذهبية", "mathAsian": "رياضيات", "mathAsianDesc": "ذهبية", "robotics": "روبوتات", "roboticsDesc": "ذهبية", "techAward": "جوائز", "techAwardDesc": "جوائز", "wamas": "WAMAS", "wamasDesc": "ذهبية" },
        "Campus": { "title": "الحرم", "description": "مرافق", "germany": "ألمانيا", "germanyDesc": "جديد", "istirohat": "Istirohat", "istirohatDesc": "STEM", "tinchlik": "Tinchlik", "tinchlikDesc": "IT", "yunusabad": "Yunusabad", "yunusabadDesc": "أكاديمي", "sergeli": "Sergeli", "sergeliDesc": "رياضة" },
        "Footer": { "aboutText": "Target School", "quickLinks": "روابط", "contactUs": "اتصل", "rights": "حقوق", "privacy": "خصوصية", "terms": "شروط" }
    }
};

const dir = 'd:/Target_germany/web/messages';
for (const [lang, data] of Object.entries(locales)) {
    fs.writeFileSync(path.join(dir, `${lang}.json`), JSON.stringify(data, null, 2));
}
console.log('Massive Locales generated successfully.');

