'use strict';

var projectView = {};

projectView.populateFilters = function () {
  $('project').each(function() {
    if(!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();//not sure about this line//
      var optionTag = `<option value="${val}">${val}</option>`;

      if($(`#collaborator-filter option[value="${val}"]`).length === 0) {
        $('collaborator-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;

      if($`#category-filter option[value="${val}"]`).length === 0 {
        $('category-filter').append(optionTag);
      }
    }
  })
};

projectView.handleCollaboratorFilter = function() {
  $('#collaborator-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $(`project[data-collatorator="${$(this).val()}"]`).fadeIn();
    } else {
      $('project').fadeIn();
      $('template').hide();
    }
  $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $(`project[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('project').fadeIn();
      $('template').hide();
    }
  $('#collaborator-filter').val('');
  });
};

projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  })

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $(`.project-body' *:nth-of-type(n+2)`).hide();
  $('#projects').on('click', 'a.read-on', function() {
    e.preventDefault();
  $(this).parent().find('*').fadeIn();
  $(this).hide();
});
};
