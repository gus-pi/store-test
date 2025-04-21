import { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryServices';
import { Category, Filter } from '../lib/types';

type SideBarProps = {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
};

const SideBar = ({ activeFilter, setActiveFilter }: SideBarProps) => {
  const [categories, setCategories] = useState<Category[]>();

  console.log(activeFilter);
  const getCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log('error getting caregories');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <ul className="my-5 flex flex-col gap-2">
        {categories && (
          <select
            defaultValue="Select a category"
            className="select select-neutral"
            onChange={(e) =>
              setActiveFilter({ ...activeFilter, category: e.target.value })
            }
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
          <input type="text" placeholder="Search" />
        </li>
        <li>Price range</li>
      </ul>
    </div>
  );
};
export default SideBar;
