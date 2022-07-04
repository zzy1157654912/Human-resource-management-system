import React,{useState,useEffect} from 'react'
import ProductsService from '../../services/ProductsService'
import AddProductComponent from './AddProductComponent'
import UpdateProductComponent from './UpdateProductComponent'

const ListProductComponent = () => {

    // define products state and get a methed to update products
    const [products, setProducts] = useState([])

    // define addProduct's Pop-ups state
    const [showAddProduct,setShowAddProduct] = useState(false);

    // define updateProduct's Pop-ups state
    const [showUpdateProduct,setShowUpdateProduct] = useState(false);

    // define the updateId
    let [activeId,setActiveId] = useState(null);


    // get products data from backend
    const getAllProducts = () =>{
        ProductsService.getAllProducts().then((response) => {
            // console.log(response.data)
            setProducts(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    // Call the method when the component didmount
    useEffect(() => {
       
        getAllProducts();
        

    }, [])

    const updateProduct = (productId) => {
        setActiveId(productId);
        setShowUpdateProduct(true);
    }

    const deleteProduct = (productId) => {
        // console.log(productId);
        ProductsService.deleteProduct(productId).then(response=>{

            getAllProducts();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div className="container" style={{position:"relative"}}>
            <h2 className="text-center">List Products</h2>
            <button className="btn btn-primary mb-2" onClick={()=>setShowAddProduct(true)}>Add Product</button>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Products Infomation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.productInfo}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateProduct(product.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id)} 
                                        style={{marginLeft:"10px"}}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                showAddProduct? <AddProductComponent setShowAddProduct={setShowAddProduct} getAllProducts={getAllProducts} /> : null
            }
            {
                showUpdateProduct? <UpdateProductComponent id={activeId} setShowUpdateProduct={setShowUpdateProduct} getAllProducts={getAllProducts} /> : null
            }
        </div>
    )
}

export default ListProductComponent;
