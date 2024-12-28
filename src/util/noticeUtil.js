import {NOTICE_URL, SSE_URL} from "../config/host-config";

export const addNotice = async (userId, type, targetId, message, onMessage) => {
    const payload = {
        userId,
        message,
        boardId: type === '커뮤니티' ? targetId : 0,
        goalId: type === '목표' ? targetId : 0,
        type,
    };

    console.log("Payload:", payload);

    try {
        const response = await fetch(`${NOTICE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Failed to send notice");
        }

        // SSE 연결
        const eventSource = new EventSource(`${SSE_URL}/connect/${userId}`);
        eventSource.addEventListener("notice", (e) => {
            const data = JSON.parse(e.data);
            console.log("새로운 알림: ", data);
            if (onMessage) {
                onMessage(data);
            }
        });

        eventSource.onerror = (e) => {
            console.error("SSE Error:", e);
            eventSource.close();
        };

    } catch (error) {
        console.error("Error in addNotice:", error);
    }
};