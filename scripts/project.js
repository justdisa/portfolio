'use strict';

var Projects = [];

function Project (opts) {
  this.name = opts.name;
  this.collaborator = opts.collaborator
  this.version = opts.version;
  this.webaddress = opts.webaddress;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn; //changed to be consistent with labs//
}

Project.prototype.toHtml = function () {
  var template = Handlebars.compile($('#project.template').text());

  this.daysAgo = parseInt((new Date() - new Date() - new Date(this.publishedOn))/60/60/24/1000); //date objects are so cool//
  this.publishStatus = this.publishedOn ? `published '${this.daysAgo} days ago` : '(draft)';

//not entirely clear on this piece//
this.body = marked(this.body);

return template(this);
};

rawData.sort(function(a,b) {
  return (new Date (b.publishedOn)) - (new Date(a.publishedOn));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml())
});
