'use strict';

var projects = [];

function Project(opts) {
  this.name = opts.name;
  this.collaborator = opts.collaborator;
  this.version = opts.version;
  this.webaddress = opts.webaddress;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn; //changed to be consistent with labs//
}

Project.prototype.toHtml = function () {
  var template = Handlebars.compile($('#project-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000); //date objects are so cool//
  this.publishStatus = this.publishedOn ? `Created ${this.daysAgo} days ago` : '(draft)';

  this.cooperationWith = this.collaborator ? `in cooperation with ${this.collaborator}.` : `.`;
  this.body = marked(this.body);
  return template(this);
};

rawData.sort(function(a,b) {
  return(new Date (b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
