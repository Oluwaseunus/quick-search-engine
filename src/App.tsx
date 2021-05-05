import React from "react";
import "./styles.css";
import { data } from "./utils/data";

export default function App() {
  const [query, setQuery] = React.useState("");
  const [value, setValue] = React.useState("");

  const getPathParent = (obj: object | null, query: string) => {
    let v: string = "";
    const stack: string[] = [];
    const values = obj || data;

    function getPath(bank: object, key: string, prefix = "") {
      Object.entries(bank).forEach(([name, value]) => {
        if (typeof value === "object") {
          getPath(value, key, name);
        } else if (value === key) {
          stack.push(name);
          v = name;
        }
      });
      if (v) stack.unshift(prefix);
    }

    getPath(values, query);

    if (v) {
      setValue(stack.slice(1).join("."));
    } else {
      setValue("null");
      console.error(`Value doesn't exist in object`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // you can pass the object you want to test in place of null
    getPathParent(null, query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="query" value={query} onChange={handleChange} />
        <button>Search</button>
      </form>
      <p>Value: {value}</p>
    </div>
  );
}
