class App {
  constructor() {
    this.allergies = []
    this.recipes = new Recipes()
    this.addEventListiners()
  }

  addEventListiners(){
    let allergyForm = document.getElementById('allergy-form')
    allergyForm.addEventListiner('submit', (allergy)=>{
      console.log(this)
    })
  }


}
