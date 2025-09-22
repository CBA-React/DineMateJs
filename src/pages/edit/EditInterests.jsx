import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { PillMultiSelectSection } from "/src/components/ui/PillMultiSelectSection";
import { Grid2X2, UserRound } from "lucide-react";
import { useFetch } from "/src/hooks/useFetch";
import { ALL_ALCOHOL, ALL_SMOKE } from "/src/constants";
import { useIsMobile } from "/src/hooks/useIsMobile";

export const EditInterests = () => {
  const { control, setValue, register, getValues } = useFormContext();
  const isMobile = useIsMobile();

  const { data: interestsArr = [], isLoading: interestsLoading } =
    useFetch("/api/v1/profile/interests/list", "interests-list", {
      select: (raw) => (Array.isArray(raw?.interests) ? raw.interests : []),
    });

  const { data: tagsArr = [], isLoading: tagsLoading } =
    useFetch("/api/v1/profile/tags/list", "tags-list", {
      select: (raw) => (Array.isArray(raw?.tags) ? raw.tags : []),
    });

  const interestOptions = useMemo(
    () => interestsArr.map(({ id, name }) => ({ id, label: name })),
    [interestsArr]
  );
  const tagOptions = useMemo(
    () => tagsArr.map(({ id, name }) => ({ id, label: name })),
    [tagsArr]
  );

  const interestLabelToId = useMemo(
    () => Object.fromEntries(interestOptions.map(o => [o.label, o.id])),
    [interestOptions]
  );
  const tagLabelToId = useMemo(
    () => Object.fromEntries(tagOptions.map(o => [o.label, o.id])),
    [tagOptions]
  );

  const interestsUI = useWatch({ control, name: "interestsUI" }) ?? [];
  const tagsUI      = useWatch({ control, name: "tagsUI" }) ?? [];
  const interestsUIKey = useMemo(() => interestsUI.slice().sort().join("|"), [interestsUI]);
  const tagsUIKey      = useMemo(() => tagsUI.slice().sort().join("|"), [tagsUI]);

  const alcoholSel = useWatch({ control, name: "alcohol" });
  const smokeSel   = useWatch({ control, name: "smoke" });

  useEffect(() => {
    const ids = interestsUI.map(lbl => interestLabelToId[lbl]).filter(Boolean);
    const prev = getValues("interests") ?? [];
    const changed =
      ids.length !== prev.length || ids.some((v, i) => v !== prev[i]);
    if (changed) {
      setValue("interests", ids, { shouldValidate: true, shouldDirty: true });
    }
  }, [interestsUIKey, interestLabelToId, getValues, setValue]);

  useEffect(() => {
    const ids = tagsUI.map(lbl => tagLabelToId[lbl]).filter(Boolean);
    const prev = getValues("tags") ?? [];
    const changed =
      ids.length !== prev.length || ids.some((v, i) => v !== prev[i]);
    if (changed) {
      setValue("tags", ids, { shouldValidate: true, shouldDirty: true });
    }
  }, [tagsUIKey, tagLabelToId, getValues, setValue]);

  useEffect(() => {
    const habits = [];
    const alcohol = Array.isArray(alcoholSel) ? alcoholSel[0] : undefined;
    const smoking = Array.isArray(smokeSel) ? smokeSel[0] : undefined;
    if (smoking) habits.push({ type: "smoking", value: smoking });
    if (alcohol) habits.push({ type: "alcohol", value: alcohol });
    setValue("habits", habits, { shouldValidate: true, shouldDirty: true });
  }, [alcoholSel, smokeSel, setValue]);

  return (
    <div className="mx-auto max-w-[720px] space-y-6">
      {interestsLoading ? (
        <div className="text-fade-text">Loading interests…</div>
      ) : (
        <PillMultiSelectSection
          control={control}
          name="interestsUI"
          options={interestOptions.map(o => o.label)}
          title="Interests"
          pillClassName="px-5 py-[5.5px]"
          pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
          pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
          min={3}
          max={8}
          icon={<Grid2X2 className="w-4 h-4 text-primary-text" />}
        />
      )}

      {tagsLoading ? (
        <div className="text-fade-text">Loading personality tags…</div>
      ) : (
        <PillMultiSelectSection
          control={control}
          name="tagsUI"
          options={tagOptions.map(o => o.label)}
          title="Personality tags"
          pillClassName="px-5 py-[5.5px]"
          pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
          pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
          min={3}
          max={8}
          icon={<UserRound className="w-4 h-4 text-primary-text" />}
        />
      )}

      <PillMultiSelectSection
        control={control}
        name="alcohol"
        options={ALL_ALCOHOL}
        title="How often do you drink alcohol?"
        pillClassName="px-5 py-[5.5px]"
        pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
        pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
        min={1}
        max={1}
        icon={<UserRound className="w-4 h-4 text-primary-text" />}
      />

      <PillMultiSelectSection
        control={control}
        name="smoke"
        options={ALL_SMOKE}
        title="How often do you smoke?"
        pillClassName="px-5 py-[5.5px]"
        pillSelectedClassName="shadow-sm text-primary-text border-1 border-primary"
        pillUnselectedClassName="border bg-transparent text-fade-text border-fade-text"
        min={1}
        max={1}
        icon={<UserRound className="w-4 h-4 text-primary-text" />}
      />

      <input type="hidden" {...register("interests")} />
      <input type="hidden" {...register("tags")} />
      <input type="hidden" {...register("habits")} />
    </div>
  );
};
