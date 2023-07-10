import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccommodationsI, RoomI, UserI, BookingI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {

  public submittedDetails: boolean = false;
  public isPaid: boolean = false;
  public room!: RoomI;
  public bookingForm!: FormGroup;
  public payForm!: FormGroup;
  public user = {
    name: "Paco",
    surname: "Alonso"
  }
  public booking!: BookingI;

  constructor(private accommodationApi: AccommodationService, public AuthService: AuthService, private router: Router, private bookingApi: BookingService) {}

  ngOnInit(): void {
    // get room selected from service api
    this.room = this.accommodationApi.getRoomSelected();
    console.log("selected room is -------", this.room);
    console.log("accommod is -------", this.accommodationApi.getAccommodSelected());

    // this.user = this.AuthService.getUser();
    this.user = this.user;

    this.bookingForm = new FormGroup({
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      peticiones: new FormControl('')

    });

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log("form values changes ----------", data);
      console.log("submittedDetails ----------", this.submittedDetails);
      
      this.booking = data;
    })


    this.payForm = new FormGroup({
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      numeroTarjeta: new FormControl(),
      FechaCaducidad: new FormControl(),
      CVC: new FormControl()

    });

    
  }

  public clickIrAPagar() {
      console.log("click  ir a pagar");
      // post booking
      this.submittedDetails = true;
      console.log("this.bookingForm.valid -->", this.bookingForm.valid);
      
      if (this.bookingForm.valid) {
        this.bookingApi.setBooking(this.booking);
        this.bookingForm.reset();
        }

    }
     

  public clickPagar() {
    // post booking
    this.booking = this.bookingApi.getBooking();
    console.log("this.booking ----->", this.booking);
    this.isPaid = true;

    this.booking.bookingCode = Math.floor(Math.random()*1000000);
    this.booking.dateEntry = this.accommodationApi.accommodDataSearch.checkin;
    this.booking.dateDeparture = this.accommodationApi.accommodDataSearch.checkout;
    this.booking.room = this.room._id;
    // delete this.booking.CVC;


    if (this.bookingForm.valid && this.isPaid) {
      this.bookingApi.postBooking(this.booking).subscribe((data) => {
        console.log("posted data ---------", data);   
        console.log("this.ispaid ----->", this.isPaid);
     
      });
    };

  }
}
