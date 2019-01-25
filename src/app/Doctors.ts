
export class Doctors {
    private firstName : String;
    private middleName : String;
    private lastName : String;
    private service : String;
    private key : String;

    constructor(fn : String, mn : String, ln : String, sv : String, theKey : String){
        this.firstName = fn;
        this.middleName = mn;
        this.lastName = ln;
        this.service = sv;
        this.key = theKey;
    }
}