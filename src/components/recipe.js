class Recipe {
  constructor(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
  }


  listOutIngredients(ingredients){
    let listed = ingredients.map(ingredient =>{
      return `<div><p class="overflow-ellipsis">${ingredient}</p></div>`
    })
    return listed.join(' ')
  }

  listOutDirections(directions){
    const directionArray = directions.join().split('. ')
    let listed = directionArray.map(direction =>{
      return `<div><p class="overflow-ellipsis">${direction}</p></div>`
    })
    return listed.join(' ')
  }

  render(){
    return `
      <div class="four wide column">
        <div class="red ui card">
          <div class="content">
            <div class="ui centered red header">
            ${this.title}
            </div>
          </div>
          <div class="extra content">
            <div class="ui slide masked reveal description">
              <div class="visible content">${this.listOutIngredients(this.ingredients)}</div>
              <div class="hidden content">${this.listOutDirections(this.directions)}</div>
            </div>
          </div>
          <div class="extra content">
          <a href='http://lmgtfy.com/?q=${this.title + 'Recipe'}' target="_blank">Get Full Recipe</a>
          </div>
        </div>
      </div>
    </div>
    <br/>
    `
  }

}
