import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeService } from '../services/employee.service';
import { PositionService } from '../services/position.service';
import { EmployeeRoutingModule } from './employee-routing.module';
// import { DecimalPipe } from '@angular/common';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
// יבוא קומפוננטות ודיווחים של Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@NgModule({
  declarations: [
    EditEmployeeComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
  
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // ייבוא של כל מודולי Angular Material שנדרשים
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,

    EmployeeRoutingModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    
  ],
  providers: [
    EmployeeService,
    PositionService
    
  ],
  exports: [
    // EditEmployeeComponent,
    // AddEmployeeComponent
    EmployeeDetailsComponent,
  ]
})
export class EmployeeModule { }
