$(function() {
  function buildHTML(message) {
    var html = `<p class="member-name">
                  ${ message.user_name }
                </p>
                <span class="time">
                  ${ message.created_at }
                </span>
                <div class="lower-message">
                  <p class="member-text">
                    ${ message.content }
                  </p>
                  ${ message.image }
                </div>`
    return html
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
      $('.chat-space').append(html)
      $('.member-text').val('')
      $('.lower-message__image').val('')
    })
  })
});
