import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CardData } from 'src/assets/Data/cardData';


@Component({
  selector: 'app-remove-card-details',
  templateUrl: './remove-card-details.component.html',
  styleUrls: ['./remove-card-details.component.css']
})
export class RemoveCardDetailsComponent implements OnInit {
 
  @ViewChild('content', { static: true }) contentData: ElementRef;
  @Output() refreshList = new EventEmitter();
  @Input() cardNumber =  '';
  cardData: [CardData] ;
  closeResult: string;

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.cardData = JSON.parse(localStorage.getItem('CardData'));
  }

  ngOnChanges(){
    if(this.cardNumber) {
    this.open(this.contentData);
    }
  }


  removeCardDetails(){
    const updatedHero = this.cardData.filter(item => item.cardNumber !== this.cardNumber);
    localStorage.setItem('CardData', JSON.stringify(updatedHero))
    this.getDismissReason('remove succesffully');
   

  }


  open(content) {
    console.log(content);
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    this.refreshList.emit({refreshList : true,});
    if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  
  }

}
