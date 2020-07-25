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

function visualizar(){
  let panel = $(".clasificado")
  panel.show()
  panel.style.display("block")
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
}

setSearch();

((document, window, undefined, $)=>{
  (()=>{
    
    return Buscador = {
      io: io()
      ,$clasificadoTemp: $('.clasificado').clone()

      ,Init: function(){
        var self = this;
        self.loadCiudades()
        self.loadTipos()
        self.loadInmuebles()
        $('.clasificado').empty("");
        $("#buscar").click(()=>{
          visualizar();
          var ciudad = $("#ciudad").val();
          var tipo = $("#tipo").val();
          var precio = $("#rangoPrecio").val();
          var filter = {Ciudad: ciudad, Tipo: tipo, Precio: precio}
          self.customSearch(filter);
        })
        
        $("#tipo, #ciudad, #rangoPrecio").change(()=>{
          var ciudad = $("#ciudad").val();
          var tipo = $("#tipo").val();
          var precio = $("#rangoPrecio").val();
          var filter = {Ciudad: ciudad, Tipo: tipo, Precio: precio}
          self.customSearch(filter);
        })
        
      }
      ,ajaxRequest: function (url, type, data){
        return $.ajax({
                      url: url
                      ,type: type
                      ,data: data
                    })
      }
      ,loadCiudades: function(){
        var self = this;
        self.ajaxRequest('http://localhost:3000/router/ciudades', 'GET', {})
            .done(data=>{
              var $ciudades = $("#ciudad");
               $.each(data, (i,ciudad)=>{
                  $ciudades.append(`<option value="${ciudad}">${ciudad}</option>`);
              })
            })
            .fail(err=>{
              console.log(err);
            });
      }
      ,loadTipos: function(){
        var self = this;
        self.ajaxRequest('http://localhost:3000/router/tipos', 'GET', {})
            .done(data=>{
              var $tipos = $("#tipo");
               $.each(data, (i,tipo)=>{
                 $tipos.append(`<option value="${tipo}">${tipo}</option>`);
              })
            })
            .fail(err=>{
              console.log(err);
            });
      }
      ,loadInmuebles: function(){
        var self = this;
        self.ajaxRequest('http://localhost:3000/router/search', 'GET', {})
            .done(data=>{
              var $inmuebles = $(".lista");
               $.each(data, (i,inmueble)=>{
                 //alert('inmuebles');
                 var htmlNew = self.$clasificadoTemp.html().replace(":Direccion:",inmueble.Direccion)
                                                        .replace(":Ciudad:",inmueble.Ciudad)
                                                        .replace(":Telefono:",inmueble.Telefono)
                                                        .replace(":Codigo_Postal:",inmueble.Codigo_Postal)
                                                        .replace(":Precio:",inmueble.Precio)
                                                        .replace(":Tipo:",inmueble.Tipo);
                  var $control = self.$clasificadoTemp.clone().html(htmlNew);
                 $inmuebles.append( $control );
              })
            })
            .fail(err=>{
              console.log(err);
            });
      }
      ,customSearch: function(filter){
        var self = this;
        self.ajaxRequest('http://localhost:3000/router/search', 'GET', {})
            .done(data=>{
              var $inmuebles = $(".lista");
              $inmuebles.html("");
               $.each(data, (i,inmueble)=>{
                 var htmlNew = self.$clasificadoTemp.html().replace(":Direccion:",inmueble.Direccion)
                                                        .replace(":Ciudad:",inmueble.Ciudad)
                                                        .replace(":Telefono:",inmueble.Telefono)
                                                        .replace(":Codigo_Postal:",inmueble.Codigo_Postal)
                                                        .replace(":Precio:",inmueble.Precio)
                                                        .replace(":Tipo:",inmueble.Tipo);
                  var $control = self.$clasificadoTemp.clone().html(htmlNew);
                  if(filter===undefined){
                      $inmuebles.append( $control );
                  }
                  else{
                    var show = (filter.Ciudad ===undefined || filter.Ciudad =="" || filter.Ciudad == inmueble.Ciudad);
                    var show = show && (filter.Tipo ===undefined || filter.Tipo =="" || filter.Tipo == inmueble.Tipo);
                    var precio = filter.Precio.split(";");
                    var precioInmueble = inmueble.Precio.replace("$","").replace(",","");
                    var show = show && ( precioInmueble >= precio[0] && precioInmueble <= precio[1]);
                    console.log(`Ciudad:${filter.Ciudad}, Tipo: ${filter.Tipo}, Precio: ${precio}, precioInmueble: ${precioInmueble}, Show: ${show}`);
                    if(show){
                      $inmuebles.append( $control );
                    }
                  }

              })
            })
            .fail(err=>{
              console.log(err);
            });
      }
    }
  })()
  Buscador.Init()
  setTimeout(()=>{
    $('select').material_select();
  },1000);
})(document, window, document, jQuery);


