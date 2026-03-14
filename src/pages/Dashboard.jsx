import { useState, useEffect, useCallback, useMemo } from 'react';
import UploadBox from '../components/UploadBox';
import DiagramViewer from '../components/DiagramViewer';
import ComponentList from '../components/ComponentList';
import { getComponents } from '../services/api';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) {
      setImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getComponents()
      .then((data) => {
        if (!cancelled) setComponents(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load components');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFileChange = useCallback((newFile) => {
    setFile(newFile);
    setSelectedComponentId(null);
  }, []);

  const selectedComponentName = useMemo(
    () => components.find((c) => c.id === selectedComponentId)?.name ?? null,
    [components, selectedComponentId]
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md" role="banner">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                Diagram Dashboard
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Upload, view & inspect circuit diagrams
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8" aria-label="Dashboard content">
        <section className="animate-in" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Upload diagram
          </h2>
          <UploadBox
            file={file}
            previewUrl={imageUrl}
            onFileChange={handleFileChange}
          />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DiagramViewer
              imageUrl={imageUrl}
              selectedComponentName={selectedComponentName}
            />
          </div>
          <div className="lg:col-span-1">
            {loading ? (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50" role="status" aria-live="polite">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" aria-hidden />
                  <p className="text-sm font-medium text-slate-600">
                    Loading components…
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-lg" role="alert">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            ) : (
              <ComponentList
                components={components}
                selectedId={selectedComponentId}
                onSelect={setSelectedComponentId}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
