import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/user.store';

interface Notification {
    type: 'order_placed' | 'order_status_changed';
    orderId: string;
    userId: string;
    message: string;
    data: any;
    timestamp: Date;
}

export const useNotifications = (isAdmin: boolean = false) => {
    const { accessToken } = useAuthStore();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!accessToken) return;

        const eventSource = new EventSource(
            `http://localhost:8000/api/notifications/${isAdmin ? 'admin' : 'user'}?token=${accessToken}`,
            {
                withCredentials: true,
            }
        );

        eventSource.onopen = () => {
            setIsConnected(true);
        };

        eventSource.onmessage = (event) => {
            try {
                const notification: Notification = JSON.parse(event.data);
                setNotifications(prev => [notification, ...prev]);
            } catch (error) {
                console.error('Error parsing notification:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            setIsConnected(false);
        };

        return () => {
            eventSource.close();
            setIsConnected(false);
        };
    }, [isAdmin]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return {
        notifications,
        isConnected,
        clearNotifications,
    };
};