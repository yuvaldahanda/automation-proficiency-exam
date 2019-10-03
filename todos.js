
let seleniumInf = require("./seleniumInfra")

class todoPage {

    constructor(URL) {
        this.seleniumInfra = new seleniumInf()
        this.seleniumInfra.getURL(URL)
    }

    async insertAndDelete(todoText) {

        await this.seleniumInfra.write(todoText, "id", "todo-input")
        await this.seleniumInfra.clickElement("id", "addToDo")
        if (await this.seleniumInfra.isElementExists("className", "todo")) {
            console.log("found a new div")
            let newDivCreate = await this.seleniumInfra.findElementBy("className", "todo")
            let textFromSpan = await this.seleniumInfra.getTextFromElement("tagName", "span", null, newDivCreate)
            if (todoText == textFromSpan) {
                console.log("New div has the same text")
            }
            else {
                console.log("Error: New div does not has the same text ")
            }

        }
        else {
            console.log("cant find a new div")
        }
        await this.seleniumInfra.clickElement("className", "fas fa-trash")
        if (!await this.seleniumInfra.findElementBy("className", "todo")) {
            console.log("The div was deleted")
        }
        else {
            console.log("The div was not deleted")
        }

    }

    async insertAndComplete(todoText) {
        await this.seleniumInfra.write(todoText, "id", "todo-input")
        await this.seleniumInfra.clickElement("id", "addToDo")
        if (await this.seleniumInfra.isElementExists("className", "todo")) {
            console.log("found a new div")
            await this.seleniumInfra.clickElement("className", "fas fa-check-circle")
            let isCheckExist = await this.seleniumInfra.isElementExists("className", "todo complete")
            if (isCheckExist) {
                console.log("the new div was checked”")
            }
            else {
                console.log("new div was NOT checked")
            }


        }
        else {
            console.log("cant find a new div")
        }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {

        await this.seleniumInfra.write(todoText1, "id", "todo-input")
        await this.seleniumInfra.clickElement("id", "addToDo")
        if (await this.seleniumInfra.isElementExists("className", "todo")) {
            console.log("found a new div")
            await this.seleniumInfra.write(todoText2, "id", "todo-input")
            await this.seleniumInfra.clickElement("id", "addToDo")
            let arrayOfDiv = await this.seleniumInfra.findElementListBy("className", "todo")
            for (let ob of arrayOfDiv)//this is check if there a new div with same text the first round he will say there is no div because this i check if there is a new div with same text!
            {
                let textFromNewDiv = await this.seleniumInfra.getTextFromElement("tagName", "span", null, ob)//also i can check if the array is bigger then 1
                if (textFromNewDiv == todoText2) {
                    console.log("found a new div")
                }
                else {
                    console.log("Error: Can’t find a new div")
                }
            }
            // if(arrayOfDiv.length>1)// here i can check if the array is bigger then two so there is more then 1 div its says that div have been created
            // {
            //     console.log("found a new div")
            // }
            // else{
            //     console.log("Error: Can’t find a new div")
            // }
            arrayOfDiv = await this.seleniumInfra.clickElement("className", "fas fa-trash")
            for(let index in arrayOfDiv)
            {
               if(index == 0 )
               {
                   await this.seleniumInfra.clickElement(null,null,arrayOfDiv[index],null)
               }

            }
            
             arrayOfDiv = await this.seleniumInfra.findElementListBy("className", "todo")
            for (let ob of arrayOfDiv)//this is check if there a new div with same text the first round he will say there is no div because this i check if there is a new div with same text!
            {
                let textFromNewDiv = await this.seleniumInfra.getTextFromElement("tagName", "span", null, ob)//also i can check if the array is bigger then 1
                if (textFromNewDiv != todoText1) {
                    console.log("the first div was deleted")
                }
                else {
                    console.log("Error: the first div was NOT deleted” accordingly")
                }
            }
                   // if(arrayOfDiv.length>1)// here i can check if the array is bigger then two so there is more then 1 div its says that div have been created
            // {
            //     console.log("found a new div")
            // }
            // else{
            //     console.log("Error: Can’t find a new div")
            // }
            
            

        }
        else {
            console.log("cant find a new div")
        }

    }


}








let a = new todoPage("https://elevation-local-todo.herokuapp.com")
a.insertTwoDeleteFirst("blala", "bubu")