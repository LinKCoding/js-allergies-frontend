class Recipe {
  constructor(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
  }


  listOut(items){
    items.map(item =>{
      `<p>item</p>`
    })
  }

  render(){
    return `
    <div class="column">
    <div class="ui fluid slide masked reveal card">
      <div class="visible content">${this.title}</div>
      <div class="content">
      ${this.listOut(this.ingredients)}
      <br/>
      <div class="hidden content">
      ${this.listOut(this.directions)}
      </div>
      </div>
    </div>
    <br />
    `
    //use content divider
    //list out ingredients in list format
    //backside list out directions
  }

}
