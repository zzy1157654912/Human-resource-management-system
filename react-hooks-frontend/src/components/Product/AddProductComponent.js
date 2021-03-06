import React,{ useState,useEffect } from 'react'
import ProductsService from '../../services/ProductsService'

const AddProductComponent = ({setShowAddProduct,getAllProducts}) => {

    const [productName, setProductName] = useState("")
    const [productInfo, setProductInfo] = useState("")
    const [searchValue,setSearchValue] = useState([])
    const [data, setData] = useState([]);

    // useEffect(() => {
    //
    // },[newArr])

    const saveProduct = (e)=>{
        e.preventDefault();

        const product = {productName,productInfo};

        // console.log(product)

        
        ProductsService.createProduct(product).then(response=>{

            console.log(response.data)
            setShowAddProduct(false);
            getAllProducts();
                
    
        }).catch(error=>{
            console.log(error)
        })
        

        
    }
    const allData = [
        {
            name: 'zzy',
            phone: '110'
        },
        {
            name: 'zxg',
            phone: '120'
        },
        {
            name: 'ymk',
            phone: '130'
        }
    ]
    let newArr = [];
    const onChangeSearch = (e) => {
        newArr = allData.filter((item) => {
            return item.name == e
        });
        console.log(newArr)
        setData(newArr)
        console.log(data)
    }

  
    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            //输入框
            <input
                name="searchValue"
                onChange={e => onChangeSearch(e.target.value)}
            />
            //渲染对应的数据
            {
                data.length > 0 &&
                <div> {data[0].name} </div>
            }
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                      <div style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}> Add Product</div>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">Product Name :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter product name"
                                    name="productName"
                                    className="form-control"
                                    value = {productName}
                                    onChange={e=>setProductName(e.target.value)}
                                   />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Product Infomation :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter product information"
                                    name="productName"
                                    className="form-control"
                                    value = {productInfo}
                                    onChange={e=>setProductInfo(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>saveProduct(e)}>Submit</button>
                                <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={()=>setShowAddProduct(false)}>Cancel</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default AddProductComponent
