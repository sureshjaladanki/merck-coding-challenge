interface SearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ value, onSearchChange }: SearchBarProps) {
  return (
    <label htmlFor="candidate-search" className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">Search by name</span>
      <input
        id="candidate-search"
        type="search"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="e.g. avelumab"
        autoComplete="off"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      />
    </label>
  );
}
