import {ImapFlow} from "imapflow";

export function config_imap (user, password, proxy) {
    return new ImapFlow({
        auth: {
            user: user,
            pass: password,
        },
        host: 'outlook.office365.com',
        port: 993,
        secure: true,
        proxy: proxy
    });
}
