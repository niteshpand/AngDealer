import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.css'],
})
export class DealerFormComponent implements OnInit {
  @Input() dealer: any;
  @Output() close = new EventEmitter<{ refresh: boolean; dealer?: any }>();
  dealerForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dealerForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      telephone_no: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      whatsapp_no: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      bank_id: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      gst_type: ['', Validators.required],
      gstin: ['', Validators.required],
      pan_no: ['', Validators.required],
      apply_tds: [true],
      credit_limit: [0, Validators.required],
      opening_balance: [0, Validators.required],
      opening_balance_type: ['', Validators.required],
      supplier_type: ['', Validators.required],
      login_access: [true],
      is_active: [true],
    });
  }

  ngOnInit(): void {
    if (this.dealer) {
      this.isEditMode = true;
      this.dealerForm.patchValue(this.dealer);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dealer'] && changes['dealer'].currentValue) {
      this.isEditMode = true;
      this.dealerForm.patchValue(changes['dealer'].currentValue);
    } else {
      this.isEditMode = false;
      this.dealerForm.reset({
        name: '',
        company_name: '',
        mobile_no: '',
        telephone_no: '',
        whatsapp_no: '',
        email: '',
        remark: '',
        date_of_birth: '',
        anniversary_date: '',
        gst_type: '',
        gstin: '',
        pan_no: '',
        apply_tds: false,
        credit_limit: 0,
        opening_balance: 0,
        opening_balance_type: '',
        login_access: true,
        is_active: true,
      });
    }
  }

  onSubmit(): void {
    if (this.dealerForm) {
      if (this.isEditMode) {
        this.dataService
          .updateDealer(this.dealer['id'], this.dealerForm.value)
          .subscribe((updateDealer) => {
            this.close.emit({ refresh: true, dealer: updateDealer });
          });
      } else {
        this.dataService
          .addDealer(this.dealerForm.value)
          .subscribe((newDealer) => {
            this.close.emit({ refresh: true, dealer: newDealer });
          });
      }
    }
  }

  onCancel(): void {
    this.close.emit({ refresh: false });
    document.getElementById('dealerModal')!.style.display = 'none';
  }
}
