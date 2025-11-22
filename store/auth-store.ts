/**
 * Auth Store - Zustand State Management
 * Handles user authentication state
 */

'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { AuthState, Profile } from '@/types'

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    isAdmin: false,

    // Sign in
    signIn: async (email: string, password: string) => {
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

        await get().loadUser()
    },

    // Sign up
    signUp: async (email: string, password: string, fullName: string) => {
        const supabase = createClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        if (error) throw error

        await get().loadUser()
    },

    // Sign out
    signOut: async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        set({ user: null, isAdmin: false })
    },

    // Load user profile
    loadUser: async () => {
        set({ isLoading: true })
        const supabase = createClient()

        const {
            data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                set({
                    user: profile,
                    isAdmin: profile.is_admin,
                    isLoading: false,
                })
            } else {
                set({ user: null, isAdmin: false, isLoading: false })
            }
        } else {
            set({ user: null, isAdmin: false, isLoading: false })
        }
    },
}))
