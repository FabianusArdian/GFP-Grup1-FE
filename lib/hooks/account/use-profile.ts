"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { profileService } from '@/lib/services/account/profile';
import type { User } from '@/lib/types/user';

export function useProfile() {
  const [data, setData] = useState<{
    profile: User | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    profile: null,
    isLoading: true,
    error: null
  });

  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));
      const profile = await profileService.getProfile();
      setData({ profile, isLoading: false, error: null });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setData({ profile: null, isLoading: false, error: error as Error });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data"
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    ...data,
    refresh: fetchProfile
  };
}
