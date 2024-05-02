import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  filterOnlyNumbers(event: KeyboardEvent | ClipboardEvent) {
    if (event instanceof ClipboardEvent) {
      const clipboardData = event.clipboardData;
      if (clipboardData) {
        const pastedText = clipboardData.getData('text/plain');
        if (!pastedText.match(/^\d+$/)) {
          event.preventDefault();
        }
      }
    } else {
      const key = event.key;
      const regex = /^[0-9]*$/;
      if (key !== '+' && !regex.test(key)) {
        event.preventDefault();
      }
    }
  }
  
}

