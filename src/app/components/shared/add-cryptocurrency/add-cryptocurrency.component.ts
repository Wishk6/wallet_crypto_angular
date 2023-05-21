import {Component,EventEmitter,OnInit,Output} from '@angular/core';
import {availableCrypto} from './data';
import {WalletService} from "../../../services/wallet.service";
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";
import {AsyncPipe,NgForOf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {GenericActionButtonComponent} from "../Generics/generic-action-button/generic-action-button.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {map,startWith} from "rxjs";

@Component({
  selector: 'app-add-cryptocurrency',
  templateUrl: './add-cryptocurrency.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    GenericActionButtonComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe],
  styleUrls: ['./add-cryptocurrency.component.scss']
})
export class AddCryptocurrencyComponent implements OnInit {
  options: string[] = [];
  cryptoFormControl: FormGroup = new FormGroup({
    cryptocurrency_amount: new FormControl(0),
    investment_amount: new FormControl<number>(0),
    unitPrice: new FormControl<number>(0)
  });

  nameFormControl: FormControl = new FormControl('',[Validators.required]);

  constructor(private walletService: WalletService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.options = availableCrypto;
    console.log(this.options.length);
  }

  filteredOptions = this.nameFormControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addCrypto() {
    const cryptoData = {
      cryptocurrency_amount: this.cryptoFormControl.get('cryptocurrency_amount')?.value,
      investment_amount: this.cryptoFormControl.get('investment_amount')?.value,
      isFavorite: false,
      unitPrice: this.cryptoFormControl.get('unitPrice')?.value,
      name: this.nameFormControl.value
    }

    this.walletService.createWallet(cryptoData).subscribe(
      {
        next: (data) => {
          this.toastr.success('Crypto added successfully');
        },
        error: (error) => {
          this.toastr.error('Error while trying to add crypto, ' + error.error.message);
        }
      })
  }

}
