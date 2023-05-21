import {Component,EventEmitter,Output} from '@angular/core';
import {availableCrypto} from './data';
import {WalletService} from "../../../services/wallet.service";
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {GenericActionButtonComponent} from "../Generics/generic-action-button/generic-action-button.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@Component({
  selector: 'app-add-cryptocurrency-component',
  templateUrl: './add-cryptocurrency-component.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    GenericActionButtonComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  styleUrls: ['./add-cryptocurrency-component.component.scss']
})
export class AddCryptocurrencyComponentComponent {
  cryptoList: string[] = [];
  // créer un objet crypto qui contient le fichier data.ts
  cryptoFormControl: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    cryptocurrency_amount: new FormControl(0),
    investment_amount: new FormControl<number>(0),
    unitPrice: new FormControl<number>(0)
  });

  @Output() cryptoAddedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private walletService: WalletService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.cryptoList= availableCrypto;
  }

  searchCryptoList() {

  }

  addCrypto() {
    let cryptoData = this.cryptoFormControl.value;

    this.walletService.createWallet(cryptoData).subscribe(
      {
        next: (data) => {
          this.cryptoAddedEvent.emit();
        },
        error: (error) => {
    this.toastr.error('Error while trying to add crypto, ' + error.error.message);
        }
      })
  }

}