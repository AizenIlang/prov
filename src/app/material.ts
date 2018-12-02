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
    } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule],
    exports:[MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatIconModule,MatCardModule,MatDialogModule,MatOptionModule,MatSelectModule,MatTabsModule,MatSortModule,MatButtonToggleModule]
})
export class MaterialModule{

}