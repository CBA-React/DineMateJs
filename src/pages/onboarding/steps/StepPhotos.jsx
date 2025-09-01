import { useFormContext, useController } from "react-hook-form";
import { useRef, useState, useCallback } from "react";

const MAX_FILES = 6;
const MAX_SIZE_MB = 5;
const ACCEPT_MIME = ["image/jpeg", "image/png"]; 

export function StepPhotos() {
    const { control } = useFormContext();
    const {
      field: { value: photos = [], onChange: setPhotos },
      fieldState: { error },
    } = useController({
      name: "photos",
      control,
      defaultValue: [],
      rules: {
        validate: v => (Array.isArray(v) && v.length >= 2) || "Please upload at least 2 photos",
      },
    });

  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const openPicker = () => inputRef.current?.click();

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFiles = useCallback(
    async (fileList) => {
      if (!fileList) return;
      setLocalError(null);

      const existing = photos.length;
      const files = Array.from(fileList);

      const accepted = [];
      const rejected = [];

      for (const f of files) {
        const typeOk = ACCEPT_MIME.includes(f.type);
        const sizeOk = f.size <= MAX_SIZE_MB * 1024 * 1024;
        if (!typeOk) rejected.push(`${f.name}: unsupported type`);
        else if (!sizeOk) rejected.push(`${f.name}: > ${MAX_SIZE_MB}MB`);
        else accepted.push(f);
      }

      const room = Math.max(0, MAX_FILES - existing);
      const toUse = accepted.slice(0, room);

      const urls = await Promise.all(toUse.map(readAsDataURL)); // replace with upload later
      const next = [...photos, ...urls];
      setPhotos(next); // updates RHF value + triggers validation

      if (rejected.length) setLocalError(rejected.join("\n"));
    },
    [photos, setPhotos]
  );

  const onInputChange = (e) => {
    void handleFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    void handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const removeAt = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const disabled = photos.length >= MAX_FILES;

  return (
    <section>
      <div
        role="button"
        tabIndex={0}
        onClick={!disabled ? openPicker : undefined}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) openPicker();
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={[
          "rounded-2xl p-10 text-center cursor-pointer select-none",
          "border-2 border-dashed transition",
          dragging ? "border-red-400 bg-red-50/40" : "border-gray-300",
          disabled ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <p className="text-red-600 text-xl">Click to Upload or drag and drop</p>
        <p className="text-sm text-gray-400 mt-2">
          JPG, JPEG, PNG. Max file size: 5MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_MIME.join(",")}
          multiple
          className="hidden"
          onChange={onInputChange}
          disabled={disabled}
        />
      </div>

      {photos.length > 0 && (
        <>
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-gray-200"
              >
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full px-2 py-1 text-xs shadow"
                >
                  Remove
                </button>
                {i === 0 && (
                  <span className="absolute bottom-2 left-2 bg-white/90 text-xs px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-right text-sm text-gray-500">
            {photos.length}/{MAX_FILES} uploaded
          </div>
        </>
      )}

      {error && <p className="mt-2 text-sm text-primary">{error.message}</p>}
      {localError && (
        <p className="mt-2 whitespace-pre-wrap text-sm text-primary">{localError}</p>
      )}
    </section>
  );
}