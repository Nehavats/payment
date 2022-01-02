
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';


@Component({
  selector: 'app-view-saved-card-list',
  templateUrl: './view-saved-card-list.component.html',
  styleUrls: ['./view-saved-card-list.component.css']
})
export class ViewSavedCardListComponent implements OnInit {


  cardDetails: any;
  cardData : any;
  closeResult: string;
  openPopup : boolean = false;
  constructor(private _commonService : CommonService,  ) { }

  ngOnInit(): void {
    this.cardData = JSON.parse(localStorage.getItem('CardData'));
      this.getCardDetails();
  }


  getCardDetails(){
    this.cardData = JSON.parse(localStorage.getItem('CardData'));
    this._commonService.getResponse().subscribe((res :any) => {
      this.cardDetails = [...this.cardData]
     
      console.log(this.cardDetails);
    })
   
  }

  removeCardDetails(data){
    const updatedHero = this.cardDetails.filter(item => item.cardNumber !== data);
    localStorage.setItem('CardData', JSON.stringify(updatedHero))

    this.getCardDetails();

  }

  addCard(){
    this.openPopup = true;
  }

  closePopup(data){
    this.openPopup = false;
    this.getCardDetails();
  }


  

}
