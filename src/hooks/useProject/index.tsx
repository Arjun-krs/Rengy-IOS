import { useQuery } from "@tanstack/react-query";
import { getProjectList } from "../../api/authApi";

export function useProjectList(search: string) {
    return useQuery({
        queryKey: ['project', search],
        queryFn: () => getProjectList(search),
    });
}