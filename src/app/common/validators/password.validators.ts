import { ValidationErrors, AbstractControl,FormGroup, FormControl } from '@angular/forms';


export class PasswordValidators{
    static passwordMatch(control : AbstractControl) : ValidationErrors | null {
        if(control && (control.value !== null || control.value !== undefined)){
            const cnfpassvalue = control.value;
            

            const passControl = control.root.get('passwordControl');
            if(passControl){
                const passvalue = passControl.value;
                if(passvalue !== cnfpassvalue){
                    return {
                        isError : true
                    }
                }
            }

        }
           
     
        return null;
    }
}