class App {
  constructor() {
    this.allergies = []
    this.recipes = new Recipes()
    this.addEventListeners()
  }

  addEventListeners(){
    let allergyForm = document.getElementById('allergy-form')
    allergyForm.addEventListener('submit', (allergy)=>{
      allergy.preventDefault()
      let input = document.getElementById('allergy-name')
      this.allergies.push(input.value)
    })
  }


}
