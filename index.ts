#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const apiLink = "https://opentdb.com/api.php?amount=11&category=18&difficulty=easy&type=multiple";
let fetchData=async(data:string) =>{
    let fetchQuiz:any = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
}

let data = await fetchData(apiLink);

let StartQuiz = async () => {
    let score:number = 0;
    let name = await inquirer.prompt({
        type:"input",
        name:"firstname",
        message:"Enter Your Name : "
    });

    for(let i:number = 1;i<=10;i++){
        let answers =  [...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message:data[i].question,
            choices:answers.map((val:any)=>val)
        })

        if(ans.quiz == data[i].correct_answer){
            ++score;
            console.log(chalk.bold.green("Correct answer."));
        }else{
            console.log(chalk.bold.red(`Correct answer is ${data[i].correct_answer}`));
        }
    }

    console.log(chalk.bold.blue(`Dear ${chalk.bold.green(name.firstname)}, Your score is ${chalk.bold.red(score)} from ${chalk.bold.red(10)}.`))
}

StartQuiz();
