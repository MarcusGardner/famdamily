import { supabase } from '$lib/supabaseClient';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    };

    const session = await event.locals.getSession();
    event.locals.user = session?.user || null;

    if (session) {
        event.cookies.set('session', JSON.stringify(session), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
    }

    return resolve(event);
};
