import {MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatTabsModule,
        MatSortModule,
        MatButtonToggleModule,
        MatTableModule,
        MatNativeDateModule
    } from '@angular/material';

    import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule,MatTableModule,MatDatepickerModule,MatNativeDateModule],
    exports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule,MatTableModule,MatDatepickerModule,MatNativeDateModule]
})
export class MaterialModule{

}