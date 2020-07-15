$(document).ready(function(){
  $('.col m8').hide();
})

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

function verCardHor(){
  $('.card horizontal').toggleClass('invisible');
}

function insertarDatos(data){
  $.each(data,function(indice,elemento){
    let insertar = "<div class='comentario'><div class='direccion'>Direccion: "+elemento.direccion+"</div> <div class='telefono'>"+elemento.telefono+"</div>";
    $(".card-content").append(insertar);
  });
}

function  cargarMasComentarios(){
  fetch("./data.json",{
  method : 'GET',
  })
  .then(function(data){
    return data.json()
  })
  .then(function(json){
    let insertar = "<div class='direccion'>Direccion: " + json.direccion+ "</div>"
    $('card-content').append(insertar);
  })
   
}

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
  let busqVerTodos = $('#buscar')
  busqVerTodos.on('click', (e) =>{
    
    cargarMasComentarios();
    alert('click');
  })
}

setSearch()
