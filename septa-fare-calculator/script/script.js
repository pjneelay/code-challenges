$(document).ready(function() {
   
    var price=0;
    $("#rideCount").keyup(function() 
    {
        fareCalculator();   
    });
    $("select").change(function() 
    {
        fareCalculator(); 
    });
    $("input[name='place']").change(function() 
    {
        fareCalculator();  
    });
    $("#hint").click(function(){
        $('#info').toggle();    
        getInfo();
                               });

    function fareCalculator(){
     $.ajax({
             url: "fares.json",
             type: "GET",
             dataType: "json",
             success: function(data) {

               $.each(data.zones, function(index, value) 
               {
                     if(value.name==$("#zones").find("option:selected").text())
                     {
                       for(var i=0;i<value.fares.length;i++)
                       {
                         if((value.fares[i].type==$("#travelType").val()) && (value.fares[i].purchase==$("input[name='place']:checked").val()))
                         {
                             if((value.fares[i].type==$("#travelType").val()) && ($("#travelType").val()=="anytime"))
                             {
                                $("#onboard").attr('disabled', true);
                                $("#onboard").css('opacity', '.7');
                                price= value.fares[i].price;
                                var number = $("#rideCount").val();  
                                var totalFare=(price*number);
                                $("#fare").text("$"+totalFare.toFixed(2));
                             }
                             else{
                                $("#onboard").attr('disabled', false);
                                $("#onboard").css('opacity', '1');
                                price= value.fares[i].price;
                                var number = $("#rideCount").val();  
                                var totalFare=(price*number);
                                $("#fare").text("$"+totalFare.toFixed(2));
                             }
                                    
                         }
                       }    
                     }
                });
            },
        });
      }  
      
      
      function getInfo()
      {
          $.ajax
          ({
              url: "fares.json",
              type: "GET",
              dataType: "json",
              success: function(response) 
              { var finalText = "\n SEPTA REGIONAL RAIL INFORMATION :\n\n";
                  function init() {
                      $.each(response.info, function (index, value) {
                          finalText=finalText+index+": "+value+'\n';
                  })
              }  
              init();
              alert(finalText);
              }
          });
      }
      
 });


