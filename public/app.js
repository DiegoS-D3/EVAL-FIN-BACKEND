
//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

function verTodos() {
  let busqueda = $('#buscar')
  busqueda.on('click',(e)=>{
    alert('click')
    $.ajax({
      url:'http://localhost:3000/router/search',
      type: 'get',
      dataType: 'json'
    })
    .done((data)=>{
      alert('done');
      if(!data.error){
        console.log(data);
        alert('data');
      }
    })
  })
}

setSearch()
verTodos()