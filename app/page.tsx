"use client";
import { useState, useEffect } from "react";

export interface ProductType {
  id: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}
export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        console.log(2222222222,res);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu sản phẩm:", err);
      }
    };
    fetchProducts();
  }, []);
  console.log(111111111,products);
  return (
    <div className="p-5">
      <div className="flex space-x-10">
        <div className="w-2/3">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">STT</th>
                <th className="p-2 border border-gray-300">Tên sản phẩm</th>
                <th className="p-2 border border-gray-300">Hình ảnh</th>
                <th className="p-2 border border-gray-300">Giá</th>
                <th className="p-2 border border-gray-300">Số lượng</th>
                <th className="p-2 border border-gray-300">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={product.id} className="text-center">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{product.productName}</td>
                  <td className="p-2 border border-gray-300 flex justify-center text-center">
                    <img src={product.image} alt="" className="w-16 h-16"/>
                  </td>
                  <td className="p-2 border border-gray-300">{product.price} VNĐ</td>
                  <td className="p-2 border border-gray-300">{product.quantity}</td>
                  <td className="p-2 border border-gray-300 space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Sửa</button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold mb-4">Thêm mới sản phẩm</h3>
          <input
            type="text"
            name="name"
            placeholder="Tên"
            className="mb-3 w-full px-3 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Hình ảnh"
            className="mb-3 w-full px-3 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Giá"
            className="mb-3 w-full px-3 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Số lượng"
            className="mb-3 w-full px-3 py-2 border border-gray-300 rounded"
            min="1"
            value={1}
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}