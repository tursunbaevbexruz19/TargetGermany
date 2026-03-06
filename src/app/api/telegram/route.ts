import { NextResponse } from "next/server";

type InquiryPayload = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    program?: string;
    message?: string;
    source?: string;
};

type TelegramUpdate = {
    message?: { chat?: { id?: number | string } };
    channel_post?: { chat?: { id?: number | string } };
};

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function normalizeValue(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function getConfiguredChatIds() {
    const ids = `${process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID ?? ""}`
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

    return [...new Set(ids)];
}

async function discoverChatIds(botToken: string) {
    const updatesResponse = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`, {
        cache: "no-store",
    });

    if (!updatesResponse.ok) {
        return [];
    }

    const updatesData = (await updatesResponse.json()) as { ok?: boolean; result?: TelegramUpdate[] };

    if (!updatesData.ok || !updatesData.result) {
        return [];
    }

    const ids = updatesData.result.flatMap((update) => {
        const messageId = update.message?.chat?.id;
        const channelId = update.channel_post?.chat?.id;
        return [messageId, channelId].filter((value): value is number | string => typeof value === "number" || typeof value === "string");
    });

    return [...new Set(ids.map((value) => `${value}`))];
}

async function sendMessage(botToken: string, chatId: string, text: string) {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
        }),
    });

    if (!response.ok) {
        const payload = await response.text();
        throw new Error(`Telegram send failed for chat ${chatId}: ${payload}`);
    }
}

export async function POST(req: Request) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
        return NextResponse.json({ success: false, error: "Telegram bot token is not configured on the server." }, { status: 500 });
    }

    try {
        const body = (await req.json()) as InquiryPayload;
        const firstName = normalizeValue(body.firstName);
        const lastName = normalizeValue(body.lastName);
        const email = normalizeValue(body.email);
        const phone = normalizeValue(body.phone) || "Not provided";
        const program = normalizeValue(body.program);
        const message = normalizeValue(body.message) || "No additional message";
        const source = normalizeValue(body.source) || "website";

        if (!firstName || !lastName || !email || !program) {
            return NextResponse.json({ success: false, error: "Please fill in the required admissions fields." }, { status: 400 });
        }

        let chatIds = getConfiguredChatIds();
        if (chatIds.length === 0) {
            chatIds = await discoverChatIds(botToken);
        }

        if (chatIds.length === 0) {
            return NextResponse.json({ success: false, error: "Telegram destination is not configured. Set TELEGRAM_CHAT_ID after messaging the bot once." }, { status: 500 });
        }

        const inquiryId = `TG-${Date.now().toString().slice(-8)}`;
        const berlinTime = new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Europe/Berlin",
        }).format(new Date());

        const text = [
            "<b>New Admission Inquiry</b>",
            "",
            `<b>Inquiry ID:</b> ${escapeHtml(inquiryId)}`,
            `<b>Name:</b> ${escapeHtml(`${firstName} ${lastName}`)}`,
            `<b>Email:</b> ${escapeHtml(email)}`,
            `<b>Phone:</b> ${escapeHtml(phone)}`,
            `<b>Program:</b> ${escapeHtml(program)}`,
            `<b>Source:</b> ${escapeHtml(source)}`,
            `<b>Berlin time:</b> ${escapeHtml(berlinTime)}`,
            "",
            "<b>Message</b>",
            escapeHtml(message),
        ].join("\n");

        await Promise.all(chatIds.map((chatId) => sendMessage(botToken, chatId, text)));

        return NextResponse.json({ success: true, count: chatIds.length, inquiryId });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Telegram inquiry error:", error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
