import { useMemo } from 'react';

const COMPONENT_ICONS = {
  Resistor: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12h16M8 8v8M12 6v12M16 8v8M20 6v12" strokeLinecap="round" />
    </svg>
  ),
  Capacitor: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="6" width="6" height="12" rx="1" />
      <rect x="14" y="6" width="6" height="12" rx="1" />
    </svg>
  ),
  Diode: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4v16M18 4v16M6 12h12" strokeLinecap="round" />
      <path d="M6 4l6 8-6 8" />
    </svg>
  ),
  Transistor: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" strokeLinecap="round" />
    </svg>
  ),
};

const defaultIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

function ComponentList({ components, selectedId, onSelect }) {
  const list = useMemo(
    () =>
      (components || []).map((item) => ({
        ...item,
        isSelected: item.id === selectedId,
      })),
    [components, selectedId]
  );

  if (!components?.length) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          Components
        </h3>
        <p className="text-sm font-medium text-slate-500">
          No components loaded
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50" role="complementary" aria-labelledby="components-heading">
      <div className="border-b border-slate-200/80 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
        <h3 id="components-heading" className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Detected components
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Click to highlight on diagram
        </p>
      </div>
      <ul className="divide-y divide-slate-100" role="list" aria-label="Circuit components list">
        {list.map((item) => (
          <li key={item.id} className="group">
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`
                flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-200
                group-last:rounded-b-2xl
                ${item.isSelected
                  ? 'bg-emerald-50 font-semibold text-emerald-800 ring-inset ring-2 ring-emerald-500/50'
                  : 'text-slate-700 hover:bg-slate-50'}
              `}
            >
              <span className={item.isSelected ? 'text-emerald-600' : 'text-slate-400'}>
                {COMPONENT_ICONS[item.name] ?? defaultIcon}
              </span>
              <span className="truncate">{item.name}</span>
              {item.isSelected && (
                <span className="ml-auto">
                  <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentList;
