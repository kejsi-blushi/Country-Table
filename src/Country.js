import { useEffect, useState } from "react";
import "./App.css";
import countriesList from "./countriesList";
import Table from "./Table";

function Country() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState(countriesList);
  const [filteredCountries, setFilteredCountries] = useState(countriesList); // Initialize with the full country list
  const [showTable, setShowTable] = useState(true);
  const [message, setMessage] = useState("");
  const [sortBy, setSortBy] = useState({
    column: null,
    order: "asc",
  });

  useEffect(() => {
    let filtered = countriesList.filter((country) =>
      country.countryName.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (sortBy.column) {
      const { column, order } = sortBy;
      filtered = filtered.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        const comparison =
          order === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
        return comparison;
      });
    }

    setFilteredCountries(filtered);

    if (inputValue !== "") {
      setShowTable(filtered.length > 0);
      setMessage(filtered.length === 0 ? "Countries not found" : "");
    } else {
      setShowTable(false);
      setMessage("Enter a country name to check population");
    }
  }, [inputValue, sortBy]);

  const sorting = (column) => {
    setSortBy((prevSortBy) => ({
      column,
      order:
        prevSortBy.column === column && prevSortBy.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        name="country"
        placeholder="Country name"
        onChange={(event) => setInputValue(event.target.value)}
      ></input>
      {showTable ? (
        <Table
          filteredCountries={filteredCountries}
          handleSortingChange={sorting}
        />
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Country;