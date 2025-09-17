import { useFormContext } from "react-hook-form";
import { useMemo, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "/src/components/ui/Input";
import { LocationSelect } from "/src/components/auth/LocationSelect";
import { AgeSelect } from "/src/components/auth/AgeSelect";

export const EditGeneral = () => {
  const { register, watch, setValue, formState: { errors} } = useFormContext();
  const inputRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const raw = watch("photos") ?? [];
  const photos = useMemo(
    () =>
      raw.map((p) =>
        typeof p === "string" ? { id: p, url: p } : p
      ),
    [raw]
  );

  const commit = (next) => {
    setValue("photos", next, { shouldDirty: true, shouldValidate: true });
  };

  const primary = photos[0]?.url;

  const handleFiles = (fileList) => {
    const list = Array.from(fileList || []);
    const next = [...photos];

    list.forEach((file) => {
      if (!file.type?.startsWith?.("image/")) return;
      if (file.size > 5 * 1024 * 1024) return; // 5MB
      next.push({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        file,
      });
    });

    commit(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (id) => {
    commit(photos.filter((p) => p.id !== id));
  };

  const makePrimary = (id) => {
    const idx = photos.findIndex((p) => p.id === id);
    if (idx <= 0) return;
    const next = [photos[idx], ...photos.slice(0, idx), ...photos.slice(idx + 1)];
    commit(next);
  };

  const visible = showAll ? photos : photos.slice(0, 5);

  return (
    <div className="mx-auto max-w-[720px]">

      <div className="flex flex-col items-center">
        <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full ring-1 ring-black/10">
          {primary ? (
            <img src={primary} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gray-100 text-sm text-gray-400">
              No photo
            </div>
          )}
          {photos.length > 0 && (
            <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-white">
              {photos.length}
            </span>
          )}
        </div>
      </div>

      {photos.length > 0 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {visible.map((p) => (
              <div
                key={p.id}
                className="group relative h-[92px] w-[92px] overflow-hidden rounded-lg"
                title="Click to set as main"
              >
                <img
                  src={p.url}
                  className="h-full w-full cursor-pointer object-cover"
                  onClick={() => makePrimary(p.id)}
                />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => removePhoto(p.id)}
                  title="Remove photo"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 hidden rounded p-1 text-white group-hover:block cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          {photos.length > 5 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-primary underline cursor-pointer"
                onClick={() => setShowAll((s) => !s)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}

      <div
        className="mt-6 min-h-[200px] rounded-[10px] bg-white"
        style={{
            backgroundImage:
            "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23333' stroke-width='1' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
            borderRadius: "10px",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        >
        <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
            <button
                type="button"
                className="flex items-center text-[20px] text-primary"
                onClick={() => inputRef.current?.click()}
            >
                Click to Upload or drag and drop
            </button>
            <p className="mt-0.5 text-fade-text">
                JPG, JPEG, PNG. Max file size: 5MB
            </p>
        </div>
    </div>


      <div className="mt-6 space-y-6">
        <Input label="FULL NAME" placeholder="Emma Chen" {...register("fullName", { required: true })} />

        <Input label="EMAIL" placeholder="testemail@gmail.com" {...register("email", { required: true })} />

        <div className="grid grid-cols-2 gap-4">
            <AgeSelect 
              inputProps={register("age", {
                required: "Age is required"
              })}
              error={errors.age?.message}
            />
            
            <LocationSelect 
              inputProps={register("city", {
                required: "Location is required"
              })}
              error={errors.city?.message}
            />

              <input
                type="hidden"
                {...register("location", {
                  validate: (val) =>
                    (Array.isArray(val) &&
                      val.length === 2 &&
                      val.every((n) => Number.isFinite(Number(n))) &&
                      Math.abs(Number(val[0])) <= 90 &&
                      Math.abs(Number(val[1])) <= 180) ||
                    "Invalid location",
                })}
              />
              {errors.location?.message && (
                <p className="text-sm text-primary">{errors.location.message}</p>
              )}
        </div>
      </div>

      <input type="hidden" {...register("photos")} />
    </div>
  );
};
