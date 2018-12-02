
export class Hospital {

  HospitalID : number;
  Name : String;
  Location : String;
  Address : String;
  ContactNumber : String;
  Email : String;
  Coordinates : String;
  Details : String;
  Services : String;
  Rating : number;
  image : String;
  Key : String;
    constructor(hospitalId? : number,name? : String, location? : String, address? : String, contact? : String,
      email? : String, coordinates? : String, details? : String, services? : String, rating? : number, image? : String,
      key? : String ){
      
        this.HospitalID = hospitalId;
        this.Name = name;
        this.Location = location;
        this.Address = address;
        this.ContactNumber = contact;
        this.Email = email;
        this.Coordinates = coordinates;;
        this.Details = details;
        this.Services = services;
        this.Rating = rating;
        this.image = image;
        this.Key = key;

    }
  
  
  }