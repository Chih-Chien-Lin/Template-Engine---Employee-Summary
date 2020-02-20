class Employee {
    constructor(name, id, email) {
        this.name = name,
        this.id = id,
        this.email = email
    }
    getName() {
        if (this.name !== "") {
            return this.name;
        } else {
            console.log("You should type a name");
        }
    };
    getId() {
        if (this.id !== "") {
            return this.id;
        } else {
            console.log("you should type an id")
        }
    };
    getEmail() {
        if (checkEmail(this.email) === true) {
            return this.email;
        }else{
            console.log("this is not an email")
        }
    };
    getRole() {
        if(this.name !== "" && this.id !== "" && this.email !==""){
            return "Employee"
        }
    };
}


function checkEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
        return (true)
    }
    return (false)
}
const name = "Alice";
const testValue = 100;
const testEmail = "test@test.com";
const e = new Employee(name,testValue,testEmail);
console.log(e);
console.log(e.getName());
console.log(e.getId());
console.log(e.getRole());