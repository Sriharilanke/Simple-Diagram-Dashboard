import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ACCEPTED_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
};

const UploadIcon = () => (
  <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

function UploadBox({ file, previewUrl, onFileChange, disabled = false }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    disabled,
    noClick: false,
  });

  const handleReplace = (e) => {
    e.stopPropagation();
    onFileChange(null);
  };

  if (file) {
    return (
      <div className="animate-in rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-shadow hover:shadow-xl">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-md ring-2 ring-white">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={`Preview of uploaded diagram: ${file.name}`}
                className="h-full w-auto object-cover"
              />
            ) : (
              <span className="text-xs font-medium text-slate-400">…</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {file.name}
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button
              type="button"
              onClick={handleReplace}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357 2m15.357 2H15" />
              </svg>
              Replace image
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200
        ${isDragActive
          ? 'border-emerald-500 bg-emerald-50/80 shadow-inner'
          : 'border-slate-300 bg-white shadow-lg shadow-slate-200/50 hover:border-emerald-400 hover:bg-slate-50/80 hover:shadow-xl'}
      `}
    >
      <input {...getInputProps()} aria-label="Upload diagram image" />
      <UploadIcon />
      <p className="mt-3 text-base font-semibold text-slate-700">
        {isDragActive ? 'Drop the image here' : 'Drag & drop or click to upload'}
      </p>
      <p className="mt-1 text-sm text-slate-500">
        PNG or JPG, up to 10MB
      </p>
    </div>
  );
}

export default UploadBox;
