import { supabase } from '$lib/supabaseClient';
import { authStore } from '$lib/stores/authStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
    const session = data.session;
    
    if (session?.user) {
        authStore.setUser(session.user);
    }

    supabase.auth.onAuthStateChange((_, newSession) => {
        authStore.setUser(newSession?.user ?? null);
    });

    return {
        session
    };
};
