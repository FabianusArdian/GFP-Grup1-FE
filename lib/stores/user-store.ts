import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserStore } from '@/lib/types/user';
import { generateId } from '@/lib/utils/id';
import { initialUsers } from '@/lib/data/server/users';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      currentUser: null,

      addUser: (userData) => {
        const newUser: User = {
          id: generateId(),
          ...userData,
          createdAt: new Date(),
        };

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));

        return newUser;
      },

      getUserByEmail: (email) => {
        return get().users.find((user) => user.email === email);
      },

      updateUser: (id, data) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...data } : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, ...data }
              : state.currentUser,
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);