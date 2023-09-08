//TYPES
type TCooked = string[]
type TBuns = string[]
type TProtein = string[]
type TCheese = string[]
type TVeggies = string[]
type TSauce = string[]

//CLASSES
class FormProgress {
  private steps
  public currentInd = 0

  constructor(steps:string[]) {
    this.steps = steps
  }

  createFormProgress() {

    const containerDiv = document.createElement('div')
    containerDiv.id = 'form-progress'

    const animateDiv = document.createElement('div')
    animateDiv.id = 'animate-progress'

    containerDiv.append(animateDiv)

    this.steps.forEach((id, ind) => {
      const h3 = document.createElement('h3')
      h3.id = `${ind}`
      h3.dataset['name'] = 'progress'
      h3.classList.add(id)
      h3.textContent = id

      if(ind === 0) h3.dataset['current'] = 'true'
      else(h3.dataset['current'] = 'false')
    
      containerDiv.append(h3)
    })

    return containerDiv
  }
  
  getTargetProgressIndex(value:string) {
    return this.steps.indexOf(value)
  }

  set(value: number) {
    this.currentInd = value
  }

  forward() {
    this.currentInd += 1
    if(this.currentInd > this.steps.length-2) this.currentInd = this.steps.length-1
    return this.steps[this.currentInd]
  }

  backward() {
    this.currentInd -= 1
    if(this.currentInd < 0) this.currentInd = 0
    return this.steps[this.currentInd]
  }

  reset() {
    this.currentInd = 0
    return this.steps[this.currentInd]
  }
}

class Burger {

  public cooked
  public buns
  public protein
  public cheese
  public veggies
  public sauce

  constructor(cooked:TCooked, buns:TBuns, protein:TProtein, cheese:TCheese, veggies:TVeggies, condiments:TSauce) {
    this.cooked = cooked
    this.buns = buns
    this.protein = protein
    this.cheese = cheese
    this.veggies = veggies
    this.sauce = condiments
  }

  getAIBurgerPrompt() {
    return `A ${this.cooked.join('')} burger with ${this.protein.join(', ')}, ${this.cheese.join(', ')}, ${this.veggies.join(', ')}, ${this.sauce.join(', ')} between two ${this.buns.join('')} buns, all layers of the burger are visible, the burger is on a dinner plate, the burger was created by a professional`
  }
}

class FieldSetCheckboxes {

  private fieldsetName
  private checkboxNamesArr
  private isFirstFieldset
  private isLastFieldset

  constructor(fieldsetName: string, checkboxNamesArr: string[], isFirstFieldset:boolean = false, isLastFieldset:boolean = false) {
    this.fieldsetName = fieldsetName
    this.checkboxNamesArr = checkboxNamesArr
    this.isFirstFieldset = isFirstFieldset
    this.isLastFieldset = isLastFieldset
  }
  
