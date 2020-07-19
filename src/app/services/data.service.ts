import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any
  ) {}
  saveInformations(
    name: string,
    address: string,
    company: string,
    message: string
  ) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(`contactusInfo`)
        .add({
          name,
          address,
          company,
          message,
        })
        .then(() =>
          resolve(
            this.snackBar.open(
              'Thank you for Contacting us. We will contact you shortly.',
              null,
              this.dataSnackBar.duration
            )
          )
        )
        .catch(() =>
          reject(
            this.snackBar.open(
              'Oops! there is some issue, Please try again.',
              null,
              this.dataSnackBar.duration
            )
          )
        );
    });
  }

  sendEmail(name: string, address: string) {}
}
