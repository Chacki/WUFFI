import {config_imap} from "./imap_config.js";


export const IMAP = async (user, password, proxy) => {
    const client = config_imap(user, password, proxy)
    // Wait until client connects and authorizes
    await client.connect();

    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX');
    try {
        let message = await client.fetchOne('*', { source: true });
        await client.logout();
        const url = message.source.toString().split('register/verify?token=3D')[1].split('"')[0]
        const token = url.split('=')[0] + url.split('=')[1]
        return token.replace(/\s{2,}/g, '')

    } finally {
        lock.release();
    }
};

