import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

$(document).ready(function(){
    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
    });
});

// Highcharts Global Theme Override
Highcharts.setOptions({
  colors: ['#03629F', '#54A82D', '#DE8A1E', '#013353', '#1D9BEC', '#05AC94', '#0513AC', '#D2501A'],
  chart: {
    style: {
        fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif'
    },
    marginBottom: 70,
    marginTop: 60
  },

  title: {
    align: 'left',
  },

  credits: {
    enabled: false
  },

  navigation: {
    buttonOptions: {
        enabled: false
    }
  }, 
});

/*
TODO:
- Check data labels after drilling. Label rank? New positions?
*/

var data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']),
    separators = Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
    // Some responsiveness
    small = $('#emptyRailcars').width() < 400;

// Set drilldown pointers
$.each(data, function (i) {
    this.drilldown = this.properties['hc-key'];
    this.value = i; // Non-random bogus data
});

// Instantiate the map
Highcharts.mapChart('emptyRailcars', {
  navigation: {
    buttonOptions: {
        enabled: true
    }
  },  
  chart: {
        events: {
            drilldown: function (e) {
                if (!e.seriesOptions) {
                    var chart = this,
                        mapKey = 'countries/us/' + e.point.drilldown + '-all',
                        // Handle error, the timeout is cleared on success
                        fail = setTimeout(function () {
                            if (!Highcharts.maps[mapKey]) {
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                fail = setTimeout(function () {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);

                    // Show the spinner
                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                    // Load the drilldown map
                    $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {

                        data = Highcharts.geojson(Highcharts.maps[mapKey]);

                        // Set a non-random bogus value
                        $.each(data, function (i) {
                            this.value = i;
                        });

                        // Hide loading and add series
                        chart.hideLoading();
                        clearTimeout(fail);
                        chart.addSeriesAsDrilldown(e.point, {
                            name: e.point.name,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        });
                    });
                }

                this.setTitle(null, { text: e.point.name });
            },
            drillup: function () {
                this.setTitle(null, { text: '' });
            }
        }
    },

    title: {
        text: 'Empty Railcars Drilldown',
    },

    subtitle: {
        text: '',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px'
        }
    },

    legend: small ? {} : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    colorAxis: {
        min: 0,
        minColor: '#fff',  // #bbe0f7 - lighter shade of primary-color
        maxColor: '#03629F'   // primary-color
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    plotOptions: {
        map: {
            states: {
                hover: {
                    color: '#54A82D'  // secondary-color
                }
            }
        }
    },

    series: [{
        data: data,
        name: 'USA',
        dataLabels: {
            enabled: true,
            format: '{point.properties.postal-code}'
        }
    }, {
        type: 'mapline',
        data: separators,
        color: 'silver',
        enableMouseTracking: false,
        animation: {
            duration: 500
        }
    }],

    drilldown: {
        activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
        },
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                x: 0,
                y: 60
            }
        }
    }
});


// Demo 3D Donut Chart
Highcharts.chart('donutChart3D', {
  chart: {
      type: 'pie',
      options3d: {
          enabled: true,
          alpha: 45
      }
  },

  title: {
      text: 'Rail Car Inventory Overview',
      align: 'left'
  },

  plotOptions: {
      pie: {
          innerSize: 100,
          depth: 45
      }
  },
  series: [{
      name: 'Amount of Cars',
      data: [
          ['Empty Cars', 22],
          ['Moving Loaded', 55],
          ['Moving Empty', 5],
          ['Placed Empty', 6],
          ['Placed Loaded', 30]
      ]
  }]
});


Highcharts.chart('column3d', {
    legend: {
        y: 5,
        padding: 0,
        itemMarginTop: 0,
        itemStyle: {
            lineHeight: '14px'
        }
    },
      
  chart: {
      type: 'column',
      options3d: {
          enabled: true,
          alpha: 0,
          beta: 5,
          viewDistance: 20,
          depth: 30,
      },
      
  },

  title: {
      text: 'Rail Car Assessment'
  },

  xAxis: {
      categories: ['Oil', 'Chemicals', 'Plastics', 'Grain', 'Misc'],
      labels: {
          skew3d: true,
          style: {
              fontSize: '12px'
          }
      }
  },

  yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
          text: 'Number of cars',
          skew3d: true
      }
  },

  tooltip: {
      headerFormat: '<b>{point.key}</b><br>',
      pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
  },

  plotOptions: {
      column: {
          stacking: 'normal',
          depth: 40
      }
  },

  series: [{
      name: 'Empty',
      data: [5, 3, 4, 7, 2],
      stack: 'male'
  }, {
      name: 'Moving Loaded',
      data: [3, 4, 4, 2, 5],
      stack: 'male'
  }, {
      name: 'Moving Empty',
      data: [2, 5, 6, 2, 1],
      stack: 'female'
  }, {
      name: 'Placed Empty',
      data: [3, 0, 4, 4, 3],
      stack: 'female'
  }, {
      name: 'Placed Loaded',
      data: [3, 0, 8, 2, 2],
      stack: 'male'
  }]
});



Highcharts.chart('area-spline', {
  chart: {
      type: 'areaspline'
  },
  title: {
      text: 'Loaded vs. Empty Cars'
  },
  legend: {
      y: 20,
  },
  xAxis: {
      categories: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
      ],
      plotBands: [{ // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: 'rgba(68, 170, 213, .2)'
      }]
  },
  yAxis: {
      title: {
          text: 'Number of Cars'
      }
  },
  tooltip: {
      shared: true,
      valueSuffix: ' cars'
  },
  plotOptions: {
      areaspline: {
          fillOpacity: 0.5
      }
  },
  series: [{
      name: 'Loaded',
      data: [3, 4, 3, 5, 4, 10, 12]
  }, {
      name: 'Empty',
      data: [1, 3, 4, 3, 3, 5, 4]
  }]
});
