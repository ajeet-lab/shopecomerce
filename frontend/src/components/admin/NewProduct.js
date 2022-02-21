import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newProduct } from "../../redux/actions/productAction";
import Sidebar from "./Sidebar";
const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product, success } = useSelector(
    (state) => state.newProduct
  );
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImage] = useState([]);
  const [imagesPreview, setImagePreview] = useState([]);
  
  const categories = [
    "Electronics",
    "Laptops",
    "Cameras",
    "Accesseries",
    "Headphones",
    "Beauty/Healthy",
    "Sport",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if(success){
      alert.success("Product added successfully");
    }
  }, [alert, dispatch, error, success]);

  const onChangeImageHandler = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setImage([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((oldImg) => [...oldImg, reader.result]);
          setImage((oldImg) => [...oldImg, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("stock", stock);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newProduct(formData));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-dark pt-3">
            <Sidebar />
          </div>
          <div className="col-10 py-5">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
                <div className="card">
                  <div className="card-body">
                    <h3 className="text-center">New Product</h3>
                    <form onSubmit={submitHandler} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={price}
                          className="form-control"
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                          type="text"
                          name="description"
                          value={description}
                          className="form-control"
                          onChange={(e) => setDescription(e.target.value)}
                          rows="5"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          value={category}
                          id="category"
                          className="form-select"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories &&
                            categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="stock">Stock</label>
                        <input
                          type="number"
                          name="stock"
                          value={stock}
                          className="form-control"
                          onChange={(e) => setStock(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="seller">Seller</label>
                        <input
                          type="text"
                          name="seller"
                          value={seller}
                          className="form-control"
                          onChange={(e) => setSeller(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="images">Images</label>
                        <input
                          type="file"
                          name="images"
                          className="form-control"
                          onChange={onChangeImageHandler}
                          multiple
                        />
                        <div className="d-flex">
                          {imagesPreview &&
                            imagesPreview.map((img) => (
                              <img
                              key={img}
                                src={img}
                                className="me-2 my-2"
                                alt={img}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                              />
                            ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          disabled={loading ? true : false}
                          className="btn btn-warning w-100"
                        >
                          Add New Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
