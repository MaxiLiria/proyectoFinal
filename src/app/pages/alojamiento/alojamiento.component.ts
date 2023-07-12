import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI, RoomI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent {

  public alojamiento?: AccommodationsI;
  public habitaciones?: RoomI[] = [];
  public nightsSearched: any;
  public peopleSearched: any;
  public userRole: string | undefined;
  public slideIndex = 0;

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService, private router: Router) {
    this.userRole = this.AuthService.getRole();
    // console.log("user role --------", this.userRole);
    
  }

  ngOnInit(): void {

    this.alojamiento = this.accommodationApi.getAccommodSelected()
    this.nightsSearched = sessionStorage.getItem('nights');
    this.peopleSearched = sessionStorage.getItem('people');

    for (const roomId of this.alojamiento.rooms) {
      this.accommodationApi.getRoomsByID(roomId).subscribe((data: any) => {
        console.log("get room ---", data);
        this.habitaciones!.push(data);
      });
    }
    console.log("this.habitaciones  ---", this.alojamiento );

    // this.showSlides(this.slideIndex);

  }

  generateArray(number: number): number[] {
    return Array(number).fill(0).map((_, i) => i + 1);
  }


  generateStarsArray(level: number): number[] {
    return Array(level).fill(0).map((_, i) => i + 1);
  }

  generateNoStarsArray(level: number): number[] {
    const levelReturn = Math.abs(level - 5)
    return Array(levelReturn).fill(0).map((_, i) => i + 1);
  }

  public editRoom(room: RoomI) {
    this.accommodationApi.setRoomSelected(room);
    this.router.navigate(["/edit-room"]);
  }

  public clickBook(room: RoomI) {
    this.accommodationApi.setRoomSelected(room);
    this.router.navigate(["/reserva"]);

  }

  public showSlides(slideIndex: any) {
    let i;
    let slides: any = document.getElementsByClassName("mySlides");
    console.log(slides);
    console.log(slideIndex);
    
    // let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    // if (slideIndex > slides.length) {slideIndex = 1}    
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";  
    // dots[slideIndex-1].className += " active";
    setTimeout(this.showSlides, 2000); // Change image every 2 seconds
  }

}
