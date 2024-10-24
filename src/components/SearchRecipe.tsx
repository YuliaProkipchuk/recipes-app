import { useEffect, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";

export default function SearchRecipe() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const submit = useSubmit();
  const navigate = useNavigate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(e.target.value);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInputValue) {
        navigate(`/search?q=${searchInputValue}`);
      } else {
        navigate(`/`);
      }
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInputValue, submit]);
  return (
    <form method="get" action="/search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by name"
        value={searchInputValue}
        onChange={handleChange}
      />
    </form>
  );
}
