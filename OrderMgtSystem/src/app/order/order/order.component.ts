/**
 * @author - Naim Shaikh
 * @description - This component file are the used add,update and delete order  .
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  /**
   * Declear the variable
   */
  public orderForm: FormGroup;
  allOrders: Order[];
  orderIdToUpdate = null;
  processValidation = false;

  /**
  * Inject the service
  * @param service - for order service
  * @param fb - for usnig form builder in reactive forms
  */
  constructor(private fb: FormBuilder, private orderService: OrderService) {
  }

  // Create ngOnInit()Create formand and load orders

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      item_name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]

    });
    this.getAllOrders(); // Fetch all orders
  }

  /**
  * Get all the orders
  * @param  - Get order form get getAllOrders method
  */
  getAllOrders() {
    this.orderService.getAllOrders()
      .subscribe(
        data => this.allOrders = data);
  }
  /**
   *First of fall check the form is valid after then perform crtate or update
  * when user submit the create buttton then add new record on server
  * when user submit the upadte  button then upadte existing record on the server
  */
  onOrderFormSubmit() {
    this.processValidation = true;
    if (this.orderForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    const order = this.orderForm.value;
    if (this.orderIdToUpdate === null) {
      this.orderService.createOrder(order)
        .subscribe(() => {
          this.getAllOrders();
          this.backToCreateOrder();
        },
        );
    } else {
      // Handle update order
      order.id = this.orderIdToUpdate;
      this.orderService.updateOrder(order)
        .subscribe(() => {
          this.getAllOrders();
          this.backToCreateOrder();
        });
    }
  }
  /**
   * Loads order to edit
   * @param orderId - Update record using order id
   */

  loadOrderToEdit(orderId: string) {
    this.orderService.getOrderById(orderId)
      .subscribe(order => {
        console.log('data :', order);

        this.orderIdToUpdate = order.id;
        this.orderForm.controls['name'].setValue(order.name);
        this.orderForm.controls['item_name'].setValue(order.item_name);
        this.orderForm.controls['price'].setValue(order.price);
        this.orderForm.controls['quantity'].setValue(order.quantity);
        this.processValidation = true;

      });
  }
  /**
   * Deletes order
   * @param orderId - Delete record using order id
   */
  deleteOrder(orderId: string) {
        this.orderService.deleteOrderById(orderId)
      .subscribe(() => {
        this.getAllOrders();
        this.backToCreateOrder();
      });
  }

  /**
   * Go back from update to create
   */
  backToCreateOrder() {
    this.orderIdToUpdate = null;
    this.orderForm.reset();
    this.processValidation = false;
  }
}