  createFieldsetWithCheckboxes() {
    const fieldset = document.createElement('fieldset')
    fieldset.id = this.fieldsetName
    fieldset.classList.add(`${this.fieldsetName}`)

    if(this.isFirstFieldset) fieldset.dataset['current'] = 'true'
    else fieldset.dataset['current'] = 'false'

    if(this.isLastFieldset) fieldset.name = 'last'

    const legend = document.createElement('legend')
    legend.textContent = `SELECT ${this.fieldsetName.toUpperCase()}`

    const divCheckboxesContainer = document.createElement('div')
    divCheckboxesContainer.id = 'checkboxes-container'

    const checkboxes = this.checkboxNamesArr.map((value) => {
      const div = document.createElement('div')

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.name = this.fieldsetName
      checkbox.id = value
      checkbox.value = value

      const label = document.createElement('label')
      label.htmlFor = value
      label.textContent = `${value.charAt(0).toUpperCase() + value.slice(1)}`

      div.appendChild(checkbox)
      div.appendChild(label)

      return div
    })

    fieldset.appendChild(legend)
    
    checkboxes.forEach((node) => divCheckboxesContainer.appendChild(node))
    
    fieldset.appendChild(divCheckboxesContainer)

    if(this.isLastFieldset) {
      const div = document.createElement('div')

      const input = document.createElement('input')
      input.type = 'password'
      input.name = 'ai-key'
      input.id = 'ai-key'
      input.placeholder = 'Optional - OpenAI API Key'

      div.appendChild(input)
      fieldset.appendChild(div)
    }

    if (this.isFirstFieldset) {
        const nextBtn = document.createElement('button')
        nextBtn.type = 'button'
        nextBtn.name = 'next'
        nextBtn.textContent = 'Next'
        fieldset.appendChild(nextBtn)
      } 
      else if(this.isLastFieldset) {
        const backBtn = document.createElement('button')
        backBtn.type = 'button'
        backBtn.name = 'back'
        backBtn.textContent = 'Back'

        const submitBtn = document.createElement('button')
        submitBtn.type = 'submit'
        submitBtn.name = 'submit'
        submitBtn.textContent = 'Submit'
        fieldset.appendChild(submitBtn)

        const div = document.createElement('div')
        div.appendChild(backBtn)
        div.appendChild(submitBtn)
        fieldset.appendChild(div)
      } 
      else {
        const backBtn = document.createElement('button')
        backBtn.type = 'button'
        backBtn.name = 'back'
        backBtn.textContent = 'Back'

        const nextBtn = document.createElement('button')
        nextBtn.type = 'button'
        nextBtn.name = 'next'
        nextBtn.textContent = 'Next'

        const div = document.createElement('div')
        div.appendChild(backBtn)
        div.appendChild(nextBtn)
        fieldset.appendChild(div)
      }

    return fieldset
  }
}

//DYNAMIC HTML
//Fieldset - cooked
const cookedFieldset = 'cooked'
const cookedCheckboxes = ['broiled', 'grilled', 'smashed', 'air-fryed', 'sous-vide', 'toasted']
const fsCooked = new FieldSetCheckboxes(cookedFieldset, cookedCheckboxes, true)
//Fieldset - buns
const bunsFieldset = 'buns'
const bunsCheckboxes = ['sesame', 'pretzel', 'wheat', 'plain', 'brioche']
const fsBuns = new FieldSetCheckboxes(bunsFieldset, bunsCheckboxes)
//Fieldset - protein
const proteinFieldset = 'protein'
const proteinCheckboxes = ['beef', 'chicken', 'fish', 'pork', 'blackbean', 'lobster', 'bison']
const fsProtein = new FieldSetCheckboxes(proteinFieldset, proteinCheckboxes)
//Fieldset - cheese
const cheeseFieldset = 'cheese'
const cheeseCheckboxes = ['provolone', 'cheddar', 'pepperjack', 'swiss', 'american']
const fsCheese = new FieldSetCheckboxes(cheeseFieldset, cheeseCheckboxes)
//Fieldset - veggies
const veggiesFieldset = 'veggies'
const veggiesCheckboxes = ['tomato', 'lettuce', 'onion', 'pickle', 'hot-peppers', 'olives', 'sauerkraut']
const fsVeggies = new FieldSetCheckboxes(veggiesFieldset, veggiesCheckboxes)
//Fieldset - sauce
const sauceFieldset = 'sauce'
const sauceCheckboxes = ['mayonnaise', 'mustard', 'ketchup', 'relish', 'bbq-sauce', 'ranch']
const fsSauce = new FieldSetCheckboxes(sauceFieldset, sauceCheckboxes, false, true)

//Append fieldset checkboxes to #burger-form
const burgerForm = document.querySelector('#burger-form') as HTMLFormElement
burgerForm.append(
  fsCooked.createFieldsetWithCheckboxes(),
  fsBuns.createFieldsetWithCheckboxes(),
  fsProtein.createFieldsetWithCheckboxes(),
  fsCheese.createFieldsetWithCheckboxes(),
  fsVeggies.createFieldsetWithCheckboxes(),
  fsSauce.createFieldsetWithCheckboxes()
)

const choiceFieldsetIds = getChoiceFieldsetIds(document.querySelectorAll('fieldset'))
const formProgress = new FormProgress(choiceFieldsetIds)
burgerForm.prepend(formProgress.createFormProgress())

