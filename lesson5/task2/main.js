$(document).ready(() => {
    let feedbackList = new FeedbackList('feedback.json');
    $('.add-btn').click(() => {
        let $name = $("#name")[0].value;
        let $text = $("#text")[0].value;
        if($name && $text) {
            feedbackList.addFeedback($name, $text);
        }
    });

});