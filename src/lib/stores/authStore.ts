import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);

export const authStore = {
    subscribe: user.subscribe,
    
    setUser: (newUser: User | null) => {
        user.set(newUser);
        isAuthenticated.set(!!newUser);
    },

    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        user.set(data.user);
        isAuthenticated.set(true);
        return data;
    },

    signUp: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        return data;
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        user.set(null);
        isAuthenticated.set(false);
    },

    resetPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    }
};
