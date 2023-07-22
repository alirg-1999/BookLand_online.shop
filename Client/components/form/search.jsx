/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FormInput } from "./input";
import { GetBookByCategory , GetCategoryApi, GetBookBySearch } from "@/pages/api/serverApi";
import { SearchHandler } from "@/redux/ProductSlice";
import { useDispatch } from "react-redux";

const ages = ["Adult", "Teenager", "Children"];

const ListItem = ({ item, event }) => {
  return (
    <li
      className={`text-sm font-light min-w-[150px] text-center bg-white rounded-md cursor-pointer py-1`}
      onClick={event}
    >
      {item}
    </li>
  );
};

const SearchBox = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    category: "",
    age: "all",
    search: "",
  });
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let mounted = true;
    GetCategoryApi().then((res) => {
      if (mounted) setCategory(res.data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const selectCategoryHandler = (id) => {
    GetBookByCategory(id).then((res) => {
      dispatch(SearchHandler(res.data));
    });
  };

  const selectAgesHandler = (age) => {
    GetBookBySearch(age).then((res) => {
      dispatch(SearchHandler(res.data));
    });
  };

  const searchInputHandler = (text) => {
    GetBookBySearch(text).then((res) => {
      dispatch(SearchHandler(res.data));
    });
  };

  return (
    <div className="bg-gray-200 rounded-md shadow-inner px-6 py-3">
      <h2 className="text-center mb-4 font-bold text-gray-600 text-3xl">
        Search Book
      </h2>
      <div className="relative pb-4 ">
        <FormInput
          name={"search"}
          event={(e) => {
            searchInputHandler(e.target.value);
            setSearch({ search: e.target.value, category: "", age: "" });
          }}
          placeholder={"Search Book with Title"}
          value={search.input}
        />

        <FiSearch className="absolute right-3 top-[16px] text-gray-500" />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <aside className="p-5 rounded-md shadow-xl bg-gray-100 w-full md:w-1/4">
          <h3 className="text-lg mb-3 text-gray-800 text-center border-b">
            Ages
          </h3>
          <ul className="flex flex-row md:flex-col gap-2 justify-center items-center flex-wrap">
            {ages.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                event={() => {
                  setSearch({ search: "", category: "", age: item });
                  selectAgesHandler(item);
                }}
              />
            ))}
          </ul>
        </aside>
        <aside className="p-5 rounded-md shadow-xl bg-gray-100 w-full md:w-3/4">
          <h3 className="text-lg mb-3 text-gray-800 text-center border-b">
            Category
          </h3>
          {category ? (
            <ul className="flex gap-2 justify-center items-center flex-wrap">
              {category.map((item) => (
                <ListItem
                  item={item.category_title}
                  key={item.id}
                  event={() => {
                    setSearch({ search: "", category: item.id, age: "" });
                    selectCategoryHandler(item.id);
                  }}
                />
              ))}
            </ul>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default SearchBox;
