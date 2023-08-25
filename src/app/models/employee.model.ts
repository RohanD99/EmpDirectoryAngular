export class Employee {
  id: number;
  firstname: string;
  lastname: string;
  designation: string;
  department: string;
  mobile: string;
  mailId: string;
  location: string;
  skypeId: string;
  preferredName: string; 

  constructor(
    args: any
  ) {
    args = !!args ? args : {};
    this.id = args.id;
    this.firstname = args.firstname;
    this.lastname = args.lastname;
    this.designation = args.designation;
    this.department = args.department;
    this.mobile = args.mobile;
    this.mailId = args.mailId;
    this.location = args.location;
    this.skypeId = args.skypeId;
    this.preferredName = `${args.firstname} ${args.lastname}`; 
  }
}

export class EmployeeSelectedFilter {
  jobtitle: string[] = [];
  departments: string[] = [];
  offices: string[] = [];
}