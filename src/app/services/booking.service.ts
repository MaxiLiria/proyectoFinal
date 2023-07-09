import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { BookingI } from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  bookingSelected!: BookingI;

  constructor(private http: HttpClient) { }


    // set booking generated by user
    public setBooking(booking: any){
      this.bookingSelected = booking;
    }

    // get booking selected by user
    public getBooking(){
      return this.bookingSelected;
    }

    postBooking(booking: BookingI) {
      return this.http.post(`${environment.db_url}/bookings`, booking);
    }
  
}