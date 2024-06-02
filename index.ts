import inquirer from "inquirer"

//Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance : number;
    withdraw(amount :number): void
    deposite(amount :number): void
     checkBalance() : void
}

//Bank Account class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber : number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance
    }

    //Debit Money
withdraw(amount: number): void {
 if(this.balance >= amount){
    this.balance -= amount
    console.log(`Withdrawl of ${amount} sucessful Remaining balance: $${this.balance}`);
 } else {
    console.log("Insufficient balance.");
 }
}
//Credit money
deposite(amount: number): void {
    if (amount > 100){
        amount -= 1; //$1 fee charge is more $100 is dfeposite
    } this.balance += amount;
    console.log(`Deposite of $${amount} sucessful Remaining balance: $${this.balance}`);
}

//check Balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);    
}
}

//Customer class
class customer {
    firstName:string;
    lastName:string;
    Gender:string;
    Age:number;
    MobileNumber:number;
    account:BankAccount;

    constructor(  firstName:string, lastName:string,Gender:string,Age:number,MobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.Gender = Gender
        this.Age = Age
        this.MobileNumber = MobileNumber
        this.account = account
    }
}


//Create bank accounts

const accounts : BankAccount[] = [
    new BankAccount(16890,400),
    new BankAccount(16899,800), 
    new BankAccount(16897,1000)
];


//Create customers
const customers: customer[]=[
    new customer("Hamza", "Khan" , "Male" , 30 , 3167894567,accounts[0]),
     new customer("Rahila", "Nadeem" , "Female" ,45 , 31767894567,accounts[1]),
     new customer("Armeen", "Nadeem" , "Female" , 19 , 3167894560,accounts[2])

]

//Function to interact with bank account

async function service(){
   do{
    const accountNumberInput = await inquirer.prompt({
       name:"accountNumber",
       type: "number",
       message: "Enter your account number"
    })

    const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
    if(customer){
        console.log(`Welcome,${customer.firstName} ${customer.lastName}\n`);
        const ans = await inquirer.prompt({
            name:"select",
            type:"list",
            message:"Select an operation",
            choices:["Desposite","Withdraw","Check balance","Exit"]
        });
        switch(ans.select){
            case "Desposit" :
            const depositamoumt =await inquirer.prompt([{
                name:"amount",
                type:"number",
                message:"Enter the amount to deposit:"
            }])
            customer.account.deposite(depositamoumt.amount);
            break;
            case "Withdraw" :
                const WithdrawAmount =await inquirer.prompt([{
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to Withdraw:"
                }])
                customer.account.deposite(WithdrawAmount.amount);
                break;
                case "Check balance" :
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bamk program...");
                    console.log("\n Thank you for using our bank services.Have a great Day!");
                    return;
                    
        }
    }else{
        console.log("Invalid account number.Please try agin");
    }
   }while(true)
}
service()