//ELEMENT VARIABLES
const checkboxCooked = document.querySelectorAll('input[type=checkbox][name=cooked') as NodeListOf<HTMLInputElement>
const checkboxBuns = document.querySelectorAll('input[type=checkbox][name=buns]') as NodeListOf<HTMLInputElement>
const backBtns = document.querySelectorAll('button[name=back]') as NodeListOf<HTMLButtonElement>
const nextBtns = document.querySelectorAll('button[name=next]') as NodeListOf<HTMLButtonElement>
const aiOutputError = document.querySelector('#error-burger') as HTMLParagraphElement
const aiOutputBurger = document.querySelector('#ai-burger') as HTMLImageElement
const lastFieldset = document.querySelector('fieldset[name=last]') as HTMLFieldSetElement
const progressElements = document.querySelectorAll('[data-name="progress"]') as NodeListOf<HTMLElement>
const outputCooked = document.querySelector('.output-cooked') as HTMLParagraphElement
const outputBuns = document.querySelector('.output-buns') as HTMLParagraphElement
const outputProtein = document.querySelector('.output-protein') as HTMLParagraphElement
const outputCheese = document.querySelector('.output-cheese') as HTMLParagraphElement
const outputVeggies = document.querySelector('.output-veggies') as HTMLParagraphElement
const outputSauce = document.querySelector('.output-sauce') as HTMLParagraphElement


//FUNCTIONS
function getChoiceFieldsetIds(nodeList:NodeListOf<HTMLFieldSetElement>) {
  const fieldsetNames = [] as string[]

  for( const node of nodeList) {
    fieldsetNames.push(node.id)
  }

  return fieldsetNames
}

function outputBurger(burger:Burger) {
  //Reset
  aiOutputBurger.src = '""'
  aiOutputError.textContent = ''
  //Set
  console.log('cheese', burger.cheese.length)
  outputCooked.textContent=`COOKED: ${burger.cooked}`
  outputBuns.textContent=`BUNS: ${burger.buns}`
  outputProtein.textContent=`PROTEIN: ${burger.protein}`
  outputCheese.textContent=`${burger.cheese.length > 0 ? `CHEESE: ${burger.cheese.join(', ')}` : ''}`
  outputVeggies.textContent=`${burger.veggies.length > 0 ? `VEGGIES: ${burger.veggies.join(', ')}` : ''}`
  outputSauce.textContent=`${burger.sauce.length > 0 ? `SAUCE: ${burger.sauce.join(', ')}` : ''}`
}

function resetOutputBurger() {
  outputCooked.textContent=""
  outputBuns.textContent=""
  outputProtein.textContent=""
  outputCheese.textContent=""
  outputVeggies.textContent=""
  outputSauce.textContent=""
}

function clearCheckboxNodes(nodeList:NodeListOf<HTMLInputElement>) {
  nodeList.forEach((node) => {
    node.checked = false
  })
}
  
function updateFormProgressByButtons(value:string) {

  const getCurrentElement = document.querySelectorAll('[data-current="true"]') as NodeListOf<HTMLElement>
  getCurrentElement.forEach((node) => node.dataset['current'] = 'false')

  let newCurrentClass:string
  if(value === 'forward') newCurrentClass = formProgress.forward()
  else if(value === 'backward') newCurrentClass = formProgress.backward()
  else newCurrentClass = formProgress.reset()

  const newCurrentElement = document.querySelectorAll(`.${newCurrentClass}`) as NodeListOf<HTMLElement>
  newCurrentElement.forEach((node) => node.dataset['current'] = 'true')
}

function updateFormProgressByClick(e:Event) {

  const getCurrentProgressElements = document.querySelectorAll('[data-current="true"]') as NodeListOf<HTMLElement>
  const thisElement = (e.target as HTMLElement)
  const newCurrentElements = document.querySelectorAll(`.${thisElement.className}`) as NodeListOf<HTMLElement>

  formProgress.set(Number(thisElement.id))
  getCurrentProgressElements.forEach((node) => node.dataset['current'] = 'false') 
  newCurrentElements.forEach((node) => node.dataset['current'] ='true' )
}

function outputAIBurger(text:string) {
  //Reset
  aiOutputError.textContent = ""
  resetOutputBurger()
  //Set
  aiOutputBurger.src = text
}

