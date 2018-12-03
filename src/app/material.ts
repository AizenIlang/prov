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
        MatTableModule
    } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule,MatTableModule],
    exports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule,MatTableModule]
})
export class MaterialModule{

}