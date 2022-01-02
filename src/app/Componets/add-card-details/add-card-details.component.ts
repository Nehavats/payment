import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  paymentForm: any;
 
  @ViewChild('content', { static: true }) contentData: ElementRef;
  @ViewChild('ccNumber',  { static: false }) ccNumberField: ElementRef;

  @Input() openPopup =  '';
  @Output() refreshList = new EventEmitter();

  monthData = months;
  yearData = years;
  data: any;
  formValue: any;
  closeResult: string;
  

  constructor( private fb: FormBuilder, private modalService: NgbModal,) {}
  



  ngOnChanges(){
    if(this.openPopup) {
    this.open(this.contentData);
    console.log();
    }
  }


  ngOnInit(){
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]],
      cvvNumber : ['', Validators.required,],
      expiryMonth : ['', Validators.required],
      expiryYear: ['', Validators.required],
      cardType : ['unknown']
    })
  }
  ngAfterViewInit() {
   
  }




   /* Insert spaces to enhance legibility of credit card numbers */
   creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { cardNumber } = this.paymentForm.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

     /* Handle American Express 4-6-5 spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37') 
                       ? [4,6,5] 
                       : [4,4,4,4];

    const numbers = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    cardNumber.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }



  getCreditCardType() { 

    const creditCardNumber = this.paymentForm.controls.cardNumber.value.replace(/\s+/g, '');
    // start without knowing the credit card type
    var result = "unknown";
  
    // first check for MasterCard
    if (/^5[1-5]/.test(creditCardNumber)) {
      result = "mastercard";
    } 
    // then check for Visa
    else if (/^4/.test(creditCardNumber)) {
      result = "visa";
    }
    // then check for AmEx
    else if (/^3[47]/.test(creditCardNumber)) {
      result = "amex";
    } 
    // then check for Diners
    else if (/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(creditCardNumber)) { 
      result = "diners"
    }
    // then check for Discover
    else if (/6(?:011|5[0-9]{2})[0-9]{12}/.test(creditCardNumber)) {
      result = "discover";
    } 
 
    this.paymentForm.patchValue({
      cardType: result
   });
   this.getMaskType(result);
    return console.log(result);
  }


  getMaskType(cardType){
    var masks = {
      'mastercard': '9999 9999 9999 9999',
      'visa': '9999 9999 9999 9999',
      'amex': '9999 999999 99999',
      'diners': '9999 9999 9999 99',
      'discover': '9999 9999 9999 9999',
      'unknown': '9999 9999 9999 9999'
    };
    //return masks[cardType];,
    const { cardNumber } = this.paymentForm.controls;
    cardNumber.setValue(masks[cardType]);
  }



  submitCard(){
    let cardData  = []
  this.formValue =  Object.assign(this.paymentForm.value)
    if(localStorage.getItem('CardData')){
      cardData = JSON.parse(localStorage.getItem('CardData'));
      cardData = [this.formValue , ...cardData]
    localStorage.setItem('CardData', JSON.stringify(cardData))
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

  if (reason === ModalDismissReasons.ESC) {
    //this.refreshList.emit("true");
   // return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //this.refreshList.emit("true");
   // return 'by clicking on a backdrop';
  } else {
    this.refreshList.emit("true");
    return `with: ${reason}`;
  }

}


}