function outputError(text:string) {
  //Reset
  resetOutputBurger()
  aiOutputBurger.src = ""
  //Set
  aiOutputError.textContent = `Error: ${text}`
}

function goToFieldset(className:string) {
  const currentProgressElements = document.querySelectorAll('[data-current="true"]') as NodeListOf<HTMLElement>
  const targetProgressElements = document.querySelectorAll(`.${className}`) as NodeListOf<HTMLElement>
  
  currentProgressElements.forEach((node) => node.dataset['current'] = 'false')
  targetProgressElements.forEach((node) => node.dataset['current'] = 'true')

  const targetProgressIndex = formProgress.getTargetProgressIndex(className)
  formProgress.set(targetProgressIndex)
}

function formValidation(cooked:TCooked, buns:TBuns, protein:TProtein) {

  if(cooked.length === 0) {
    goToFieldset('cooked')
    outputError(`No cooking method was selected`)
    return true
  } 
  else if(buns.length === 0) {
    goToFieldset('buns')
    outputError(`No bun was selected`)
    return true
  }
  else if(protein.length === 0) {
    goToFieldset('protein')
    outputError(`No protein was selected`)
    return true
  }

  return false
}

async function fetchAIBurger (prompt:string, key:string) {

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
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', fetchOptions)
    const data = await response.json()
    return data
  } catch(error) {
    console.error(error)
  }
}

//EVENT LISTENERS
function singleCheckboxSelect(checkboxNode:HTMLInputElement, checkboxNodeList:NodeListOf<HTMLInputElement>) {

  checkboxNode.addEventListener('change', (e:Event) => {
    const element = e.target as HTMLInputElement

    if(element.checked) {
      clearCheckboxNodes(checkboxNodeList)
      element.checked=true
    }
    else {
      clearCheckboxNodes(checkboxNodeList)
      element.checked=false
    }

  })
}

checkboxCooked.forEach((node) => {
  singleCheckboxSelect(node, checkboxCooked )
})

checkboxBuns.forEach((node) => {
  singleCheckboxSelect(node, checkboxBuns)
})

async function submitBurgerForm(e:Event) {
  e.preventDefault()

  const burgerFormData = new FormData(burgerForm)

  const cooked = burgerFormData.getAll(cookedFieldset) as TCooked
  const buns = burgerFormData.getAll(bunsFieldset) as TBuns
  const protein = burgerFormData.getAll(proteinFieldset) as TProtein
  const cheese = burgerFormData.getAll(cheeseFieldset) as TCheese
  const veggies = burgerFormData.getAll(veggiesFieldset) as TVeggies
  const sauce = burgerFormData.getAll(sauceFieldset) as TSauce

  const errors = formValidation(cooked, buns, protein)
  if(errors) return

  const aIBurger = new Burger(
    cooked,
    buns,
    protein,
    cheese,
    veggies,
    sauce
  )

    const aIKey = burgerFormData.get('ai-key') as string

    lastFieldset.disabled = true
    progressElements.forEach((node) => node.style.setProperty('pointer-events', 'none'))

    if(aIKey) {

      const aIPrompt = aIBurger.getAIBurgerPrompt()
      try {
        const aIImage = await fetchAIBurger(aIPrompt, aIKey)

        if(aIImage.error) {
          outputError(aIImage.error.code)
          lastFieldset.disabled = false
          return
        }
        else if(aIImage.data) outputAIBurger(aIImage.data[0].url)
        else outputBurger(aIBurger)

      } catch(error) {
        console.error(error)
      }
    } else {
      outputBurger(aIBurger)
    }

    console.log('Submitting...')

    setTimeout(() => {
      console.log('burger complete', aIBurger)

      progressElements.forEach((node) => node.style.setProperty('pointer-events', 'auto'))
      lastFieldset.disabled = false
      burgerForm.reset()
      updateFormProgressByButtons('reset')
    }, 3000)
}

burgerForm.addEventListener('submit', submitBurgerForm)

nextBtns.forEach((node) => node.addEventListener('click', () => {
  updateFormProgressByButtons('forward')
}))

backBtns.forEach((node) => node.addEventListener('click', () => {
  updateFormProgressByButtons('backward')
}))

progressElements.forEach((node) => {
  node.addEventListener('click', updateFormProgressByClick)
})

export {}