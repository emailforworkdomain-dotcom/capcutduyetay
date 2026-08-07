import type { ApprovalType } from '@/lib/telegram';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

type ApprovalEntry = {
    status: ApprovalStatus;
    type: ApprovalType;
    createdAt: number;
};

const TTL_MS = 30 * 60 * 1000;

const globalForApproval = globalThis as typeof globalThis & {
    __approvalStore?: Map<string, ApprovalEntry>;
};

const store = globalForApproval.__approvalStore ?? new Map<string, ApprovalEntry>();
globalForApproval.__approvalStore = store;

function cleanupExpired() {
    const now = Date.now();
    for (const [id, entry] of store) {
        if (now - entry.createdAt > TTL_MS) {
            store.delete(id);
        }
    }
}

export function createApproval(sessionId: string, type: ApprovalType) {
    cleanupExpired();
    store.set(sessionId, { status: 'pending', type, createdAt: Date.now() });
}

export function getApproval(sessionId: string): ApprovalEntry | undefined {
    cleanupExpired();
    return store.get(sessionId);
}

export function setApprovalStatus(sessionId: string, status: Exclude<ApprovalStatus, 'pending'>) {
    const entry = store.get(sessionId);
    if (!entry) return false;
    store.set(sessionId, { ...entry, status });
    return true;
}
