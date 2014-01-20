(function ($) {

    $.fn.bar = function (elem, dropdown, controls, options) {

        var bars = '';

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            count: 1,
            width: '0'
        }, options);

        //Create Bars
        var select_html = '';
        bars = function () {
            var width_bar = settings.width.split(',');
            var count_bars = settings.count;
            var bar_html = '';
            var selected = '';
            for (var i = 1; i <= count_bars; i++) {
                bar_html += '<li id="li_bar' + i + '" data-value="' + width_bar[i - 1] + '"><span data-value="0"></span><p>' + width_bar[i - 1] + '%</p></li>';
                if (i == 1) { selected = 'selected'; } else { selected = '' };
                select_html += '<option id="bar' + i + '" ' + selected + '>Bar ' + i + '</option>';
            }
            return '<ul>' + bar_html + '</ul>';
        };

        $(elem).append(bars);
        $(dropdown).append(select_html);

        $(elem).find('li').each(function () {
            FillColorInBar($(this).attr('id'), parseInt($(this).attr('data-value')));
        });

        //Bind click events of Controls
        $(controls).find('a').each(function () {
            $(this).attr('href', 'javascript:void(1)');
            $(this).bind('click', function () {
                var bar_ID = 'li_' + $('#select_bar').find(":selected").attr('id');
                FillColorInBar(bar_ID, parseInt($(this).attr('data-value')));
            });
        });

        return this;
    };

    //Fill Color in Bars
    function FillColorInBar(bar_ID, value) {
        var barObject = $('#' + bar_ID);
        var current_width_percentage = parseInt($(barObject).find('span').attr('data-value'));
        var new_Width_Percentage = current_width_percentage + (value);

        if (new_Width_Percentage < 0) { new_Width_Percentage = 0; }
        $(barObject).find('p').text(new_Width_Percentage + "%");
        if (new_Width_Percentage > 100) {
            $(barObject).addClass('error');
        }
        else {
            $(barObject).removeClass('error');
        }
        $(barObject).find('span').attr('data-value', new_Width_Percentage);
        $(barObject).find('span').animate({ 'width': new_Width_Percentage + "%" }, { duration: 100 });
    }

} (jQuery));


        
    