import { useQuery } from "@tanstack/react-query";
import { getCityList, getCommon, getCountry, getLeadsList } from "../../api/authApi";

export function useGetCountry() {
    return useQuery({
        queryKey: ['country'],
        queryFn: () => getCountry(),
    });
}

export function useCommonList(type: string) {
    return useQuery({
        queryKey: ['common', type],
        queryFn: () => getCommon(type),
    });
}

export function useGetLeadsList(search: string) {
    return useQuery({
        queryKey: ['leads', search],
        queryFn: () => getLeadsList(search),
    });
}

export function useGetCityList(search: string) {
    return useQuery({
        queryKey: ['cities', search],
        queryFn: () => getCityList(search),
    });
}