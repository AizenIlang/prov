
export class Doctors {
    private firstName : String;
    private middleName : String;
    private lastName : String;
    private service : String;

    constructor(fn : String, mn : String, ln : String, sv : String){
        this.firstName = fn;
        this.middleName = mn;
        this.lastName = ln;
        this.service = sv;
    }
}