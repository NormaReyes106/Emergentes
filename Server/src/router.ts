import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, getProductById, updateProduct, deleteProduct, getProducts} from './handlers/product';
import { handleInputerrors } from './middleware';

const router = Router();

router.get('/', getProducts)


router.get('/:id',
    param('id').isInt().withMessage("El id debe ser un numero entero"),
        handleInputerrors,
    getProductById
)


router.post(
    '/',    
    body('name')
        .notEmpty().withMessage("Name is required"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0 ).withMessage("El precio no valido"),  
        handleInputerrors,
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage("El id debe ser un numero entero"),
    body('name')
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0 ).withMessage("El precio no valido"),
    body('disponibility')
        .isBoolean().withMessage("El valor de disponibilidad no es valido"),
    handleInputerrors,
    updateProduct
)

router.delete('/:id',
    param('id').isInt().withMessage("El id debe ser un numero entero"),
    handleInputerrors,
    deleteProduct
)

export default router;  