/*
function ajaxRequest(url, type, data){
  return $.ajax({
                url: url
                ,type: type
                ,data: data
              })
}

function verTodos() {
  let busqueda = $('#buscar')
  busqueda.on('click',(e)=>{
    var self = this;
    alert('click')
    self.ajaxRequest('http://localhost:3000/router/search','get','json')
    /*$.ajax({
      url:'http://localhost:3000/router/search',
      type: 'get',
      dataType: 'json'
    })*/
    /*
    .done((data)=>{
      alert('done');
      if(!data.error){
        console.log(data);
        alert('data');
        var $inmuebles = $('.lista');
        $inmuebles.html("");
        var newHtml = ''
        $.each(data, (i,inmueble)=>{
          alert('inmuebles '+ inmueble.Direccion)
          newHtml = `<div class="card horizontal">
          <div class="card-image">
              <img src="http://localhost:3000/img/home.jpg">
          </div>
          <div class="card-stacked">
              <div class="card-content">
                  <div> <p><strong>Direccion: </strong>${ inmueble.Direccion }</p> </div>
                  <div> <p><strong>Ciudad: </strong>${ inmueble.Ciudad }</p> </div>
                  <div> <p><strong>Telefono: </strong>${ inmueble.Telefono }</p> </div>
                  <div> <p><strong>Código postal: </strong>${ inmueble.Codigo_Postal }</p> </div>
                  <div> <p><strong>Precio: </strong>${ inmueble.Precio }</p> </div>
                  <div> <p><strong>Tipo: </strong>${ inmueble.Tipo }</p> </div>
              </div>
          </div>
      </div>`
      $('.lista').html((data.datos));
      /*
           newHtml = self.$clasificadoTemp.html().replace(":Direccion:",inmueble.Direccion)
                                                    .replace(":Ciudad:",inmueble.Ciudad)
                                                    .replace(":Telefono:",inmueble.Telefono)
                                                    .replace(":Codigo_Postal:",inmueble.Codigo_Postal)
                                                    .replace(":Precio:",inmueble.Precio)
                                                    .replace(":Tipo:",inmueble.Tipo);
                                                    alert('html');
          var $control = self.$clasificadoTemp.clone().html(newHtml);
          */
         /*
          if(filter===undefined){
            alert('if');
              $inmuebles.append( $control );
          }
          else{
            alert('else');
            var show = (filter.Ciudad ===undefined || filter.Ciudad =="" || filter.Ciudad == inmueble.Ciudad);
            var show = show && (filter.Tipo ===undefined || filter.Tipo =="" || filter.Tipo == inmueble.Tipo);
            var precio = filter.Precio.split(";");
            var precioInmueble = inmueble.Precio.replace("$","").replace(",","");
            var show = show && ( precioInmueble >= precio[0] && precioInmueble <= precio[1]);
            console.log(`Ciudad:${filter.Ciudad}, Tipo: ${filter.Tipo}, Precio: ${precio}, precioInmueble: ${precioInmueble}, Show: ${show}`);
            if(show){
              alert('if2');
              $inmuebles.append( $control );
            }
          }
        })
        
      }
    })
  })
}

setSearch()
verTodos()
*/