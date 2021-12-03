$(document).ready( function () {
   encargados = $("#encargados").DataTable({
    responsive: true,

      "ajax": "../../Code/PHP/inventario/consulta.php",
      "order": [],
      "autoWidth": true,
      "processing":true,
      "lengthChange": true,
      "paging":false,
      "info": true,
      "scrollY":"500px",
      "scrollCollapse": false,
      "responsive": true,

      dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf'
    ],

    language: {
      "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
          "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
          "infoFiltered": "(Filtrado de _MAX_ total entradas)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrar _MENU_ Entradas",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
          }

    },




    });

