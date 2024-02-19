const { mainPrompt, actionHandlers } = require('./lib/actionHandlers')

//The main function is where the program executes
async function main() {
    console.log('\x1b[33m%s\x1b[0m', `
    WELCOME TO EMPLOYEE TRACKER
    `);
    while (true) {
        try {
            //The main menu is displayed to the user with a list of actions
            answer = await mainPrompt();

            //actionhandler is assigned the corresponding function to the action chosen by the user and it is executed
            const actionHandler = actionHandlers[answer.action];
            await actionHandler();

            //A delay is set after the execution of the action handler so the main menu isnt instantly executed again
            await delay(1000);
        } catch (error) {
            console.log(error);
        }
    }
}

//Delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


main();




