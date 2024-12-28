import {NOTICE_URL} from "../config/host-config";


export const addNotice = async (userId, message) => {
    const payload = {
        userId,
        message
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
