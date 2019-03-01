import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { Observable } from 'rxjs/Observable';
/**
   *  Inject HTTP headers are is used for content type
  */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class OrderService {
  // URL for CRUD operations
  orderUrl = 'http://localhost:3000/order';
  /**
   *  Inject http Client service.
   */
  constructor(private http: HttpClient) {
  }
  /**
  * getAllOrders Method are get all order details from server
  */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }
  /**
    * createOrder method are add new order in server
    * @param order - get the order data
    */
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order, httpOptions);
  }
  /**
   * getOrderById method are get the order deatils as per from server
   * @param orderId - get order deatils as per order id
   */
  getOrderById(orderId: number): Observable<Order> {
    console.log(this.orderUrl + '/' + orderId);
    return this.http.get<Order>(this.orderUrl + '/' + orderId);
  }
  /**
   * updateOrder method are update the order deatils on server
   * @param order - get update deatils as per order
   */
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.orderUrl + '/' + order.id, order, httpOptions);
  }
  /**
  * deleteOrderById method are used for delete the record from order
  * @param orderId - delete the record as per order id
  */
  deleteOrderById(orderId: number): Observable<Order> {
    return this.http.delete<Order>(this.orderUrl + '/' + orderId);

  }
}

