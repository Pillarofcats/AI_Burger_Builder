var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//CLASSES
class FormProgress {
    constructor(steps) {
        this.currentInd = 0;
        this.steps = steps;
    }
    createFormProgress() {
        const containerDiv = document.createElement('div');
        containerDiv.id = 'form-progress';
        const animateDiv = document.createElement('div');
        animateDiv.id = 'animate-progress';
        containerDiv.append(animateDiv);
        this.steps.forEach((id, ind) => {
            const h3 = document.createElement('h3');
            h3.id = `${ind}`;
            h3.dataset['name'] = 'progress';
            h3.classList.add(id);
            h3.textContent = id;
            if (ind === 0)
                h3.dataset['current'] = 'true';
            else
                (h3.dataset['current'] = 'false');
            containerDiv.append(h3);
        });
        return containerDiv;
    }
    getTargetProgressIndex(value) {
        return this.steps.indexOf(value);
    }
    set(value) {
        this.currentInd = value;
    }
    forward() {
        this.currentInd += 1;
        if (this.currentInd > this.steps.length - 2)
            this.currentInd = this.steps.length - 1;
        return this.steps[this.currentInd];
    }
    backward() {
        this.currentInd -= 1;
        if (this.currentInd < 0)
            this.currentInd = 0;
        return this.steps[this.currentInd];
    }
    reset() {
        this.currentInd = 0;
        return this.steps[this.currentInd];
    }
}
class Burger {
    constructor(cooked, buns, protein, cheese, veggies, condiments) {
        this.cooked = cooked;
        this.buns = buns;
        this.protein = protein;
        this.cheese = cheese;
        this.veggies = veggies;
        this.sauce = condiments;
    }
    getAIBurgerPrompt() {
        return `A ${this.cooked.join('')} burger with ${this.protein.join(', ')}, ${this.cheese.join(', ')}, ${this.veggies.join(', ')}, ${this.sauce.join(', ')} between two ${this.buns.join('')} buns, all layers of the burger are visible, the burger is on a dinner plate, the burger was created by a professional`;
    }
}
class FieldSetCheckboxes {
    constructor(fieldsetName, checkboxNamesArr, isFirstFieldset = false, isLastFieldset = false) {
        this.fieldsetName = fieldsetName;
        this.checkboxNamesArr = checkboxNamesArr;
        this.isFirstFieldset = isFirstFieldset;
        this.isLastFieldset = isLastFieldset;
    }
    createFieldsetWithCheckboxes() {
        const fieldset = document.createElement('fieldset');
        fieldset.id = this.fieldsetName;
        fieldset.classList.add(`${this.fieldsetName}`);
        if (this.isFirstFieldset)
            fieldset.dataset['current'] = 'true';
        else
            fieldset.dataset['current'] = 'false';
        if (this.isLastFieldset)
            fieldset.name = 'last';
        const legend = document.createElement('legend');
        legend.textContent = `SELECT ${this.fieldsetName.toUpperCase()}`;
        const divCheckboxesContainer = document.createElement('div');
        divCheckboxesContainer.id = 'checkboxes-container';
        const checkboxes = this.checkboxNamesArr.map((value) => {
            const div = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = this.fieldsetName;
            checkbox.id = value;
            checkbox.value = value;
            const label = document.createElement('label');
            label.htmlFor = value;
            label.textContent = `${value.charAt(0).toUpperCase() + value.slice(1)}`;
            div.appendChild(checkbox);
            div.appendChild(label);
            return div;
        });
        fieldset.appendChild(legend);
        checkboxes.forEach((node) => divCheckboxesContainer.appendChild(node));
        fieldset.appendChild(divCheckboxesContainer);
        if (this.isLastFieldset) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'password';
            input.name = 'ai-key';
            input.id = 'ai-key';
            input.placeholder = 'Optional - OpenAI API Key';
            div.appendChild(input);
            fieldset.appendChild(div);
        }
        if (this.isFirstFieldset) {
            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.name = 'next';
            nextBtn.textContent = 'Next';
            fieldset.appendChild(nextBtn);
        }
        else if (this.isLastFieldset) {
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.name = 'back';
            backBtn.textContent = 'Back';
            const submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.name = 'submit';
            submitBtn.textContent = 'Submit';
            fieldset.appendChild(submitBtn);
            const div = document.createElement('div');
            div.appendChild(backBtn);
            div.appendChild(submitBtn);
            fieldset.appendChild(div);
        }
        else {
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.name = 'back';
            backBtn.textContent = 'Back';
            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.name = 'next';
            nextBtn.textContent = 'Next';
            const div = document.createElement('div');
            div.appendChild(backBtn);
            div.appendChild(nextBtn);
            fieldset.appendChild(div);
        }
        return fieldset;
    }
}
//DYNAMIC HTML
//Fieldset - cooked
const cookedFieldset = 'cooked';
const cookedCheckboxes = ['broiled', 'grilled', 'smashed', 'air-fryed', 'sous-vide', 'toasted'];
const fsCooked = new FieldSetCheckboxes(cookedFieldset, cookedCheckboxes, true);
//Fieldset - buns
const bunsFieldset = 'buns';
const bunsCheckboxes = ['sesame', 'pretzel', 'wheat', 'plain', 'brioche'];
const fsBuns = new FieldSetCheckboxes(bunsFieldset, bunsCheckboxes);
//Fieldset - protein
const proteinFieldset = 'protein';
const proteinCheckboxes = ['beef', 'chicken', 'fish', 'pork', 'blackbean', 'lobster', 'bison'];
const fsProtein = new FieldSetCheckboxes(proteinFieldset, proteinCheckboxes);
//Fieldset - cheese
const cheeseFieldset = 'cheese';
const cheeseCheckboxes = ['provolone', 'cheddar', 'pepperjack', 'swiss', 'american'];
const fsCheese = new FieldSetCheckboxes(cheeseFieldset, cheeseCheckboxes);
//Fieldset - veggies
const veggiesFieldset = 'veggies';
const veggiesCheckboxes = ['tomato', 'lettuce', 'onion', 'pickle', 'hot-peppers', 'olives', 'sauerkraut'];
const fsVeggies = new FieldSetCheckboxes(veggiesFieldset, veggiesCheckboxes);
//Fieldset - sauce
const sauceFieldset = 'sauce';
const sauceCheckboxes = ['mayonnaise', 'mustard', 'ketchup', 'relish', 'salt', 'pepper', 'bbq-sauce', 'ranch'];
const fsSauce = new FieldSetCheckboxes(sauceFieldset, sauceCheckboxes, false, true);
//Append fieldset checkboxes to #burger-form
const burgerForm = document.querySelector('#burger-form');
burgerForm.append(fsCooked.createFieldsetWithCheckboxes(), fsBuns.createFieldsetWithCheckboxes(), fsProtein.createFieldsetWithCheckboxes(), fsCheese.createFieldsetWithCheckboxes(), fsVeggies.createFieldsetWithCheckboxes(), fsSauce.createFieldsetWithCheckboxes());
const choiceFieldsetIds = getChoiceFieldsetIds(document.querySelectorAll('fieldset'));
const formProgress = new FormProgress(choiceFieldsetIds);
burgerForm.prepend(formProgress.createFormProgress());
//ELEMENT VARIABLES
const checkboxCooked = document.querySelectorAll('input[type=checkbox][name=cooked');
const checkboxBuns = document.querySelectorAll('input[type=checkbox][name=buns]');
const backBtns = document.querySelectorAll('button[name=back]');
const nextBtns = document.querySelectorAll('button[name=next]');
const aiOutputError = document.querySelector('#error-burger');
const aiOutputBurger = document.querySelector('#ai-burger');
const lastFieldset = document.querySelector('fieldset[name=last]');
const progressElements = document.querySelectorAll('[data-name="progress"]');
const outputCooked = document.querySelector('.output-cooked');
const outputBuns = document.querySelector('.output-buns');
const outputProtein = document.querySelector('.output-protein');
const outputCheese = document.querySelector('.output-cheese');
const outputVeggies = document.querySelector('.output-veggies');
const outputSauce = document.querySelector('.output-sauce');
//FUNCTIONS
function getChoiceFieldsetIds(nodeList) {
    const fieldsetNames = [];
    for (const node of nodeList) {
        fieldsetNames.push(node.id);
    }
    return fieldsetNames;
}
function outputBurger(burger) {
    //Reset
    aiOutputError.textContent = '';
    //Set
    outputCooked.textContent = `COOKED: ${burger.cooked.join(', ')}`;
    outputBuns.textContent = `BUNS: ${burger.buns.join(', ')}`;
    outputProtein.textContent = `PROTEIN: ${burger.protein.join(', ')}`;
    outputCheese.textContent = `CHEESE: ${burger.cheese.join(', ')}`;
    outputVeggies.textContent = `VEGGIES: ${burger.veggies.join(', ')}`;
    outputSauce.textContent = `SAUCE: ${burger.sauce.join(', ')}`;
}
function resetOutputBurger() {
    outputCooked.textContent = "";
    outputBuns.textContent = "";
    outputProtein.textContent = "";
    outputCheese.textContent = "";
    outputVeggies.textContent = "";
    outputSauce.textContent = "";
}
function clearCheckboxNodes(nodeList) {
    nodeList.forEach((node) => {
        node.checked = false;
    });
}
function updateFormProgressByButtons(value) {
    const getCurrentElement = document.querySelectorAll('[data-current="true"]');
    getCurrentElement.forEach((node) => node.dataset['current'] = 'false');
    let newCurrentClass;
    if (value === 'forward')
        newCurrentClass = formProgress.forward();
    else if (value === 'backward')
        newCurrentClass = formProgress.backward();
    else
        newCurrentClass = formProgress.reset();
    const newCurrentElement = document.querySelectorAll(`.${newCurrentClass}`);
    newCurrentElement.forEach((node) => node.dataset['current'] = 'true');
}
function updateFormProgressByClick(e) {
    const getCurrentProgressElements = document.querySelectorAll('[data-current="true"]');
    const thisElement = e.target;
    const newCurrentElements = document.querySelectorAll(`.${thisElement.className}`);
    formProgress.set(Number(thisElement.id));
    getCurrentProgressElements.forEach((node) => node.dataset['current'] = 'false');
    newCurrentElements.forEach((node) => node.dataset['current'] = 'true');
}
function outputAIBurger(text) {
    //Reset
    aiOutputError.textContent = "";
    resetOutputBurger();
    //Set
    aiOutputBurger.src = text;
}
function outputError(text) {
    //Reset
    resetOutputBurger();
    //Set
    aiOutputError.textContent = `Error: ${text}`;
}
function goToFieldset(className) {
    const currentProgressElements = document.querySelectorAll('[data-current="true"]');
    const targetProgressElements = document.querySelectorAll(`.${className}`);
    currentProgressElements.forEach((node) => node.dataset['current'] = 'false');
    targetProgressElements.forEach((node) => node.dataset['current'] = 'true');
    const targetProgressIndex = formProgress.getTargetProgressIndex(className);
    formProgress.set(targetProgressIndex);
}
function formValidation(cooked, buns, protein) {
    if (cooked.length === 0) {
        goToFieldset('cooked');
        outputError(`No cooking method was selected`);
        return true;
    }
    else if (buns.length === 0) {
        goToFieldset('buns');
        outputError(`No bun was selected`);
        return true;
    }
    else if (protein.length === 0) {
        goToFieldset('protein');
        outputError(`No protein was selected`);
        return true;
    }
    return false;
}
function fetchAIBurger(prompt, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'prompt': prompt,
                'n': 1,
                'size': '512x512'
            })
        };
        try {
            const response = yield fetch('https://api.openai.com/v1/images/generations', fetchOptions);
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
//EVENT LISTENERS
function singleCheckboxSelect(checkboxNode, checkboxNodeList) {
    checkboxNode.addEventListener('change', (e) => {
        const element = e.target;
        if (element.checked) {
            clearCheckboxNodes(checkboxNodeList);
            element.checked = true;
        }
        else {
            clearCheckboxNodes(checkboxNodeList);
            element.checked = false;
        }
    });
}
checkboxCooked.forEach((node) => {
    singleCheckboxSelect(node, checkboxCooked);
});
checkboxBuns.forEach((node) => {
    singleCheckboxSelect(node, checkboxBuns);
});
function submitBurgerForm(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const burgerFormData = new FormData(burgerForm);
        const cooked = burgerFormData.getAll(cookedFieldset);
        const buns = burgerFormData.getAll(bunsFieldset);
        const protein = burgerFormData.getAll(proteinFieldset);
        const cheese = burgerFormData.getAll(cheeseFieldset);
        const veggies = burgerFormData.getAll(veggiesFieldset);
        const sauce = burgerFormData.getAll(sauceFieldset);
        const errors = formValidation(cooked, buns, protein);
        if (errors)
            return;
        const aIBurger = new Burger(cooked, buns, protein, cheese, veggies, sauce);
        const aIKey = burgerFormData.get('ai-key');
        lastFieldset.disabled = true;
        progressElements.forEach((node) => node.style.setProperty('pointer-events', 'none'));
        if (aIKey) {
            const aIPrompt = aIBurger.getAIBurgerPrompt();
            try {
                const aIImage = yield fetchAIBurger(aIPrompt, aIKey);
                if (aIImage.error) {
                    outputError(aIImage.error.code);
                    lastFieldset.disabled = false;
                    return;
                }
                else if (aIImage.data)
                    outputAIBurger(aIImage.data[0].url);
                else
                    outputBurger(aIBurger);
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            outputBurger(aIBurger);
        }
        console.log('Submitting...');
        setTimeout(() => {
            console.log('burger complete', aIBurger);
            progressElements.forEach((node) => node.style.setProperty('pointer-events', 'auto'));
            lastFieldset.disabled = false;
            burgerForm.reset();
            updateFormProgressByButtons('reset');
        }, 3000);
    });
}
burgerForm.addEventListener('submit', submitBurgerForm);
nextBtns.forEach((node) => node.addEventListener('click', () => {
    updateFormProgressByButtons('forward');
}));
backBtns.forEach((node) => node.addEventListener('click', () => {
    updateFormProgressByButtons('backward');
}));
progressElements.forEach((node) => {
    node.addEventListener('click', updateFormProgressByClick);
});
export {};
