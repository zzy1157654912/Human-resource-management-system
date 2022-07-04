import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/api/v1/products";

class ProductsService{



    getAllProducts(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createProduct(product){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,product)
    }

    getProductById(productId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + productId)
    }

    updateProduct(productId,product){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + productId,product)

    }

    deleteProduct(productId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + productId);
    }

}

export default new ProductsService();