function Table({ filteredCountries, handleSortingChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Country Name
            <button onClick={() => handleSortingChange("countryName")}>
              Sort A-Z / Z-A
            </button>
          </th>
          <th>
            Population
            <button onClick={() => handleSortingChange("population")}>
              Sort Asc / Desc
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredCountries.map((country, index) => (
          <tr key={index}>
            <td>{country.countryName}</td>
            <td>{country.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
