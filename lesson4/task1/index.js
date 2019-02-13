$(document).ready(() => {
    $('button').on('click', (e) => {
        $('.window').children().hide();
        $(`[data-btn='${e.target.id}']`).slideDown();
    });
});