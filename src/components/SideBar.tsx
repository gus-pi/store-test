import { Range } from 'react-range';
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryServices';
import { Category, Filter } from '../lib/types';

type SideBarProps = {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
  setCurrentPage: (n: number) => void;
};

const SideBar = ({
  activeFilter,
  setActiveFilter,
  setCurrentPage,
}: SideBarProps) => {
  const [categories, setCategories] = useState<Category[]>();
  const [values, setValues] = useState([1, 700]);
  const getCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log('error getting categories');
    }
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveFilter({
      ...activeFilter,
      category: e.target.value,
    });

    setCurrentPage(0);
  };

  useEffect(() => {
    getCategories();
    setActiveFilter({
      ...activeFilter,
      priceRange: { min: values[0], max: values[1] },
    });
    setCurrentPage(0);
  }, [values]);

  return (
    <div className="w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <ul className="my-5 flex flex-col gap-2">
        {categories && (
          <select
            defaultValue="Select a category"
            className="select select-neutral"
            onChange={handleChangeCategory}
          >
            <option value="0" key={0}>
              Select a category
            </option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <li>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              placeholder="Filter by title"
              onChange={(e) =>
                setActiveFilter({ ...activeFilter, title: e.target.value })
              }
            />
          </label>
        </li>
        <li>
          <label className="text-sm">Filter by price:</label>
          <Range
            values={values}
            step={10}
            min={1}
            max={700}
            onChange={(vals) => setValues(vals)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-neutral rounded-full my-4"
                style={{ ...props.style }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-primary rounded-full shadow-md"
              />
            )}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>${values[0]}</span>
            <span>${values[1]}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
