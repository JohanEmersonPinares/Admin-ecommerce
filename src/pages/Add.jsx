import { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, file) => {
    switch (index) {
      case 1:
        setImage1(file);
        break;
      case 2:
        setImage2(file);
        break;
      case 3:
        setImage3(file);
        break;
      case 4:
        setImage4(file);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 p-8 bg-white shadow-lg rounded-md">
      <div>
        <p className="mb-4 text-xl font-semibold text-gray-700">Subir Imagenes</p>
        <div className="flex gap-4">
          {[image1, image2, image3, image4].map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className="flex flex-col items-center">
              <img
                className="w-24 h-24 object-cover border-2 border-gray-300 rounded-lg shadow-md"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt={`Upload Image ${index + 1}`}
              />
              <input
                onChange={(e) => handleImageChange(index + 1, e.target.files[0])}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-gray-600">Nombre del producto</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Escribe el nombre de producto"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-gray-600">Descripcion del producto</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe la descripcion del producto"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="w-full sm:w-[150px]">
          <p className="mb-2 text-gray-600">Categoria</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Niños">Niños</option>
          </select>
        </div>

        <div className="w-full sm:w-[150px]">
          <p className="mb-2 text-gray-600">Sub Categoria</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Topwear">Prenda superior</option>
            <option value="Bottomwear">Prenda inferior</option>
            <option value="Winterwear">Ropa de invierno</option>
          </select>
        </div>

        <div className="w-full sm:w-[150px]">
          <p className="mb-2 text-gray-600">Precio de producto</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-gray-600">Talla del producto</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prevSizes) =>
                  prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
                )
              }
              className={`cursor-pointer px-4 py-2 border rounded-md ${
                sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between">
        <label className="text-sm flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            onChange={() => setBestseller(!bestseller)}
            checked={bestseller}
          />
         Mas vendido

        </label>
        <div className="text-left">
  <   button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
    Agregar producto
     </button>
</div>

      </div>
    </form>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;
