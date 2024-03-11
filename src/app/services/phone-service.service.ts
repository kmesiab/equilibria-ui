import { Injectable } from '@angular/core';
import { phone } from 'phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  onlyNumbersRegex = /[^\d]/g;

  constructor() { }

  public normalizePhoneNumber(phoneNumber: string): string {

    // strip everything except the numbers
    let strippedPhoneNumber = phoneNumber.replace(this.onlyNumbersRegex, '').trim();

    if (strippedPhoneNumber.length === 0) {
      return '';
    }

    let phoneResult = phone(strippedPhoneNumber);

    if (!phoneResult.isValid) {
      return "";
    }

    return phoneResult.phoneNumber;
  }

}
