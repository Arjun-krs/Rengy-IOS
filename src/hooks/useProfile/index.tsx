import { useQuery } from "@tanstack/react-query";
import { getProfile, getUserSubscription } from "../../api/authApi";

export function useGetProfile(userId: number, userType: number) {
    return useQuery({
        queryKey: ['profile', userId, userType],
        queryFn: () => getProfile(userId, userType),
    });
}

export function useGetSubscription(userId: number, exportSub: any, search: string) {
    return useQuery({
        queryKey: ['subscription', userId],
        queryFn: () => getUserSubscription(userId, exportSub, search),
         
    });
}
