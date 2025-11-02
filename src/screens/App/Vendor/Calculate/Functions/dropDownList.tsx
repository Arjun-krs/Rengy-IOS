import { useMemo } from "react";
import { useCommonList } from "../../../../../hooks/useCommon";

export function useDropdownLists() {
    const { data: projectTypeList } = useCommonList("projectType");
    const { data: roofTypeList } = useCommonList("roofType");
    const { data: moduleList } = useCommonList("module");
    const { data: inverterList } = useCommonList("inverter");
    const { data: structureTypeList } = useCommonList("structureType");
    const { data: structureHeightList } = useCommonList("structureHeight");

    const projectTypeOptions = useMemo(
        () =>
            projectTypeList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [projectTypeList]
    );

    const roofTypeOptions = useMemo(
        () =>
            roofTypeList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [roofTypeList]
    );

    const moduleOptions = useMemo(
        () =>
            moduleList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [moduleList]
    );

    const inverterOptions = useMemo(
        () =>
            inverterList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [inverterList]
    );

    const structureTypeOptions = useMemo(
        () =>
            structureTypeList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [structureTypeList]
    );

    const structureHeightOptions = useMemo(
        () =>
            structureHeightList?.map((el: any) => ({
                label: el.value,
                value: el.id,
            })) || [],
        [structureHeightList]
    );

    return {
        projectTypeOptions,
        roofTypeOptions,
        moduleOptions,
        inverterOptions,
        structureTypeOptions,
        structureHeightOptions
    };
}
