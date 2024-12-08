const FilteredSearch = ({
  list,
  setList,
  originalList,
  filterBy,
  placeHolder,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    const newList = originalList.filter((val) => {
      console.log(val);
      return `${val[filterBy].toLowerCase()}`.includes(value.toLowerCase());
    });
    setList(newList);
    console.log(list);
    console.log(newList);
  };

  return (
    <input type="text" onChange={handleChange} placeholder={placeHolder} />
  );
};

export default FilteredSearch;
