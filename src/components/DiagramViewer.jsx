import { useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const TRANSFORM_WRAPPER_STYLE = {
  width: '100%',
  height: '100%',
  minHeight: '320px',
};

const EmptyState = () => (
  <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-8">
    <div className="rounded-full bg-slate-200/80 p-4">
      <svg className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <p className="mt-4 text-sm font-semibold text-slate-600">
      Upload a diagram to view it here
    </p>
    <p className="mt-1 text-xs text-slate-500">
      Use the toolbar to zoom and pan once loaded
    </p>
  </div>
);

const ZoomButton = ({ onClick, label, icon }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
  >
    {icon}
    {label}
  </button>
);

const HIGHLIGHT_STYLE = {
  boxShadow: '0 0 0 4px rgb(16 185 129), 0 0 20px rgba(16 185 129, 0.25)',
};

function DiagramViewer({ imageUrl, selectedComponentName }) {
  const imageStyle = useMemo(
    () => (selectedComponentName ? HIGHLIGHT_STYLE : undefined),
    [selectedComponentName]
  );

  if (!imageUrl) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50" role="region" aria-label="Diagram viewer">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/50 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <ZoomButton
                  onClick={() => zoomIn()}
                  label="Zoom In"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                />
                <ZoomButton
                  onClick={() => zoomOut()}
                  label="Zoom Out"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  }
                />
                <ZoomButton
                  onClick={() => resetTransform()}
                  label="Reset View"
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357 2m15.357 2H15" />
                    </svg>
                  }
                />
              </div>
              {selectedComponentName && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-white shadow-md ring-2 ring-emerald-400/50">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                  Highlighting: {selectedComponentName}
                </div>
              )}
            </div>
            <div className="min-h-[320px] overflow-hidden bg-slate-100/80">
              <TransformComponent
                wrapperStyle={TRANSFORM_WRAPPER_STYLE}
                contentStyle={TRANSFORM_WRAPPER_STYLE}
              >
                <div className="flex min-h-[320px] items-center justify-center p-6">
                  <img
                    src={imageUrl}
                    alt="Uploaded circuit diagram"
                    className="max-h-[70vh] w-auto max-w-full object-contain transition-shadow duration-200"
                    draggable={false}
                    style={imageStyle}
                  />
                </div>
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default DiagramViewer;
