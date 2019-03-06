import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* ------------------------------------------------------------------ */
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order.service';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [OrderComponent],
  providers: [OrderService]
})
export class OrderModule { }
