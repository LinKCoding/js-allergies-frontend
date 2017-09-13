class Recipe {
  constructor(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
  }

  render(){
    return `<li>
    ${this.title}
    </li>`
  }
}
