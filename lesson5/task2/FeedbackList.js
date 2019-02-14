class FeedbackList {
    constructor(source, container = '#feedback-list'){
        this.source = source;
        this.container = container;
        this.feedbacks = [];
        this.feedbackCount = 5;
        this._init();
    }

    _render(){
        let $feedbackListDiv = $('<div/>', {
            class: 'feedback-list-wrap'
        });
        $(this.container).append('<h2>Отзывы</h2>');
        $feedbackListDiv.appendTo($(this.container));
    }

    _init(){
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let feedback of data){
                    this.feedbacks.push(feedback);
                    this._renderFeedback(feedback);
                }
            })
    }
    _renderFeedback(feedback){
        let $container = $('<div/>', {
            class: 'feedback',
            'data-feedback': feedback.id
        });

        let $approveBtn = $('<button/>', {
            id: feedback.id,
            class: 'approve-btn',
            text: 'Одобрить',
            'data-id-approve': feedback.id
        });

        let $delBtn = $('<button/>', {
            id: feedback.id,
            class: 'del-btn',
            text: 'X',
            'data-id-del': feedback.id
        });

        $container.append($(`<h4 class="feedback-author">${feedback.author}</h4>`));
        $container.append($(`<p class="feedback-text">${feedback.text}</p>`));
        $container.append($delBtn);
        $container.appendTo($('.feedback-list-wrap'));
        $($delBtn).click(e => this._remove(e.target.id));
        if(!feedback.isApproved) {
            $container.append($approveBtn);
            $($approveBtn).click(e => this._approveFeedback(e.target.id));
        } else {
            $container.addClass('approved-feedback');
        }
    }

    addFeedback(name, text){
        let feedbackId = this._generateId();
        let feedback = {
                id: feedbackId,
                author: name,
                text: text,
                isApproved: false
            };
        this.feedbacks.push(feedback);
        this._renderFeedback(feedback);
    }

    _generateId() {
        this.feedbackCount++;
        return this.feedbackCount;
    }

    _approveFeedback(feedbackId) {
        let find = this.feedbacks.find(feedback => feedback.id === +feedbackId);
        find.isApproved = !find.isApproved;
        $(`[data-id-approve='${feedbackId}']`).remove();
        $(`[data-feedback='${feedbackId}']`).addClass('approved-feedback');
    }

    _remove(feedbackId){
        let find = this.feedbacks.find(feedback => feedback.id === +feedbackId);
        if(find){
            this.feedbacks = this.feedbacks.filter(feedback => feedback.id !== +feedbackId);
            $(`[data-feedback='${feedbackId}']`).remove();
        }
    }
}