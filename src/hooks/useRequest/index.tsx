import { useQuery } from "@tanstack/react-query";
import { getRequestDetail, getRequestList } from "../../api/authApi";

export function useRequestList(search: string) {
    return useQuery({
        queryKey: ['request', search],
        queryFn: () => getRequestList(search),
    });
}

export function useRequestDetail(id: number) {
    return useQuery({
        queryKey: ['requestDetail', id],
        queryFn: () => getRequestDetail(id),
    });
}