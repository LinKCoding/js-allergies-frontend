class Recipe {
  constructor(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
  }

  render(){
    return `
    <div class="column">
    <div class="ui fluid slide masked reveal card">
      <div class="visible content">${this.title}</div>
      <div class="hidden content">
      ${this.ingredients}
      <br/>
      ${this.directions}
      </div>
    </div>
    <br />
    `
    //use content divider
    //list out ingredients in list format
    //backside list out directions
  }
}
