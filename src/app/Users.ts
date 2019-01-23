



export class Users {

    actived : boolean;
    admin : boolean;
    email : String;
    hospitalMember : boolean;
    hospitalKey : String;
    firstName : String;
    middleName : String;
    lastName : String;
    bloodType : String;
    date : String;
    password : String;
    userName : String;
    userKey : String;
    address : String;
    gender : String;
    created : String;
    hospitalName : String;

    constructor(act: boolean, adm : boolean, ema : String, hospitalMember : boolean, hospitalKey : String, fn : String, mn : String, ln : String, bt : String, dt : String, pw : String, un : String, uk : String, add : String, gen : String,create : String, hospitalName : String){
            this.actived = act;
            this.admin = adm;
            this.email = ema;
            this.hospitalKey = hospitalKey;
            this.hospitalMember = hospitalMember;
            this.firstName = fn;
            this.middleName = mn;
            this.lastName = ln;
            this.bloodType = bt;
            this.date = dt;
            this.password = pw;
            this.userName = un;
            this.userKey = uk;
            this.address = add;
            this.gender = gen;
            this.created = create;
            this.hospitalName = hospitalName;
            
    }
    
}