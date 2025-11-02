import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    user: any | null;
    loading: boolean;
    setUserAndStore: (newUser: any | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.error('Error loading user:', err);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const setUserAndStore = async (newUser: any | null) => {
        try {
            console.log(newUser,'newUser');
            
            if (newUser) {
                await AsyncStorage.setItem('user', JSON.stringify(newUser));
            } else {
                await AsyncStorage.removeItem('user');
            }
            setUser(newUser);
        } catch (err) {
            console.error('Error setting user:', err);
        }
    };
console.log('useruseruseruseruseruseruseruseruseruseruser',user);

    return (
        <AuthContext.Provider value={{ user, loading, setUserAndStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
    return ctx;
};
