'use strict';

const projectView = {};

projectView.populateFilters = function() {
  $('article').each(function() {
    if(!$(this).hasClass('template')) {
      let val = $(this).attr('data-collaborator');
      let optionTag = `<option value="${val}">${val}</option>`;

      if($(`#collaborator-filter option[value="${val}"]`).length === 0) {
        $('#collaborator-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;

      if($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

projectView.handleCollaboratorFilter = function() {
  $('#collaborator-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-collaborator="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  $('#collaborator-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $('.project-body *:nth-of-type(n+2)').hide();
  $('.show-less').hide(); //need this to be functional//
  $('#projects').on('click', 'a.show-more', function(e) {
    e.preventDefault();
  $(this).parent().find('*').fadeIn();
  $(this).hide();
});
};

projectView.initNewProjectPage = function() {
$('.tab-content').show();
$('#export-field').hide();
  $('#project-json').on('focus', function(){
    this.select();
  });
  $('#new-form').on('change', 'input, textarea', projectView.create);
};

projectView.create = function() {
  let project;
  $("#project-preview").empty();

  project = newProject({
    name: $("#project-name").val(),
    collaborator: $("#project-collaborator").val(),
    version: $("#project-version").val(),
    webaddress: $("#project-webaddress").val(),
    category: $("#project-category").val(),
    body: $("#project-body").val(),
    publishedOn: $("#project-published:checked").length ? new Date() : null
});

$('#project-preview').append(project.toHtml());

$('pre code').each(function(i, block) {
   hljs.highlightBlock(block);
 });

 $('#export-field').show();
$('#project-json').val(JSON.stringify(project) + ',');
};

projectView.initIndexPage = function() {
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleCollaboratorFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
};
