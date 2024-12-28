import {NOTICE_URL} from "../config/host-config";


export const addNotice = async (userId, type, targetId, message) => {
    let boardId = (type === '커뮤니티') ? targetId : null;
    let goalId = (type === '목표') ? targetId : null;
    const payload = {
        userId,
        message,
        boardId,
        goalId,
        type
    }

    const response = await fetch(`${NOTICE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        return await response.json();
    }
}
