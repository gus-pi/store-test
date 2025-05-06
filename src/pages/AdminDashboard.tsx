import { useEffect, useState } from 'react';
import { Category, Product } from '../lib/types';
import { fetchCategories } from '../services/categoryServices';

const AdminDashboard = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    title: '',
    price: 0,
    description: '',
    category: { id: '', name: '', slug: '' },
    images: [''],
  });

  const getCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log('error getting categories');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = () => {};

  return (
    <div className="flex flex-col justify-center mx-auto mt-5">
      <h1 className="text-3xl font-black mb-4">Add a Product</h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          className="input input-sm"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <legend className="fieldset-legend">price</legend>
        <input
          type="number"
          className="input input-sm"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="9.99"
        />
        <legend className="fieldset-legend">Description</legend>
        <textarea
          className="input input-sm"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <legend className="fieldset-legend">Category</legend>
        <select
          className=""
          name="category"
          value={newProduct.category.id}
          onChange={handleChange}
        >
          {categories?.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <legend className="fieldset-legend">Image</legend>
        <label className="input validator">
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
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </g>
          </svg>
          <input
            type="url"
            required
            placeholder="https://"
            name="images"
            value={newProduct.images[0]}
            onChange={handleChange}
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
            title="Must be valid URL"
          />
        </label>
        <p className="validator-hint">Must be valid URL</p>
        <button className="btn btn-info mt-4">Create</button>
      </fieldset>
    </div>
  );
};

export default AdminDashboard;
