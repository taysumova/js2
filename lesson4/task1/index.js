$(document).ready(() => {
    $('button').on('click', (e) => {
        $('.window').children().hide();
        switch(e.target.id) {
            case 'first_btn': $('#p_1').slideDown();
                break;
            case 'second_btn': $('#p_2').slideDown();
                break;
            case 'third_btn': $('#p_3').slideDown();
                break;
            case 'fourth_btn': $('#p_4').slideDown();
                break;
            case 'fifth_btn': $('#p_5').slideDown();
                break;
        }
        console.log(event.target.id);
    });
});