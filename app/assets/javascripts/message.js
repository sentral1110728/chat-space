$(function() {
  function buildHTML(message) {
    var insertImage = '';
    if (message.image) {
      insertImage = `<img class="lower-message__image" src="${ message.image }">`;
    }
    var html = `<p class="member-name" data-message-id="${ message.id }">
                  ${ message.user_name }
                </p>
                <span class="time">
                  ${ message.created_at }
                </span>
                <div class="lower-message">
                  <p class="member-text">
                    ${ message.content }
                  </p>
                  ${ insertImage }
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-space').append(html);
      $('.send').prop('disabled',false);
      $('.chat-space').animate({ scrollTop: $('.chat-space')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  })

  var interval =setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.member-name:last').attr('data-message-id');
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: { message: message_id},
        dataType: 'json'
      })
      .done(function(json) {
        var insertHTML = '';
        $.each(json, function(i, json){
          insertHTML += buildHTML(message);
        })
        $('.chat-space').append(insertHTML);
      })
      .fail(function(json) {
        alert('自動送信に失敗');
      });
    } else {
      clearInterval(interval);
    }
  },5000);

});

