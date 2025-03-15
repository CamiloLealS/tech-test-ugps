import { useEffect, useState } from "react";

const YearFilter = ({ filters, setFilters }) => {
  const [yearSaved, setYearSaved] = useState("");

  const filtersString = JSON.stringify(filters);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("gameFilters")) || {};
    setYearSaved(savedFilters.year ? String(savedFilters.year) : "");
  }, [filtersString]);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYearSaved(selectedYear);
    setFilters((prev) => ({ ...prev, year: selectedYear }));
    localStorage.setItem(
      "gameFilters",
      JSON.stringify({ ...filters, year: selectedYear })
    );
  };

  return (
    <select value={yearSaved} onChange={handleYearChange}>
      <option value="">Año</option>
      {[...Array(55)].map((_, i) => {
        const year = (2025 - i).toString();
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
  );
};

export default YearFilter;
