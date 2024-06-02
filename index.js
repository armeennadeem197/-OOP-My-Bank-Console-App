import inquirer from "inquirer";
//Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawl of ${amount} sucessful Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //Credit money
    deposite(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charge is more $100 is dfeposite
        }
        this.balance += amount;
        console.log(`Deposite of $${amount} sucessful Remaining balance: $${this.balance}`);
    }
    //check Balance
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//Customer class
class customer {
    firstName;
    lastName;
    Gender;
    Age;
    MobileNumber;
    account;
    constructor(firstName, lastName, Gender, Age, MobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.account = account;
    }
}
//Create bank accounts
const accounts = [
    new BankAccount(16890, 400),
    new BankAccount(16899, 800),
    new BankAccount(16897, 1000)
];
//Create customers
const customers = [
    new customer("Hamza", "Khan", "Male", 30, 3167894567, accounts[0]),
    new customer("Rahila", "Nadeem", "Female", 45, 31767894567, accounts[1]),
    new customer("Armeen", "Nadeem", "Female", 19, 3167894560, accounts[2])
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome,${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Desposite", "Withdraw", "Check balance", "Exit"]
            });
            switch (ans.select) {
                case "Desposit":
                    const depositamoumt = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }]);
                    customer.account.deposite(depositamoumt.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to Withdraw:"
                        }]);
                    customer.account.deposite(WithdrawAmount.amount);
                    break;
                case "Check balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bamk program...");
                    console.log("\n Thank you for using our bank services.Have a great Day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try agin");
        }
    } while (true);
}
service();
