import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  months,
  years
} from '../../../assets/Data/Calender.data';
import {NgbModal, ModalDismissReasons} 
      from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-card-details',
  templateUrl: './add-card-details.component.html',
  styleUrls: ['./add-card-details.component.css']
})
export class AddCardDetailsComponent implements OnInit, OnChanges {
  paymentForm: FormGroup;
  @ViewChild('content', { static: true }) contentData: ElementRef;
  @ViewChild('ccNumber',  { static: false }) ccNumberField: ElementRef;
  cardType : string = 'unknown';
  @Input() openPopup =  '';
  @Output() refreshList = new EventEmitter();
  monthData = months;
  yearData = years;
  formValue: {};
  closeResult: string;
  dublicateCard : boolean = false;
  expMask = [ /\d/, /\d/,/\d/,/\d/, ' ', /\d/, /\d/, /\d/,/\d/, ' ', /\d/, /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/, /\d/]
  constructor( private fb: FormBuilder, private modalService: NgbModal,) {}
  



  ngOnChanges(){
    if(this.openPopup) {
    this.open(this.contentData);
    }
  }


  ngOnInit(){
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.validateCard.bind(this)]],
      cvvNumber : ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(3)]],
      expiryMonth : ['', [Validators.required, this.validateExpiry.bind(this)]],
      expiryYear: ['', [Validators.required, this.validateExpiry.bind(this)]],
      cardType : ['unknown']
    })
  }


  validateExpiry(c : FormControl):{[error : string]: any} {
    if(!c.dirty) {
      return null;
    }
    let expMonth = this.paymentForm.get('expiryMonth').value;
    let expYear = this.paymentForm.get('expiryYear').value;

    if(expMonth === ""  || expYear === "") {
      return null;
    }
    const year = 2000;
    const givenYear = year + parseInt(expYear, 10);
    const d = new Date();
    const currentYear  = d.getFullYear();
    if(expYear < currentYear || (givenYear === currentYear && expMonth < d.getMonth() +1)) {
        return {
          ValidateExpiry : {
            cardExpired : true,
          }
        };
    }
  }


  validateCard(c : FormControl) : {[error : string]: any}{
    if(!c.dirty) {
      return null;
    }
    const temp = c.value.replace(/[\s]+/ig, '');
    let type = this.paymentForm.get('cardType').value;

    if(type === 'unknown' && temp.length>4) {
      return {
        ValidateCard : {
          invalidCard : true,
        }
      };
    }

    

    if(temp.length !== 16 && type !== 'amex'){
      return {
        ValidateCard : {
          invalidLength : true,
        }
      };
    }


    if(temp.length !== 15 && type === 'amex') {
      return {
        ValidateCard : {
          invalidAmexLength : true,
        }
      };
    }

  }

  getCreditCardType() { 

    const creditCardNumber = this.paymentForm.controls.cardNumber.value.replace(/\s+/g, '');
    // start without knowing the credit card type
    var result = "unknown";
  
    // first check for MasterCard
    if (/^5[1-5]/.test(creditCardNumber)) {
      result = "mastercard";
      this.cardType ="mastercard";
    } 
    // then check for Visa
    else if (/^4/.test(creditCardNumber)) {
      result = "visa";
      this.cardType = "visa";
    }
    // then check for AmEx
    else if (/^3[47]/.test(creditCardNumber)) {
      result = "amex";
      this.cardType = "amex";
    } 
    // then check for Diners
    else if (/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(creditCardNumber)) { 
      result = "diners"
      this.cardType = 'diners';
    }
    // then check for Discover
    else if (/6(?:011|5[0-9]{2})[0-9]{12}/.test(creditCardNumber)) {
      result = "discover";
      this.cardType = "discover";
    } 
 
    this.paymentForm.patchValue({
      cardType: result
   });
  }


  submitCard(){
    let cardData  = []
    let temp  = 0;
    this.formValue =  Object.assign(this.paymentForm.value)
    if(localStorage.getItem('CardData')){
      cardData = JSON.parse(localStorage.getItem('CardData'));
      cardData.forEach(item => {
        if(item.cardNumber === this.formValue['cardNumber']) {
          this.dublicateCard = true;
          temp++;
        }
      
      })
      if(temp === 0) {
        this.dublicateCard = false;
             cardData = [this.formValue , ...cardData];
             localStorage.setItem('CardData', JSON.stringify(cardData))
            }
     
    } else {
        cardData.push(this.formValue);
        localStorage.setItem('CardData', JSON.stringify(cardData))
    }
 
  }


  get cardNumber() { return this.paymentForm.get('cardNumber'); }
get expiryMonth() { return this.paymentForm.get('expiryMonth'); }
get expiryYear() { return this.paymentForm.get('expiryYear'); }
get cvvNumber() { return this.paymentForm.get('cvvNumber'); }

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
  this.refreshList.emit({refreshList : true, dublicateCard : this.dublicateCard});
  if (reason === ModalDismissReasons.ESC) {
   return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
   return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }

}


}
