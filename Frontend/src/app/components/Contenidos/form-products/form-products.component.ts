import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/products.service';
import { ProductModel } from '../../../shared/products.model'; // Importa el modelo correcto

@Component({
    selector: 'app-form-products',
    templateUrl: './form-products.component.html',
    styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent {
    productForm: FormGroup;
    nameValue: string = ''; 
    descriptionValue: string = ''; 
    priceValue: number = 0; 
    categoriaValue: string = ''; 
    onSaleValue: boolean = false; 
    imageValue: any = null;

    constructor(private formBuilder: FormBuilder, private productService: ProductService) { // Asegúrate de inyectar el servicio aquí
        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            categoria: ['', Validators.required],
            onSale: [false],
            image: [null, Validators.required],
        });
    }

    onSubmit() {
        if (this.productForm.valid) {
            const newProduct: ProductModel = this.productForm.value;
            this.productService.addProduct(newProduct).subscribe(
                response => {
                    console.log('Product added successfully', response);
                    this.productForm.reset(); // Resetea el formulario

                    // You can also add logic to reset the form or navigate to another page
                },
                error => {
                    console.error('Error adding product', error);
                }
            );
        } else {
            console.error('Invalid form');
        }
    }

    onImageSelected(event: any) {
        // Implement your image selection logic here
    }
}
