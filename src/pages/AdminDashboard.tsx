import { useEffect, useState } from 'react';
import { Category, Product } from '../lib/types';
import { fetchCategories } from '../services/categoryServices';
import { createProduct } from '../services/productServices';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [imageInput, setImageInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    description: '',
    category: 1,
  });

  const navigate = useNavigate();

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('product: ', newProduct);

    try {
      const productCreated = await createProduct(
        newProduct.title,
        newProduct.price,
        newProduct.description,
        newProduct.category,
        images
      );

      if (productCreated.title != '') {
        alert('New product created successfully!');
        navigate('/products');
      } else {
        console.log('Error creating product');
      }
    } catch (error) {
      console.log('Error creating product');
    }
  };

  const handleAddImage = () => {
    if (imageInput && !images.includes(imageInput)) {
      setImages([...images, imageInput]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  return (
    <div className="flex flex-col justify-center mx-auto mt-5">
      <h1 className="text-3xl font-black mb-4">Add a Product</h1>
      <form className="fieldset" onSubmit={handleSubmit}>
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
          value={newProduct.category}
          onChange={handleChange}
        >
          {categories?.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <legend className="fieldset-legend">Images</legend>
        <div className="flex items-center gap-2">
          <input
            type="url"
            placeholder="https://"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            className="input input-sm flex-1"
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
            title="Must be valid URL"
          />
          <button type="button" onClick={handleAddImage} className="btn btn-sm">
            Add Image
          </button>
        </div>
        <ul className="mt-2">
          {images.map((img, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="truncate text-sm text-gray-600">{img}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(img)}
                className="btn btn-xs btn-error ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="validator-hint">Add one or more valid image URLs</p>
        <button className="btn btn-info mt-4" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
