class Recipe {
  constructor(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
  }


  listOutIngredients(ingredients){
    let listed = ingredients.map(ingredient =>{
      return `<div>${ingredient}</div>`
    })
    return listed.join(' ')
  }

  listOutDirections(directions){
    const directionArray = directions.join().split('. ')
    let listed = directionArray.map(direction =>{
      return `<div>${direction}</div>`
    })
    return listed.join(' ')
  }

  render(){
    return `
      <div class="ui card">
        <div class="content">
          <div class="header">${this.title}</div>
        </div>
        <div class="ui slide masked reveal extra content">
          <div class="visible content">${this.listOutIngredients(this.ingredients)}</div>
          <div class="hidden content">${this.listOutDirections(this.directions)}</div>
        </div>
      </div>
      <br/>
    </div>
    `
  }

}
