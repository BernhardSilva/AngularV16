import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  data: Customer[] = [];
  customers$: Observable<Customer[]> | never[] = [];
  email: string = 'john@example.com';

  constructor(private customerService: CustomerService) {
    this.customerService.getCustomers();
    this.customerService.getCustomerByEmail(this.email);
  }

  ngOnInit() {
    this.getCustomerByEmail(this.email);
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (response: Customer[]) => {
        console.log(response);
      },
      error(err: HttpErrorResponse) {
        console.error(err.message);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getCustomerByEmail(email: string): void {
    this.customerService.getCustomerByEmail(email).subscribe({
      next: (response: Customer) => {
        console.log(response);
      },
      error(err: HttpErrorResponse) {
        console.error(err.message);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
