
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Service/common.service';
import { CardData } from 'src/assets/Data/cardData';



@Component({
  selector: 'app-view-saved-card-list',
  templateUrl: './view-saved-card-list.component.html',
  styleUrls: ['./view-saved-card-list.component.css']
})
export class ViewSavedCardListComponent implements OnInit {


  cardDetails: [];
  closeResult: string;
  openPopup : boolean = false;
  removeCard: boolean = false;
  cardNumber: [CardData];
  dublicateCard : boolean = false;
  constructor(private _commonService : CommonService,) { }

  ngOnInit(): void {
      this.getCardDetails();
  }

  masking(data){
    return data.replace(/(?=) \d{4}(?= \d{4})/g, 'XXXX')
  }


  getCardDetails(){
    this.cardDetails = JSON.parse(localStorage.getItem('CardData'));
    // this._commonService.getResponse().subscribe((res :any) => {
    //   this.cardDetails = [...this.cardData]
    //   console.log(this.cardDetails);
    // })
  }


  addCard(){
    this.openPopup = true;
  }

  removeCardPopup(data){
    this.removeCard = true;
    this.cardNumber = data;
  }

  closePopup({refreshList, dublicateCard}){
    this.openPopup = false;
    this.removeCard = false;
    this.dublicateCard = dublicateCard;
    this.getCardDetails();
  }


  

}
