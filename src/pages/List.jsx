import axios from 'axios'
import  { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-4 text-xl font-semibold text-gray-800">All Products List</p>

      <div className="overflow-x-auto">

        {/* ------- List Table Title ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-100 text-sm text-gray-700 font-medium">
          <span className="text-left">Imagen</span>
          <span>Nombre</span>
          <span>Categoria</span>
          <span>Precio</span>
          <span className="text-center">Accion</span>
        </div>

        {/* ------ Product List ------ */}
        {
          list.length > 0 ? (
            list.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b text-sm text-gray-700">
                <img className="w-16 h-16 object-cover rounded-lg" src={item.image[0]} alt={item.name} />
                <p className="text-gray-900 font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-gray-800 font-medium">{currency}{item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-red-600 text-center cursor-pointer font-semibold hover:text-red-800 transition-colors duration-200"
                >
                  X
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center py-4 text-gray-500">
              No products available.
            </div>
          )
        }

      </div>
    </>
  );
}

// Añadir la validación de `props`
List.propTypes = {
  token: PropTypes.string.isRequired, // Se espera un prop `token` de tipo string
};

export default List;
