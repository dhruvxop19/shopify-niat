'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ProfilePage() {
    const { user, loadUser } = useAuthStore()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
    })

    useEffect(() => {
        if (!user) {
            router.push(ROUTES.LOGIN + '?redirect=/profile')
            return
        }

        setFormData({
            full_name: user.full_name || '',
            phone: user.phone || '',
        })
    }, [user, router])

    const handleSave = async () => {
        if (!user) return

        setIsSaving(true)
        const supabase = createClient()

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: formData.full_name,
                phone: formData.phone,
            })
            .eq('id', user.id)

        if (!error) {
            await loadUser()
            setIsEditing(false)
        }
        setIsSaving(false)
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                        {/* Profile Header */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#008060] to-[#004c3f] flex items-center justify-center text-white text-3xl font-bold">
                                {user.full_name?.[0] || user.email?.[0] || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{user.full_name || 'User'}</h2>
                                <p className="text-gray-400">{user.email}</p>
                                {user.is_admin && (
                                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-[#008060]/10 border border-[#008060]/20 text-[#008060] text-xs font-medium rounded-full">
                                        <Shield className="w-3 h-3" /> Admin
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                    <User className="w-4 h-4" /> Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <p className="text-white text-lg">{user.full_name || 'Not set'}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                <p className="text-white text-lg">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                    <Phone className="w-4 h-4" /> Phone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                        placeholder="Enter your phone number"
                                    />
                                ) : (
                                    <p className="text-white text-lg">{user.phone || 'Not set'}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                    <Calendar className="w-4 h-4" /> Member Since
                                </label>
                                <p className="text-white text-lg">
                                    {new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-8 border-t border-zinc-800 flex gap-4">
                            {isEditing ? (
                                <>
                                    <Button
                                        onClick={handleSave}
                                        isLoading={isSaving}
                                        className="bg-[#008060] hover:bg-[#006e52] text-white"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsEditing(false)
                                            setFormData({
                                                full_name: user.full_name || '',
                                                phone: user.phone || '',
                                            })
                                        }}
                                        variant="outline"
                                        className="border-zinc-700 text-white hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#008060] hover:bg-[#006e52] text-white"
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
