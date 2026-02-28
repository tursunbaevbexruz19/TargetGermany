import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8678961505:AAHgcDzUeFXRwC8ct_LpS7lBqCAZj8LwpYk';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, goals } = body;

        const text = `🎯 *New Target International School Germany Inquiry*\n\n👤 *Name:* ${firstName} ${lastName}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone}\n\n💡 *Goals:*\n${goals}`;

        // First, check if there's a specific hardcoded chat ID in the environment
        let chatIds: (string | number)[] = [];
        if (process.env.TELEGRAM_CHAT_ID) {
            chatIds.push(process.env.TELEGRAM_CHAT_ID);
        } else {
            // Attempt to dynamically fetch recent chat IDs from the bot's updates
            try {
                const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
                const updatesData = await updatesRes.json();

                if (updatesData.ok && updatesData.result) {
                    const uniqueChatIds = new Set<string | number>();
                    updatesData.result.forEach((update: any) => {
                        if (update.message?.chat?.id) {
                            uniqueChatIds.add(update.message.chat.id);
                        }
                    });
                    chatIds = Array.from(uniqueChatIds);
                }
            } catch (e) {
                console.error("Failed to fetch getUpdates", e);
            }
        }

        if (chatIds.length === 0) {
            // Fallback: Manager's known chat ID if none exists (just as a failsafe).
            // But if we don't know it, we just return an error so the frontend knows to fallback to direct redirect.
            return NextResponse.json({ success: false, error: "No active managers found for the bot. Please send a message to @Target_admissions_bot first." }, { status: 400 });
        }

        // Broadcast to all active chat IDs
        let successCount = 0;
        for (const chatId of chatIds) {
            const sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });
            if (sendRes.ok) successCount++;
        }

        if (successCount > 0) {
            return NextResponse.json({ success: true, count: successCount });
        } else {
            return NextResponse.json({ success: false, error: "Failed to broadcast to Telegram." }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
