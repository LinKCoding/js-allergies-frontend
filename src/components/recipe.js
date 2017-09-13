class Recipe {
  constructor(title, ingredients) {
    this.title = title
    this.ingredients = ingredients
  }

  render(){
    return `<li>
    ${this.title}
    </li>`
  }
}
